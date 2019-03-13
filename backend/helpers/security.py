import jwt
import datetime

from flask import current_app
from models.user import UserModel
from helpers.errors import *


# This function encodes user's information into access_token.
def encode(user):
    # Each token lasts for 15 minutes.
    iat = datetime.datetime.utcnow()
    payload = {
        'exp': iat + datetime.timedelta(days=0, minutes=15),
        'iat': iat,
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


# This function extracts access token from validated Authorization header
def get_token_from_header(request):
    header_value = request.headers['Authorization']
    token = header_value[len('Bearer '):]
    return token
