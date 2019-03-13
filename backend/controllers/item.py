from flask import request, Blueprint, jsonify

from models.item import ItemModel
from helpers.errors import *
from helpers.validators import *
from helpers.security import *
from helpers.schemas import ItemDumpSchema

item_api = Blueprint('item_api', __name__)
dump_schema = ItemDumpSchema


@item_api.route('/categories/all/items', methods=['GET'])
def get_all_items():
    return jsonify(dump_schema().dump(ItemModel.get_all(), many=True).data)


@item_api.route('/categories/<int:category_id>/items/<int:item_id>', methods=['GET'])
def get_item(item_id, category_id):
    try:
        item = ItemModel.find_by_id(item_id)
        if not item:
            raise NotFoundError('No item found')
        return jsonify(dump_schema().dump(item).data)

    except AppError as err:
        return jsonify({'message': err.message}), err.status_code


@item_api.route('/categories/<int:category_id>/items', methods=['POST'])
@header_authorization_required
@header_content_type_json_required
def create_item(category_id):
    try:
        token = get_token_from_header(request)
        author = get_user_from_token(token)

        validated_data = get_data_from_request(request, resource='item')
        validated_data.update([('category_id', category_id), ('author_id', author.id)])
        item = get_created_object_from_data(validated_data, resource='item')

        item.save_to_db()

        return jsonify(dump_schema().dump(item).data), 201

    except AppError as err:
        return jsonify({'message': err.message}), err.status_code


@item_api.route('/categories/<int:category_id>/items/<int:item_id>', methods=['PUT'])
@header_authorization_required
@header_content_type_json_required
def update_item(item_id, category_id):
    try:
        token = get_token_from_header(request)
        author = get_user_from_token(token)

        validated_data = get_data_from_request(request, resource='item')

        validated_data.update([('id', item_id), ('category_id', category_id), ('author_id', author.id)])
        item = get_object_to_update_from_data(validated_data, resource='item')

        if author.id != item.author_id:
            return jsonify({'message': 'Unauthorized action'}), 401

        item.update(validated_data)
        item.save_to_db()

        return jsonify(dump_schema().dump(item).data)

    except AppError as err:
        return jsonify({'message': err.message}), err.status_code


@item_api.route('/categories/<int:category_id>/items/<int:item_id>', methods=['DELETE'])
@header_authorization_required
def delete_item(item_id, category_id):
    try:
        token = get_token_from_header(request)
        user = get_user_from_token(token)

        item = ItemModel.find_by_id(item_id)
        if item is None:
            return jsonify({'message': 'No item found'}), 404

        if user.id != item.author_id:
            return jsonify({'message': 'Unauthorized action'}), 401

        item.delete_from_db()

        return jsonify({'message': 'Item deleted'})

    except AppError as err:
        return jsonify({'message': err.message}), err.status_code

