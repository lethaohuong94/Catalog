from flask import request, Blueprint, jsonify

from models.user import UserModel
from helpers.errors import *
from helpers.validators import *
from helpers.security import *

user_api = Blueprint('user_api', __name__)


@user_api.route('/users', methods=['POST'])
@header_content_type_json_required
def create_user():
    try:
        validated_data = get_data_from_request(request, 'user')
        user = UserModel.find_by_name(validated_data['name'])
        if user is not None:
            raise BadRequestError('user already exists')

        user = UserModel(**validated_data)

        user.save_to_db()

        return jsonify({'message': 'user created successfully'}), 201

    except AppError as err:
        return jsonify({'message': err.message}), err.status_code


@user_api.route('/auth', methods=['POST'])
@header_content_type_json_required
def authenticate_user():
    try:
        validated_data = get_data_from_request(request, resource='user')

        user = UserModel.find_by_name(validated_data['name'])
        if user is None:
            raise UnauthorizedError('Invalid username/password')

        if not user.check_password(validated_data['password']):
            raise UnauthorizedError('Invalid username/password')

        access_token = encode(user)
        return jsonify({'access_token': access_token})

    except AppError as err:
        return jsonify({'message': err.message}), err.status_code


@user_api.route('/users/<int:user_id>', methods=['PUT'])
@header_authorization_required
@header_content_type_json_required
def update_user(user_id):
    try:
        token = get_token_from_header(request)
        validated_data = get_data_from_request(request, resource='user')

        user_from_request = UserModel.find_by_id(user_id)
        if user_from_request is None:
            raise NotFoundError('No user found')

        if user_from_request.id != get_user_from_token(token).id:
            raise UnauthorizedError('Unauthorized action')

        user_from_request.update(validated_data)
        user_from_request.save_to_db()

    except AppError as err:
        return jsonify({'message': err.message}), err.status_code

    return jsonify({'message': 'User updated successfully'})
