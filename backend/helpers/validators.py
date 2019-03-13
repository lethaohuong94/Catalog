from functools import wraps
from flask import request, jsonify

from helpers.schemas import *
from helpers.errors import *
from models.user import UserModel
from models.category import CategoryModel
from models.item import ItemModel

# If the schemas are changed, it can be easily edited here instead of one by one in each function.
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


# This decorator wraps around end points that required content-type application/json header.
def header_content_type_json_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        expected_header_value = 'application/json'
        err = BadRequestError('Invalid Content-Type header')
        # If Content-Type header does not exist then returns error.
        try:
            content_type = request.headers['Content-Type']
        except Exception:
            return jsonify({'message': err.message}), err.status_code
        # If value of Content-Type header is not application/json then returns error.
        if not content_type == expected_header_value:
            return jsonify({'message': err.message}), err.status_code
        # The header is successfully validated.
        return f(*args, **kwargs)
    return decorated_function


# This decorator wraps around end points that required access token.
def header_authorization_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        expected_token_wrapper = 'Bearer '
        err = BadRequestError('Invalid Authorization header')
        # If Authorization header does not exist then returns error.
        try:
            header_value = request.headers['Authorization']
        except Exception:
            return jsonify({'message': err.message}), err.status_code
        # If the value does not start with 'Bearer ' then returns error.
        if not header_value.startswith(expected_token_wrapper):
            return jsonify({'message': err.message}), err.status_code
        # Access token is whatever after 'Bearer '. If token is nothing then returns error.
        access_token = header_value[len(expected_token_wrapper):]
        if not access_token:
            return jsonify({'message': err.message}), err.status_code
        # The header is successfully validated.
        return f(*args, **kwargs)
    return decorated_function


# This function validates the request's body by load it through resource's schema, and returns validated data.
def get_data_from_request(request, resource):
    if resource not in schemas:
        raise InternalError('Unrecognized resource')
    # Schema is defined based on given resource.
    schema = schemas[resource]
    # If failed to get data in json form then returns error.
    try:
        request_data = request.get_json()
        load_result = schema().load(request_data)
    except Exception as err:
        raise BadRequestError(err.description)
    # If failed to load data through the schema then returns error.
    if load_result.errors:
        invalid_field = list(load_result.errors)[0]
        invalid_field_error = load_result.errors[invalid_field]
        raise BadRequestError('Invalid ' + invalid_field + ': ' + invalid_field_error[0])
    # Request body is successfully validated (though schema), validated data is returned.
    return load_result.data


# This function takes validated data from request's body and returns object that needs to be updated.
def get_object_to_update_from_data(data, resource):
    if resource not in models:
        raise InternalError('Unrecognized resource')
    # Model is defined based on given resource.
    model = models[resource]
    # The name has to either stay the same, or changed to an unique name.
    individual_resource = model.find_by_name(data['name'])
    if individual_resource is not None:
        if individual_resource.id != data['id']:
            raise BadRequestError(resource + ' name already exists')
    # The resource that is requested has to exist.
    individual_resource = model.find_by_id(data['id'])
    if individual_resource is None:
        raise NotFoundError('No ' + resource + ' found')
    # Data is successfully validated (through updating action), returns object that needs to be updated.
    return individual_resource


# This function takes validated data from request's body and returns newly created object.
def get_created_object_from_data(data, resource):
    if resource not in models:
        raise InternalError('Unrecognized resource')
    # Model is defined based on given resource.
    model = models[resource]
    # The new resource name has to be unique.
    individual_resource = model.find_by_name(data['name'])
    if individual_resource is not None:
        raise BadRequestError(resource + ' name already exists')
    # Data is successfully validated (through creating action), returns newly created object.
    individual_resource = model(**data)
    return individual_resource
