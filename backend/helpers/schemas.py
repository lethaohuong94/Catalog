from marshmallow import Schema, fields, validate


class ItemSchema(Schema):
    id = fields.Int()
    name = fields.Str(required=True, validate=validate.Length(min=1))
    description = fields.Str(required=True)
    author_id = fields.Int()
    category_id = fields.Int()


class CategorySchema(Schema):
    id = fields.Int()
    name = fields.Str(required=True, validate=validate.Length(min=1))
    author_id = fields.Int()
    items = fields.Nested(ItemSchema, only=('id', 'name', 'description'), many=True)


class UserSchema(Schema):
    id = fields.Int()
    name = fields.Str(required=True, validate=validate.Length(min=1))
    password = fields.Str(required=True, validate=validate.Length(min=1), load_only=True)
    categories = fields.Nested(CategorySchema, only=['name'], many=True)
    items = fields.Nested(ItemSchema, only=['name'], many=True)

    class Meta:
        fields = ('id', 'name')
