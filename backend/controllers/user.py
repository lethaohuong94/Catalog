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
        # Request body is validated then used to create new user.
        validated_data = get_data_from_request(request, 'user')
        # If the new user name is not unique then returns error.
        user = UserModel.find_by_name(validated_data['name'])
        if user is not None:
            raise BadRequestError('user already exists')
        # If successfully create new user then save that to db and returns message.
        user = UserModel(**validated_data)
        user.save_to_db()
        return jsonify({'message': 'user created successfully'}), 201

    except AppError as err:
        return jsonify({'message': err.message}), err.status_code


@user_api.route('/auth', methods=['POST'])
@header_content_type_json_required
def authenticate_user():
    try:
        # Request body is validated and used to prove identity of user.
        validated_data = get_data_from_request(request, resource='user')
        # If either user name doesn't exist, or password doesn't match then returns error.
        user = UserModel.find_by_name(validated_data['name'])
        if user is None:
            raise UnauthorizedError('Invalid username/password')
        if not user.check_password(validated_data['password']):
            raise UnauthorizedError('Invalid username/password')
        # If identity is successfully proven, then returns access token.
        access_token = encode(user)
        return jsonify({'access_token': access_token})

    except AppError as err:
        return jsonify({'message': err.message}), err.status_code


@user_api.route('/users/<int:user_id>', methods=['PUT'])
@header_authorization_required
@header_content_type_json_required
def update_user(user_id):
    try:
        # Request body is validated.
        validated_data = get_data_from_request(request, resource='user')
        # If validated successfully then user is found using user_id.
        # If user_id doesn't exists then return 404 error.
        user_from_request = UserModel.find_by_id(user_id)
        if user_from_request is None:
            raise NotFoundError('No user found')
        # User_id is compared with id of token.
        # If they don't match then return unauthorized error.
        token = get_token_from_header(request)
        if user_from_request.id != get_user_from_token(token).id:
            raise UnauthorizedError('Unauthorized action')
        # If authorized then updates user and saves to db.
        user_from_request.update(validated_data)
        user_from_request.save_to_db()
        return jsonify({'message': 'User updated successfully'})

    except AppError as err:
        return jsonify({'message': err.message}), err.status_code

