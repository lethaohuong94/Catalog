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

    # it will detect the many to one relationship here
    # therefore will create a list of items
    items = db.relationship('ItemModel', lazy='dynamic')

    @classmethod
    def find_by_name(cls, name):
        return cls.query.filter_by(name=name).first()

    @classmethod
    def find_by_id(cls, category_id):
        return cls.query.filter_by(id=category_id).first()

    def __init__(self, name, author_id):
        self.name = name
        self.author_id = author_id

    def represent(self):
        schema = CategorySchema()
        return schema.dump(self).data

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
