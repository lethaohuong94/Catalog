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
        # validate_request_header(request, content=True, authorization=False)
        validate_header_content_type_json(request)
        validated_request_body = validate_request_body(request, action='create', resource='user')

        # CREATE USER
        user = UserModel(**validated_request_body)
        user.save_to_db()

        # SUCCEED, RETURN MESSAGE
        return jsonify({'message': 'User created successfully'}), 201

    except AppError as err:
        return jsonify(err.represent()), err.status_code


# retrieve jwt
@user_api.route('/auth', methods=['POST'])
def authenticate_user():
    try:
        # VALIDATE REQUEST'S HEADERS
        # validate_request_header(request, content=True, authorization=False)
        validate_header_content_type_json(request)

        # VALIDATE REQUEST'S BODY AND AUTHENTICATE USER
        # validate request's body
        validated_request_body = validate_request_body(request, action='auth', resource='user')
        # authenticate
        auth_output = authenticate(**validated_request_body)
        # successfully authenticate user, return token
        return jsonify({'access_token': auth_output})

    except AppError as err:
        return jsonify(err.represent()), err.status_code


# update password, only author can perform
@user_api.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    # use generic error for security
    error_message = 'Invalid action'
    status_code = 400

    try:
        # VALIDATE REQUEST HEADER
        # token = validate_request_header(request, content=True, authorization=True)
        validate_header_content_type_json(request)
        token = validate_header_authorization(request)

        # VALIDATE REQUEST'S BODY
        # user_from_token = user_from_token(token)  # validate request's token
        validated_request_body = validate_request_body(request, resource_id=user_id, resource='user', action='update')

        # AUTHORIZE USER
        user_from_request = UserModel.find_by_id(user_id)
        if user_from_request.id != user_from_token(token).id:
            return jsonify({'message': error_message}), status_code

        # UPDATE USER
        user_from_request.password = validated_request_body['password']
        user_from_request.save_to_db()

    except AppError as err:
        return jsonify(err.represent()), err.status_code

    # SUCCEED, RETURN MESSAGE
    return jsonify({'message': 'User updated successfully'}), 200
