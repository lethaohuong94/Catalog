from flask import Blueprint, jsonify
from werkzeug.exceptions import HTTPException

error_handler = Blueprint('error_handler', __name__)


class AppError(Exception):
    def __init__(self, message):
        Exception.__init__(self)
        self.message = message


class BadRequestError(AppError):
    def __init__(self, message):
        AppError.__init__(self, message)
        self.status_code = 400


class UnauthorizedError(AppError):
    def __init__(self, message):
        AppError.__init__(self, message)
        self.status_code = 401


class NotFoundError(AppError):
    def __init__(self, message):
        AppError.__init__(self, message)
        self.status_code = 404


class InternalError(AppError):
    def __init__(self, message):
        AppError.__init__(self, message)
        self.status_code = 500


@error_handler.app_errorhandler(AppError)
def app_error_handler(error):
    return jsonify({'message': error.message}), error.status_code


@error_handler.app_errorhandler(HTTPException)
def http_exceptions_handler(e):
    return jsonify({'message': e.description}), e.code
