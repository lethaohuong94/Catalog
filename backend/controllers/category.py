from flask import current_app, request, Blueprint, jsonify

from models.category import CategoryModel
from helpers.errors import *
from helpers.validators import *
from helpers.security import *
from helpers.schemas import CategoryDumpSchema

category_api = Blueprint('category_api', __name__)
dump_schema = CategoryDumpSchema


def add_default_category():
    default_category = CategoryModel(name=current_app.config['DEFAULT_CATEGORY'], author_id=None)
    default_category.save_to_db()


@category_api.route('/categories', methods=['GET'])
def get_all_categories():
    return jsonify(dump_schema().dump(CategoryModel.get_all(), many=True).data)


@category_api.route('/categories/<int:category_id>', methods=['GET'])
def get_category(category_id):
    try:
        category = CategoryModel.find_by_id(category_id)

        if not category:
            raise NotFoundError('No category found')

        return jsonify(dump_schema().dump(category).data)

    except AppError as err:
        return jsonify({'message': err.message}), err.status_code


@category_api.route('/categories', methods=['POST'])
@header_content_type_json_required
def create_category():
    try:
        token = get_token_from_header(request)
        author = get_user_from_token(token)

        validated_data = get_data_from_request(request, resource='category')
        validated_data['author_id'] = author.id
        category = get_created_object_from_data(validated_data, 'category')

        category.save_to_db()

        return jsonify(dump_schema().dump(category).data), 201

    except AppError as err:
        return jsonify({'message': err.message}), err.status_code


@category_api.route('/categories/<int:category_id>', methods=['PUT'])
@header_authorization_required
@header_content_type_json_required
def update_category(category_id):
    try:
        token = get_token_from_header(request)
        user = get_user_from_token(token)

        validated_data = get_data_from_request(request, resource='category')
        validated_data['id'] = category_id
        category = get_object_to_update_from_data(validated_data, resource='category')

        if user.id != category.author_id:
            raise UnauthorizedError('Unauthorized action')

        category.update(validated_data)
        category.save_to_db()

        return jsonify(dump_schema().dump(category).data)

    except AppError as err:
        return jsonify({'message': err.message}), err.status_code


@category_api.route('/categories/<int:category_id>', methods=['DELETE'])
@header_authorization_required
def delete_category(category_id):
    try:
        token = get_token_from_header(request)
        user = get_user_from_token(token)

        category = CategoryModel.find_by_id(category_id)
        if category is None:
            raise NotFoundError('No category found')

        if user.id != category.author_id:
            raise UnauthorizedError('Unauthorized action')

        default_category = CategoryModel.find_by_name(current_app.config['DEFAULT_CATEGORY'])
        for item in category.items:
            item.category_id = default_category.id
            item.save_to_db()
        category.delete_from_db()

        return jsonify({'message': 'Category deleted'})

    except AppError as err:
        return jsonify({'message': err.message}), err.status_code
