from app.api.schemas.payout import PayoutSchema
import pytest
from marshmallow import ValidationError

def test_payout_schema_missing_amount():
    # given
    schema = PayoutSchema()
    data = {"country": "TR"}

    # when
    with pytest.raises(ValidationError) as exc_info:
        schema.load(data)

    # then
    assert "amount" in exc_info.value.messages