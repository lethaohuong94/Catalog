class AppError(Exception):
    def __init__(self, message):
        Exception.__init__(self)
        self.message = message

    def represent(self):
        response = dict()
        response['message'] = self.message
        return response


class UnauthorizedError(AppError):
    pass


class BadRequestError(AppError):
    pass


class NotFoundError(AppError):
    pass


class InternalError(AppError):
    pass
