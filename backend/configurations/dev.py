class DevConfig(object):
    NAME = 'dev'

    DB_USER = 'root'
    DB_PASSWORD = 'change_this_please'
    DB_HOST = 'localhost'
    DB_NAME = 'catalog'

    DEFAULT_CATEGORY = 'Unspecified'

    SQLALCHEMY_TRACK_MODIFICATION = False
    SQLALCHEMY_DATABASE_URI = 'mysql://' + DB_USER + ':' + DB_PASSWORD + '@' + DB_HOST + '/' + DB_NAME

    DEBUG = True
