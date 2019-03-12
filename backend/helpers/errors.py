class AppError(Exception):
    def __init__(self, message):
        Exception.__init__(self)
        self.message = message

    def represent(self):
        response = dict()
        response['message'] = self.message
        return response


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
        self.status_code = 403


class InternalError(AppError):
    def __init__(self, message):
        AppError.__init__(self, message)
        self.status_code = 404
