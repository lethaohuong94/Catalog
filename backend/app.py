import os
from flask import Flask

from controllers.user import user_api
from controllers.category import category_api, add_default_category
from controllers.item import item_api

app = Flask(__name__)


# config from environment variables ENV
config = {
    'dev': 'configurations.dev.DevConfig',
    'test': 'configurations.test.TestConfig',
    'staging': 'configurations.staging.StagingConfig',
    'prod': 'configurations.prod.ProdConfig',
    'local': 'configurations.local.LocalConfig'
}

env_name = os.environ.get('ENV')

if env_name in config:
    app.config.from_object(config[env_name])
else:
    app.config.from_object(config['local'])


@app.before_first_request
def create_tables():
    # be careful with dropping all tables
    db.drop_all()
    db.create_all()
    add_default_category()


app.register_blueprint(user_api)
app.register_blueprint(category_api)
app.register_blueprint(item_api)


if __name__ == '__main__':
    from db import db
    db.init_app(app)
    app.run()
