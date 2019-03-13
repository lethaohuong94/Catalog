from functools import wraps
from flask import request, jsonify

from helpers.schemas import *
from helpers.errors import *
from models.user import UserModel
from models.category import CategoryModel
from models.item import ItemModel

schemas = {
    'user': UserLoadSchema,
    'category': CategoryLoadSchema,
    'item': ItemLoadSchema
}

models = {
    'user': UserModel,
    'category': CategoryModel,
    'item': ItemModel
}


# decorator
def header_content_type_json_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        expected_header_value = 'application/json'
        err = BadRequestError('Invalid Content-Type header')

        try:
            content_type = request.headers['Content-Type']
        except Exception:
            return jsonify({'message': err.message}), err.status_code

        if not content_type == expected_header_value:
            return jsonify({'message': err.message}), err.status_code

        return f(*args, **kwargs)
    return decorated_function


def header_authorization_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        expected_token_wrapper = 'Bearer '
        err = BadRequestError('Invalid Authorization header')

        try:
            header_value = request.headers['Authorization']
        except Exception:
            return jsonify({'message': err.message}), err.status_code

        if not header_value.startswith(expected_token_wrapper):
            return jsonify({'message': err.message}), err.status_code

        access_token = header_value[len(expected_token_wrapper):]
        if not access_token:
            return jsonify({'message': err.message}), err.status_code

        return f(*args, **kwargs)
    return decorated_function


def get_data_from_request(request, resource):
    if resource not in schemas:
        raise InternalError('Unrecognized resource')

    schema = schemas[resource]
    try:
        request_data = request.get_json()
        load_result = schema().load(request_data)
    except Exception as err:
        raise BadRequestError(err.description)

    if load_result.errors:
        invalid_field = list(load_result.errors)[0]
        invalid_field_error = load_result.errors[invalid_field]
        raise BadRequestError('Invalid ' + invalid_field + ': ' + invalid_field_error[0])

    return load_result.data


def get_object_to_update_from_data(data, resource):
    if resource not in models:
        raise InternalError('Unrecognized resource')

    model = models[resource]

    individual_resource = model.find_by_name(data['name'])
    if individual_resource is not None:
        if individual_resource.id != data['id']:
            raise BadRequestError(resource + ' name already exists')

    individual_resource = model.find_by_id(data['id'])
    if individual_resource is None:
        raise NotFoundError('No ' + resource + ' found')

    return individual_resource


def get_created_object_from_data(data, resource):
    if resource not in models:
        raise InternalError('Unrecognized resource')

    model = models[resource]

    individual_resource = model.find_by_name(data['name'])
    if individual_resource is not None:
        raise BadRequestError(resource + ' name already exists')

    individual_resource = model(**data)

    return individual_resource
