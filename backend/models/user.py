from werkzeug.security import generate_password_hash, check_password_hash

from db import db
from helpers.schemas import *
from helpers.errors import *


class UserModel(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20))
    pw_hash = db.Column(db.String(100))

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
        self.set_password(password)

    def set_password(self, password):
        self.pw_hash = generate_password_hash(password, salt_length=1)

    def update(self, data):
        self.set_password(data['password'])

    def check_password(self, password):
        return check_password_hash(self.pw_hash, password)

    def save_to_db(self):
        try:
            db.session.add(self)
            db.session.commit()
        except Exception:
            raise BadRequestUser('Failed to save user')
            db.session.rollback()
