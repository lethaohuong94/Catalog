from flask import current_app, request, Blueprint, jsonify

from models.category import CategoryModel
from helpers.errors import *
from helpers.validators import *
from helpers.security import *

category_api = Blueprint('category_api', __name__)


def add_default_category():
    default_category = CategoryModel(name=current_app.config['DEFAULT_CATEGORY'], author_id=None)
    default_category.save_to_db()


# get all categories
@category_api.route('/categories', methods=['GET'])
def get_all_categories():
    return jsonify([category.represent() for category in CategoryModel.query.all()]), 200


# get category by id, jwt not required
@category_api.route('/categories/<int:category_id>', methods=['GET'])
def get_category(category_id):
    category = CategoryModel.find_by_id(category_id)
    # category found
    if category:
        return jsonify(category.represent())
    # category not found
    return jsonify({'message': 'No category found'}), 404


# create category, jwt token required
@category_api.route('/categories', methods=['POST'])
def create_category():
    try:
        # VALIDATE REQUEST'S HEADERS, TOKEN, BODY
        token = validate_request_header(request, content=True, authorization=True)
        user = identity(token)  # validate request's token
        validated_request_body = validate_request_body(request, action='create', resource='category')

        # CREATE CATEGORY
        category = CategoryModel(name=validated_request_body['name'], author_id=user.id)
        category.save_to_db()

        # SUCCEED, RETURN CREATED CATEGORY
        return jsonify(category.represent()), 201

    except BadRequestError as err:
        return jsonify(err.represent()), 400
    except UnauthorizedError as err:
        return jsonify(err.represent()), 401
    except NotFoundError as err:
        return jsonify(err.represent()), 404


# update category name, jwt required, only author can perform
@category_api.route('/categories/<int:category_id>', methods=['PUT'])
def update_category(category_id):
    try:
        # VALIDATE REQUEST HEADER, BODY, TOKEN
        token = validate_request_header(request, content=True, authorization=True)
        user = identity(token)  # validate request's token
        validated_request_body = validate_request_body(request, action='update',
                                                       resource_id=category_id, resource='category')

        # AUTHORIZE USER
        category = CategoryModel.find_by_id(category_id)
        if user.id != category.author_id:
            return jsonify({'message': 'Unauthorized action'}), 401

        # UPDATE CATEGORY
        category.name = validated_request_body['name']
        category.save_to_db()

        # SUCCEED, RETURN UPDATED CATEGORY
        return jsonify(category.represent()), 200

    except BadRequestError as err:
        return jsonify(err.represent()), 400
    except UnauthorizedError as err:
        return jsonify(err.represent()), 401
    except NotFoundError as err:
        return jsonify(err.represent()), 404


# delete category, jwt required, only author can perform
@category_api.route('/categories/<int:category_id>', methods=['DELETE'])
def delete_category(category_id):
    try:
        # VALIDATE REQUEST HEADER, TOKEN
        token = validate_request_header(request, content=False, authorization=True)
        user = identity(token)  # validate request's token

        # VALIDATE CATEGORY_ID
        category = CategoryModel.find_by_id(category_id)
        if category is None:
            return jsonify({'message': 'No category found'}), 404

        # AUTHORIZE USER
        if user.id != category.author_id:
            return jsonify({'message': 'Unauthorized action'}), 401

        # DELETE CATEGORY
        default_category = CategoryModel.find_by_name(current_app.config['DEFAULT_CATEGORY'])
        for item in category.items:
            item.category_id = default_category.id
        item.save_to_db()
        category.delete_from_db()

        # SUCCEED, RETURN MESSAGE
        return jsonify({'message': 'Category deleted'}), 200

    except BadRequestError as err:
        return jsonify(err.represent()), 400
    except UnauthorizedError as err:
        return jsonify(err.represent()), 401
    except NotFoundError as err:
        return jsonify(err.represent()), 404
