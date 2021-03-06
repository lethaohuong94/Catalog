from helpers.validators import *
from helpers.security import *
from helpers.schemas import UserSchema

user_api = Blueprint('user_api', __name__)
load_schema = UserSchema
# load this Schema directly to decorator


@user_api.route('/users', methods=['POST'])
@json_data_required(load_schema)
def create_user(data):
    # If the new user name is not unique then returns error.
    user = UserModel.find_by_name(data['name'])
    if user is not None:
        raise BadRequestError('user already exists')

    # If successfully create new user then save that to db and returns message.
    user = UserModel(**data)
    user.save_to_db()
    user = UserModel.find_by_name(data['name'])
    access_token = encode(user);
    return jsonify({'message': 'user created successfully', 'id': user.id, 'access_token': access_token}), 201


@user_api.route('/auth', methods=['POST'])
@json_data_required(load_schema)
def authenticate_user(data):
    # If either user name doesn't exist, or password doesn't match then returns error.
    user = UserModel.find_by_name(data['name'])
    if user is None:
        raise UnauthorizedError('Invalid username/password')
    if not user.check_password(data['password']):
        raise UnauthorizedError('Invalid username/password')
    # If identity is successfully proven, then returns access token.
    access_token = encode(user)
    user = UserModel.find_by_name(data['name'])
    return jsonify({'access_token': access_token, 'id': user.id})


@user_api.route('/users/<int:user_id>', methods=['PUT'])
@authorization_required
@json_data_required(load_schema)
def update_user(data, user_from_token, user_id):
    # If user_id doesn't exists then return 404 error.
    user_from_request = UserModel.find_by_id(user_id)
    if user_from_request is None:
        raise NotFoundError('No user found')

    # User_id is compared with id of token.
    # If they don't match then return unauthorized error.
    if user_from_request.id != user_from_token.id:
        raise UnauthorizedError('Unauthorized action')

    # If authorized then updates user and saves to db.
    user_from_request.update(data)
    user_from_request.save_to_db()
    return jsonify({'message': 'User updated successfully'})

