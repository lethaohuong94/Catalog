import pytest
from pytest_mock import mocker
import jwt

from helpers.errors import *
from helpers.security import *
from models.user import UserModel


class MockUser:
    def __init__(self, check, id):
        self.check = check
        self.id = id

    def check_password(self, password):
        return self.check


def test_authenticate(mocker):
    mocker.patch('models.user.UserModel.find_by_name', return_value=MockUser(False, 1))
    # fail, check_password = false
    with pytest.raises(UnauthorizedError):
        authenticate(name='user1', password='abc')

    # succeed
    mocker.patch('models.user.UserModel.find_by_name', return_value=MockUser(True, 1))
    try:
        authenticate(name='user1', password='abc')
    except Exception:
        pytest.fail("Failed to pass authenticate user")


"""
def test_identity(mocker):
    mocker.patch('models.user.UserModel.find_by_id', return_value=None)
    mocker.patch('helpers.security.decode', return_value=dict({'id': '1'}))
    # fail, user doesn't exist
    with pytest.raises(UnauthorizedError):
        identity('token')

    # succeed
    mocker.patch('models.user.UserModel.find_by_id', return_value=MockUser(True, 1))
    try:
        identity('token')
    except Exception:
        pytest.fail("Failed to pass authenticate user")
"""


def test_decode(mocker):
    mocker.patch('jwt.decode', return_value=None)
    # fail, id is not in payload
    with pytest.raises(UnauthorizedError):
        decode('token')

    # succeed
    mocker.patch('jwt.decode', return_value=dict({'id': '1'}))
    try:
        decode('token')
    except Exception:
        pytest.fail("Failed to pass authenticate user")
