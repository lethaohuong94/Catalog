import jwt
import datetime

from flask import current_app
from models.user import UserModel
from helpers.errors import *


# This function encodes user's information into access_token.
def encode(user):
    # Each token lasts for 15 minutes.
    # iat -> now for readability
    now = datetime.datetime.utcnow()
    payload = {
        'exp': now + datetime.timedelta(days=0, minutes=15),
        'iat': now,
        'id': user.id
    }
    return jwt.encode(
        payload,
        current_app.config['JWT_SECRET_KEY'],
        algorithm='HS256'
    ).decode('utf-8')


# This function validates a token and decodes it into payload
def decode(access_token):
    try:
        payload = jwt.decode(access_token, current_app.config['JWT_SECRET_KEY'], algorithms=['HS256'])
        if 'id' not in payload:
            raise BadRequestError('Invalid access token')
        # If the payload is valid then returns payload.
        return payload

    except jwt.ExpiredSignatureError:
        raise UnauthorizedError('Token is expired')
    # If failed to decode the token, then that token is invalid.
    except Exception:
        raise BadRequestError('Invalid access token')


# This function turns token into user object
def get_user_from_token(access_token):
    payload = decode(access_token)
    # There is user id inside the payload.
    user = UserModel.find_by_id(payload['id'])
    if user is None:
        raise BadRequestError('Invalid access token')
    # If the token is valid, return user object
    return user
