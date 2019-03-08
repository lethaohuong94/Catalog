from flask import current_app
import jwt
import datetime

from models.user import UserModel
from helpers.errors import *
from secret_key import SECRET_KEY


# encode user => token
def encode(user):
    # each token last for 15 minutes
    payload = {
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=0, minutes=15),
        'iat': datetime.datetime.utcnow(),
        'id': user.id
    }
    return jwt.encode(
        payload,
        SECRET_KEY,
        algorithm='HS256'
    ).decode('utf-8')


# decode token => payload or Unauthorized Error
def decode(token):
    # try to decode token
    try:
        # the field 'id' should be in the token
        payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        if 'id' in payload:
            return payload
        else:
            raise UnauthorizedError('Invalid Token')
    except jwt.ExpiredSignatureError:
        raise UnauthorizedError('Token is expired')
    except Exception:
        raise UnauthorizedError('Invalid Token')


# username + password => token or Unauthorized Error
def authenticate(name, password):
    user = UserModel.find_by_name(name)
    # valid user name, but invalid password
    if not user.check_password(password):
        raise UnauthorizedError('Invalid action')
    # if successfully authenticated, return token
    return encode(user)


# from request (token) return the user or Unauthorized Error
def identity(token):
    # get payload
    payload = decode(token)
    # get user info
    user = UserModel.find_by_id(payload['id'])
    if user is None:
        raise UnauthorizedError('Invalid token')
    # successfully identify user
    return user
