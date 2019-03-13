from marshmallow import Schema, fields, validate

from db import db
from helpers.schemas import *
from helpers.errors import *


class CategoryModel(db.Model):
    __tablename__ = 'categories'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20))

    author_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    author = db.relationship('UserModel')

    items = db.relationship('ItemModel', lazy='dynamic')

    @classmethod
    def find_by_name(cls, name):
        return cls.query.filter_by(name=name).first()

    @classmethod
    def find_by_id(cls, category_id):
        return cls.query.filter_by(id=category_id).first()

    @classmethod
    def get_all(cls):
        return cls.query.all()

    def __init__(self, name, author_id):
        self.name = name
        self.author_id = author_id

    def update(self, data):
        self.name = data['name']

    def save_to_db(self):
        try:
            db.session.add(self)
            db.session.commit()
        except Exception:
            raise BadRequestError('Failed to save category')
            db.session.rollback()

    def delete_from_db(self):
        try:
            db.session.delete(self)
            db.session.commit()
        except Exception:
            raise BadRequestError('Failed to delete category')
            db.session.rollback()
