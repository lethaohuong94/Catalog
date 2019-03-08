import pytest
from pytest_mock import mocker
from db import db

from models.item import ItemModel


class MockItem:
    def __init__(self, name, description, category_id, author_id):
        self.name = name
        self.description = description
        self.category_id = category_id
        self.author_id = author_id


item = MockItem(name='Item1', description='This is item 1', category_id=1, author_id=1)


def test_init(mocker):
    mocker.patch('db.db.Column', return_value=None)
    mocker.patch('db.db.relationship', return_value=None)
    init_result = ItemModel('Item1', 'This is item 1', 1, 1)
    assert init_result.name == item.name
    assert init_result.description == item.description
    assert init_result.category_id == item.category_id
    assert init_result.author_id == item.author_id

