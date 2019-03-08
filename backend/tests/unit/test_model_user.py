import pytest
from pytest_mock import mocker
from db import db

from models.user import UserModel


class MockUser:
    def __init__(self, name, password):
        self.name = name
        self.password = password


user = MockUser(name='user1', password='abc')


def test_init(mocker):
    mocker.patch('db.db.Column', return_value=None)
    mocker.patch('db.db.relationship', return_value=None)
    init_result = UserModel('user1', 'abc')
    assert init_result.name == user.name
    assert init_result.password == user.password

