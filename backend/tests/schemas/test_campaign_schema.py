from app.api.schemas.campaign import CampaignSchema
import pytest
from marshmallow import ValidationError


def test_campaign_schema_valid_data():
    # given
    schema = CampaignSchema()
    valid_data = {
        "title": "Sample Campaign",
        "isRunning": True,
        "landingPageUrl": "https://example.com",
        "payouts": [
            {"country": "TR", "amount": 10.5}
        ]
    }

    # when
    result = schema.load(valid_data)

    # then no err
    assert result["title"] == "Sample Campaign"


def test_campaign_schema_invalid_url():
    # given
    schema = CampaignSchema()
    invalid_data = {
        "title": "Invalid URL Campaign",
        "landingPageUrl": "not-a-url",
        "payouts": [
            {"country": "TR", "amount": 10.5}
        ]
    }

    # when
    with pytest.raises(ValidationError) as exc_info:
        schema.load(invalid_data)

    # then
    assert "landingPageUrl" in exc_info.value.messages
    assert exc_info.value.messages["landingPageUrl"] == ["Invalid URL."]


def test_campaign_schema_empty_payouts():
    # given
    schema = CampaignSchema()
    invalid_data = {
        "title": "No Payouts",
        "landingPageUrl": "https://example.com",
        "payouts": []
    }

    # when
    with pytest.raises(ValidationError) as exc_info:
        schema.load(invalid_data)

    # then
    assert "payouts" in exc_info.value.messages
    assert exc_info.value.messages["payouts"] == ["Invalid payouts."]
