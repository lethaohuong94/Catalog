from flask import current_app, request, Blueprint, jsonify

from models.category import CategoryModel
from helpers.errors import *
from helpers.validators import *
from helpers.schemas import CategorySchema

category_api = Blueprint('category_api', __name__)
dump_schema = CategorySchema
load_schema = CategorySchema


def add_default_category():
    default_category = CategoryModel(name=current_app.config['DEFAULT_CATEGORY'], author_id=None)
    default_category.save_to_db()


@category_api.route('/categories', methods=['GET'])
def get_all_categories():
    return jsonify(dump_schema().dump(CategoryModel.get_all(), many=True).data)


@category_api.route('/categories/<int:category_id>', methods=['GET'])
def get_category(category_id):
    category = CategoryModel.find_by_id(category_id)
    if not category:
        raise NotFoundError('No category found')
    # If category exists then it is returned.
    return jsonify(dump_schema().dump(category).data)


@category_api.route('/categories', methods=['POST'])
@authorization_required
@json_data_required(load_schema)
def create_category(data, user):
    # If category's name is not unique then raises error.
    category = CategoryModel.find_by_name(data['name'])
    if category is not None:
        raise BadRequestError('category already exists')

    # Request is valid then new category is created, saved, and returned.
    data['author_id'] = user.id
    category = CategoryModel(**data)
    category.save_to_db()
    return jsonify(dump_schema().dump(category).data), 201


@category_api.route('/categories/<int:category_id>', methods=['PUT'])
@authorization_required
@json_data_required(load_schema)
def update_category(data, user, category_id):
    # If name is changed and new name exists then raises error.
    category = CategoryModel.find_by_name(data['name'])
    if category is not None and category.id != category_id:
        raise BadRequestError(resource + ' name already exists')

    # The resource that is requested has to exist.
    category = CategoryModel.find_by_id(category_id)
    if category is None:
        raise NotFoundError('No category found')

    # If user is not the creator of category then returns unauthorized error.
    if user.id != category.author_id:
        raise UnauthorizedError('Unauthorized action')

    # Request is valid. Category is updated, saved, and returned.
    category.update(data)
    category.save_to_db()
    return jsonify(dump_schema().dump(category).data)


@category_api.route('/categories/<int:category_id>', methods=['DELETE'])
@authorization_required
def delete_category(user, category_id):
    # If the requested category doesn't exist then return 404 error.
    category = CategoryModel.find_by_id(category_id)
    if category is None:
        raise NotFoundError('No category found')

    # If user is not the creator of the category then returns unauthorized error.
    if user.id != category.author_id:
        raise UnauthorizedError('Unauthorized action')

    # Before the category is deleted, all items it contains is moved to default category.
    default_category = CategoryModel.find_by_name(current_app.config['DEFAULT_CATEGORY'])
    for item in category.items:
        item.category_id = default_category.id
        item.save_to_db()

    # If the action is valid, category is deleted. Succeed message is returned.
    category.delete_from_db()
    return jsonify({'message': 'Category deleted'})
