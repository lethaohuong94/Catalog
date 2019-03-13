import jwt
import datetime

from flask import current_app
from models.user import UserModel
from helpers.errors import *


def encode(user):
    # Each token lasts for 15 minutes
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


def decode(access_token):
    try:
        payload = jwt.decode(access_token, current_app.config['JWT_SECRET_KEY'], algorithms=['HS256'])
        if 'id' in payload:
            return payload
        else:
            raise BadRequestError('Invalid access token')
    except jwt.ExpiredSignatureError:
        raise UnauthorizedError('Token is expired')
    except Exception:
        raise BadRequestError('Invalid access token')


def get_user_from_token(access_token):
    payload = decode(access_token)
    user = UserModel.find_by_id(payload['id'])
    if user is None:
        raise BadRequestError('Invalid access token')
    return user


def get_token_from_header(request):
    header_value = request.headers['Authorization']
    token = header_value[len('Bearer '):]
    return token
