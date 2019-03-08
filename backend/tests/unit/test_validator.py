import pytest
from pytest_mock import mocker

from helpers.validators import validate_request_header, validate_request_body
from helpers.errors import BadRequestError, NotFoundError
from helpers.schemas import UserSchema, ItemSchema
from models.user import UserModel
from models.item import ItemModel


class Request:
    def __init__(self):
        self.headers = dict()
        self.body = dict()

    def get_json(self):
        return self.body


class LoadResult:
    def __init__(self):
        self.data = dict()
        self.errors = dict()


class MockUser:
    def __init__(self, user_id):
        self.id = user_id


request = Request()
load_result = LoadResult()


# TEST CONTENT TYPE HEADER
def test_no_content_header():
    with pytest.raises(BadRequestError) as err:
        validate_request_header(request, content=True, authorization=True)


def test_null_value_content_header():
    # request has Content-Type key but no value
    request.headers['Content-Type'] = ''
    with pytest.raises(BadRequestError):
        validate_request_header(request, content=True, authorization=True)


def test_invalid_value_content_header():
    # request has Content-Type key but invalid value
    request.headers['Content-Type'] = 'blah'
    with pytest.raises(BadRequestError):
        validate_request_header(request, content=True, authorization=True)


def test_valid_content_header():
    request.headers['Content-Type'] = 'application/json'
    try:
        validate_request_header(request, content=True, authorization=False)
    except Exception:
        pytest.fail("Failed to pass content type header")


# TEST AUTHORIZATION HEADER
def test_no_authorization_header():
    with pytest.raises(BadRequestError):
        validate_request_header(request, content=True, authorization=True)


def test_null_value_authorization_header():
    # request has Content-Type key but no value
    request.headers['Authorization'] = ''
    with pytest.raises(BadRequestError):
        validate_request_header(request, content=True, authorization=True)


def test_invalid_value_authorization_header():
    # request has Content-Type key but invalid value
    request.headers['Authorization'] = 'blah'
    with pytest.raises(BadRequestError):
        validate_request_header(request, content=True, authorization=True)


def test_valid_wrapper_null_token_authorization_header():
    # request has Content-Type key but invalid value
    request.headers['Authorization'] = 'Bearer '
    with pytest.raises(BadRequestError):
        validate_request_header(request, content=True, authorization=True)


def test_valid_header_header():
    request.headers['Content-Type'] = 'application/json'
    request.headers['Authorization'] = 'Bearer token'
    try:
        token = validate_request_header(request, content=True, authorization=True)
    except Exception:
        pytest.fail("Failed to pass content type header")
    assert token == 'token'


# TEST VALIDATE REQUEST BODY
def test_invalid_data(mocker):
    request.body = dict({'name': 'user1', 'password': 'abc'})
    load_result.errors['password'] = 'some errors'
    mocker.patch('helpers.schemas.UserSchema.load', return_value=load_result)
    with pytest.raises(BadRequestError):
        validate_request_body(request, resource='user', action='create', resource_id=1)
    UserSchema.load.assert_called_once_with(request.body)


def test_auth_user(mocker):
    load_result.errors = None
    load_result.data = request.body

    # fail
    mocker.patch('helpers.schemas.UserSchema.load', return_value=load_result)
    mocker.patch('models.user.UserModel.find_by_name', return_value=None)
    with pytest.raises(BadRequestError):
        validate_request_body(request, resource='user', action='auth', resource_id=1)
    UserModel.find_by_name.assert_called_once_with('user1')

    # succeed
    mocker.patch('models.user.UserModel.find_by_name', return_value='something')
    try:
        validate_request_body(request, resource='user', action='auth', resource_id=1)
    except Exception:
        pytest.fail("Failed to pass create user request")


def test_update_user(mocker):
    # fail, no user found
    mocker.patch('helpers.schemas.UserSchema.load', return_value=load_result)
    mocker.patch('models.user.UserModel.find_by_id', return_value=None)
    with pytest.raises(BadRequestError):
        validate_request_body(request, resource='user', action='update', resource_id=1)

    # succeed
    mocker.patch('models.user.UserModel.find_by_id', return_value='something')
    try:
        validate_request_body(request, resource='user', action='update', resource_id=1)
    except Exception:
        pytest.fail("Failed to pass update user request")


def test_create_resource(mocker):
    # fail, duplicated name
    mocker.patch('helpers.schemas.UserSchema.load', return_value=load_result)
    mocker.patch('models.user.UserModel.find_by_name', return_value='something')
    with pytest.raises(BadRequestError):
        validate_request_body(request, resource='user', action='create', resource_id=1)

    # succeed
    mocker.patch('models.user.UserModel.find_by_name', return_value=None)
    try:
        validate_request_body(request, resource='user', action='create', resource_id=1)
    except Exception:
        pytest.fail("Failed to pass create resource request")


def test_update_resource(mocker):
    mocker.patch('helpers.schemas.ItemSchema.load', return_value=load_result)

    # fail, resource not found
    mocker.patch('models.item.ItemModel.find_by_id', return_value=None)
    with pytest.raises(NotFoundError):
        validate_request_body(request, resource='item', action='update', resource_id=1)

    # fail, duplicated name, unmatched id
    user = MockUser(1)
    mocker.patch('models.item.ItemModel.find_by_name', return_value=user)
    with pytest.raises(NotFoundError):
        validate_request_body(request, resource='item', action='update', resource_id=2)

    # succeed, unique name
    mocker.patch('models.item.ItemModel.find_by_id', return_value='something')
    mocker.patch('helpers.schemas.ItemSchema.load', return_value=load_result)
    mocker.patch('models.item.ItemModel.find_by_name', return_value=None)
    try:
        validate_request_body(request, resource='item', action='update', resource_id=1)
    except Exception:
        pytest.fail("Failed to pass update resource request")

    # succeed, duplicated name, matched id
    mocker.patch('helpers.schemas.ItemSchema.load', return_value=load_result)
    mocker.patch('models.item.ItemModel.find_by_name', return_value=user)
    try:
        validate_request_body(request, resource='item', action='update', resource_id=1)
    except Exception:
        pytest.fail("Failed to pass update resource request")
