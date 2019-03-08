import pytest
from pytest_mock import mocker
from db import db

from models.category import CategoryModel


class MockCategory:
    def __init__(self, name, author_id):
        self.name = name
        self.author_id = author_id


category = MockCategory(name='Category1', author_id=1)


def test_init(mocker):
    mocker.patch('db.db.Column', return_value=None)
    mocker.patch('db.db.relationship', return_value=None)
    init_result = CategoryModel('Category1', 1)
    assert init_result.name == category.name
    assert init_result.author_id == category.author_id

