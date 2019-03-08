from sqlalchemy.exc import IntegrityError
from werkzeug.security import safe_str_cmp

from db import db
from helpers.schemas import *
from helpers.errors import *


class UserModel(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20))
    password = db.Column(db.String(20))

    categories = db.relationship('CategoryModel')
    items = db.relationship('ItemModel')

    @classmethod
    def find_by_name(cls, name):
        return cls.query.filter_by(name=name).first()

    @classmethod
    def find_by_id(cls, user_id):
        return cls.query.filter_by(id=user_id).first()

    def __init__(self, name, password):
        self.name = name
        self.password = password

    def represent(self):
        # exclude password from out put
        schema = UserSchema(exclude=['password'])
        return schema.dump(self).data

    def check_password(self, password):
        if safe_str_cmp(self.password, password):
            return True
        else:
            return False

    def save_to_db(self):
        try:
            db.session.add(self)
            db.session.commit()
        except IntegrityError:
            raise BadRequestUser('Failed to save user')
            db.session.rollback()
