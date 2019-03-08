from helpers.schemas import *
from helpers.errors import *
from models.user import UserModel
from models.category import CategoryModel
from models.item import ItemModel


def validate_request_header(request, content=True, authorization=True):
    # check if the Content-Type header is valid
    if content:
        # declare error's message and expected content_type
        expected_content_type = 'application/json'
        content_type_error = 'Invalid Content-Type header'
        # check if header is valid
        try:
            content_type = request.headers['Content-Type']
        except Exception:
            raise BadRequestError(content_type_error)
        # check if header's value is application/json
        if not content_type == expected_content_type:
            raise BadRequestError(content_type_error)

    # check if the Authorization header is valid
    if authorization:
        # declare error's message and expected content_type
        expected_token_wrapper = 'Bearer '
        auth_error = 'Invalid Authorization header'
        # check if header is valid
        try:
            header_value = request.headers['Authorization']
        except Exception:
            raise BadRequestError(auth_error)
        # check if token is wrapped with 'Bearer '
        if not header_value.startswith(expected_token_wrapper):
            raise BadRequestError(auth_error)
        # check if token exists
        token = header_value[len(expected_token_wrapper):]
        if not token:
            raise BadRequestError('Invalid Authorization header')
        # valid header, return token
        return token


# helper, raise Bad Request error
def validate_request_body(request, resource, action='', resource_id=0):
    # GET THE SPECIFIC MODEL AND SCHEMA
    if resource is 'user':
        model = UserModel
        schema = UserSchema
    elif resource is 'category':
        model = CategoryModel
        schema = CategorySchema
    elif resource is 'item':
        model = ItemModel
        schema = ItemSchema
    else:
        raise InternalError('Unrecognized resource')

    # VALIDATE DATA BASED ON SPECIFIC SCHEMA
    try:
        request_data = request.get_json()
        load_result = schema().load(request_data)
    except Exception:
        raise BadRequestError('Invalid data')

    # invalid input
    if load_result.errors:
        raise BadRequestError('Invalid data')

    # VALIDATE DATA BASED ON SPECIFIC ACTION
    # special actions for user
    if resource is 'user' and action is 'auth':
        # user has to exist
        individual_resource = model.find_by_name(load_result.data['name'])
        if individual_resource is None:
            raise BadRequestError('Invalid action')

    elif resource is 'user' and action is 'update':
        # user has to exist
        individual_resource = model.find_by_id(resource_id)
        if individual_resource is None:
            raise BadRequestError('Invalid action')

    # for all resources
    elif action is 'create':
        # individual_resource has to be unique
        individual_resource = model.find_by_name(load_result.data['name'])
        if individual_resource is not None:
            raise BadRequestError(resource + ' already exists')

    elif action is 'update':
        # individual_resource has to exist
        individual_resource = model.find_by_id(resource_id)
        if individual_resource is None:
            raise NotFoundError('No ' + resource + ' found')
        # individual_resource is either updated with unique name, or not updated at all
        individual_resource = model.find_by_name(load_result.data['name'])
        if individual_resource is not None:
            print('blah')
            # if name already exists, it has to match category_id
            if individual_resource.id == resource_id:
                pass
            else:
                raise BadRequestError(resource + ' already exists')

    else:
        pass

    # REQUEST'S BODY IS VALID, RETURN BODY
    return load_result.data
