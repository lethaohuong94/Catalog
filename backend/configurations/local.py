class LocalConfig(object):
    NAME = 'local'

    DB_USER = 'root'
    DB_PASSWORD = 'abc'
    DB_HOST = 'localhost'
    DB_NAME = 'catalog'

    DEFAULT_CATEGORY = 'Unspecified'

    SQLALCHEMY_TRACK_MODIFICATION = False
    SQLALCHEMY_DATABASE_URI = 'mysql://' + DB_USER + ':' + DB_PASSWORD + '@' + DB_HOST + '/' + DB_NAME

    DEBUG = False
