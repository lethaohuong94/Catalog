from marshmallow import Schema, fields, validate


class ItemLoadSchema(Schema):
    id = fields.Int()
    name = fields.Str(required=True, allow_none=False, validate=validate.Length(min=1))
    description = fields.Str(required=True, allow_none=False)
    category_id = fields.Int()
    author_id = fields.Int()


class ItemDumpSchema(Schema):
    id = fields.Int(required=True)
    name = fields.Str(required=True, allow_none=False, validate=validate.Length(min=1))
    description = fields.Str()
    category_id = fields.Int()
    author_id = fields.Int()


class CategoryLoadSchema(Schema):
    id = fields.Int()
    name = fields.Str(required=True, allow_none=False, validate=validate.Length(min=1))
    author_id = fields.Int()
    items = fields.Nested(ItemLoadSchema, only=('id', 'name', 'description'), many=True)


class CategoryDumpSchema(Schema):
    id = fields.Int(required=True)
    name = fields.Str(required=True, allow_none=False, validate=validate.Length(min=1))
    author_id = fields.Int()
    items = fields.Nested(ItemDumpSchema, only=('id', 'name', 'description'), many=True)


class UserLoadSchema(Schema):
    id = fields.Int()
    name = fields.Str(required=True, allow_none=False, validate=validate.Length(min=1))
    password = fields.Str(required=True, allow_none=False, validate=validate.Length(min=1))
    categories = fields.Nested(CategoryLoadSchema, many=True)
    items = fields.Nested(ItemLoadSchema, many=True)


class UserDumpSchema(Schema):
    id = fields.Int(required=True)
    name = fields.Str(required=True, allow_none=False, validate=validate.Length(min=1))
    categories = fields.Nested(CategoryDumpSchema, only=['name'], many=True)
    items = fields.Nested(ItemDumpSchema, only=['name'], many=True)
