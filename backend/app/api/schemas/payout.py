from flask_marshmallow import Schema
from flask_marshmallow.fields import fields


class PayoutSchema(Schema):
    id = fields.Int(dump_only=True)
    country = fields.Str(required=True)
    amount = fields.Float(required=True)