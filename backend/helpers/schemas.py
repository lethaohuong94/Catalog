from marshmallow import Schema, fields, validate


class ItemSchema(Schema):
    id = fields.Int()
    name = fields.Str(required=True, allow_none=False, validate=validate.Length(min=1))
    description = fields.Str(required=True, allow_none=False)
    category_id = fields.Int(required=True, allow_none=False)
    author_id = fields.Int()


class CategorySchema(Schema):
    id = fields.Int()
    name = fields.Str(required=True, allow_none=False, validate=validate.Length(min=1))
    author_id = fields.Int()
    items = fields.Nested(ItemSchema, only=('id', 'name', 'description'), many=True)


class UserSchema(Schema):
    id = fields.Int()
    name = fields.Str(required=True, allow_none=False, validate=validate.Length(min=1))
    password = fields.Str(required=True, allow_none=False, validate=validate.Length(min=1))
    categories = fields.Nested(CategorySchema, only=['name'], many=True)
    items = fields.Nested(ItemSchema, only=['name'], many=True)
