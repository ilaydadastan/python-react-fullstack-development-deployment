from marshmallow import validates, ValidationError, fields
from marshmallow.fields import List, URL

from app.initialization import ma
from app.api.schemas.payout import PayoutSchema

class CampaignSchema(ma.Schema):
    id = fields.Int(dump_only=True)
    title = fields.Str(required=True, error_messages={"required": "Title is required"})
    url = URL(data_key="landingPageUrl", required=True, error_messages={"invalid": "Invalid URL.", "required": "URL is required"})
    is_running = fields.Boolean(data_key="isRunning", required=True)
    payouts = List(ma.Nested(PayoutSchema), required=True)

    @validates("payouts")
    def check_payouts_not_empty(self, value):
        if not value:
            raise ValidationError("Invalid payouts.")