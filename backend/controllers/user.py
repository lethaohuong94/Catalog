from flask import request, Blueprint, jsonify

from models.user import UserModel
from helpers.errors import *
from helpers.validators import *
from helpers.security import *

user_api = Blueprint('user_api', __name__)


@user_api.route('/users', methods=['POST'])
def create_user():
    try:
        # VALIDATE REQUEST'S HEADERS, BODY
        validate_request_header(request, content=True, authorization=False)
        validated_request_body = validate_request_body(request, action='create', resource='user')

        # CREATE USER
        user = UserModel(**validated_request_body)
        user.save_to_db()

        # SUCCEED, RETURN MESSAGE
        return jsonify({'message': 'User created successfully'}), 201

    except BadRequestError as err:
        return jsonify(err.represent()), 400


# retrieve jwt
@user_api.route('/auth', methods=['POST'])
def authenticate_user():
    # use generic error message for security
    error_message = 'Invalid action'
    status_code = 400

    # VALIDATE REQUEST'S HEADERS
    try:
        validate_request_header(request, content=True, authorization=False)
    except BadRequestError as err:
        return jsonify(err.represent()), 400

    # VALIDATE REQUEST'S BODY AND AUTHENTICATE USER
    try:
        # validate request's body
        validated_request_body = validate_request_body(request, action='auth', resource='user')
        # authenticate
        auth_output = authenticate(**validated_request_body)
        # successfully authenticate user, return token
        return jsonify({'token': auth_output})

    except Exception:
        return jsonify({'message': error_message}), status_code


# update password, only author can perform
@user_api.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    # use generic error for security
    error_message = 'Invalid action'
    status_code = 400

    # VALIDATE REQUEST HEADER
    try:
        token = validate_request_header(request, content=True, authorization=True)
    except BadRequestError as err:
        return jsonify(err.represent()), 400

    try:
        # VALIDATE TOKEN, REQUEST'S BODY
        user_from_token = identity(token)  # validate request's token
        validated_request_body = validate_request_body(request, resource_id=user_id, resource='user', action='update')

        # AUTHORIZE USER
        user_from_request = UserModel.find_by_id(user_id)
        if user_from_request.id != user_from_token.id:
            return jsonify({'message': error_message}), status_code

        # UPDATE USER
        user_from_request.password = validated_request_body['password']
        user_from_request.save_to_db()

    except BadRequestError:
        return jsonify({'message': error_message}), status_code
    except UnauthorizedError:
        return jsonify({'message': error_message}), status_code

    # SUCCEED, RETURN UPDATED USER
    return jsonify({'message': 'User updated successfully'}), 200
