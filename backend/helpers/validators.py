from functools import wraps
from flask import request

from helpers.errors import *
from helpers.security import get_user_from_token


# This decorator wraps around end points that required access token.
def authorization_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        expected_token_wrapper = 'Bearer '
        authorization_error = BadRequestError('Invalid Authorization header')
        # If Authorization header does not exist then raises error.
        try:
            header_value = request.headers['Authorization']
        except Exception:
            raise authorization_error
        # If the value does not start with 'Bearer ' then raises error.
        if not header_value.startswith(expected_token_wrapper):
            raise authorization_error
        # Access token is whatever after 'Bearer '. If token is nothing then raises error.
        access_token = header_value[len(expected_token_wrapper):]
        if not access_token:
            raise authorization_error
        # The header is successfully validated.
        user = get_user_from_token(access_token)
        return f(user, *args, **kwargs)
    return decorated_function


def json_data_required(schema):
    def validate_data(f):
        @wraps(f)
        def wrapper(*args, **kwargs):
            content_type_error = BadRequestError('Invalid Content-Type header')
            # If Content-Type header does not exist then returns error.
            try:
                content_type = request.headers['Content-Type']
            except Exception:
                raise content_type_error
            # If value of Content-Type header is not application/json then returns error.
            if not content_type == 'application/json':
                raise content_type_error

            try:
                request_data = request.get_json()
                load_result = schema().load(request_data)
            except Exception as err:
                raise BadRequestError(err.description)
            # If failed to load data through the schema then returns error.
            if load_result.errors:
                invalid_field = list(load_result.errors)[0]
                invalid_field_error = load_result.errors[invalid_field]
                raise BadRequestError('Invalid ' + invalid_field + ': ' + invalid_field_error[0])
            return f(load_result.data, *args, **kwargs)
        return wrapper
    return validate_data
