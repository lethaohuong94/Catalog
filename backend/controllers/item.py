from flask import request, Blueprint, jsonify

from models.item import ItemModel
from helpers.errors import *
from helpers.validators import *
from helpers.schemas import ItemSchema

item_api = Blueprint('item_api', __name__)
load_schema = ItemSchema
dump_schema = ItemSchema


@item_api.route('/items', methods=['GET'])
def get_all_items():
    return jsonify(dump_schema().dump(ItemModel.get_all(), many=True).data)


@item_api.route('/items/<int:item_id>', methods=['GET'])
def get_item(item_id):
    item = ItemModel.find_by_id(item_id)
    if not item:
        raise NotFoundError('No item found')
    # If item exists then it is returned.
    return jsonify(dump_schema().dump(item).data)


@item_api.route('/categories/<int:category_id>/items', methods=['POST'])
@authorization_required
@json_data_required(load_schema)
def create_item(data, user, category_id):
    # If item's name is not unique then raises error.
    item = ItemModel.find_by_name(data['name'])
    if item is not None:
        raise BadRequestError('category already exists')

    # If the request is valid, then new item is created, save, and returned.
    data.update([('category_id', category_id), ('author_id', user.id)])
    item = ItemModel(**data)
    item.save_to_db()
    return jsonify(dump_schema().dump(item).data), 201


@item_api.route('/categories/<int:category_id>/items/<int:item_id>', methods=['PUT'])
@authorization_required
@json_data_required(load_schema)
def update_item(data, user, item_id, category_id):
    # If the name is changed, and new name is not unique then raises error.
    item = ItemModel.find_by_name(data['name'])
    if item is not None and item.id != item_id:
        raise BadRequestError('item name already exists')

    # The resource that is requested has to exist.
    item = ItemModel.find_by_id(item_id)
    if item is None:
        raise NotFoundError('No item found')

    # If user is not the creator of item then returns unauthorized error.
    if user.id != item.author_id:
        raise UnauthorizedError('Unauthorized action')

    # Request is valid. Item is updated, saved, and returned.
    data['category_id'] = category_id
    item.update(data)
    item.save_to_db()
    return jsonify(dump_schema().dump(item).data)


@item_api.route('/items/<int:item_id>', methods=['DELETE'])
@authorization_required
def delete_item(user, item_id):
    # If the requested item doesn't exist then return 404 error.
    item = ItemModel.find_by_id(item_id)
    if item is None:
        raise NotFoundError('No item found')

    # If user is not the creator of the item then returns unauthorized error.
    if user.id != item.author_id:
        raise UnauthorizedError('Unauthorized action')

    # If the action is valid, item is deleted. Succeed message is returned.
    item.delete_from_db()
    return jsonify({'message': 'Item deleted'})
