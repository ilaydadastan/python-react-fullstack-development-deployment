from flask import json

BASE_URL = "/api/campaigns/"

def test_get_campaigns_empty(client):
    # when
    response = client.get(BASE_URL)

    # then
    assert response.status_code == 200
    assert response.json == []


def test_get_campaigns_with_data(client, app):
    # given
    from app.models.campaign import Campaign
    from app.models.payout import Payout
    from app.initialization import db

    with app.app_context():
        campaign = Campaign(title="Test Campaign", url="https://example.com", is_running=True)
        campaign.payouts.append(Payout(country="US", amount=5.0))
        db.session.add(campaign)
        db.session.commit()

    # when
    response = client.get(BASE_URL)
    data = response.get_json()

    # then
    assert response.status_code == 200
    assert len(data) == 1
    assert data[0]['title'] == "Test Campaign"

def test_get_campaign_by_id_with_data(client, app):
    # given
    from app.models.campaign import Campaign
    from app.models.payout import Payout
    from app.initialization import db

    new_campaign_id = None
    with app.app_context():
        campaign = Campaign(title="Test Campaign", url="https://example.com", is_running=True)
        campaign.payouts.append(Payout(country="US", amount=5.0))
        db.session.add(campaign)
        db.session.commit()
        new_campaign_id = campaign.id

    # when
    response = client.get(BASE_URL + str(new_campaign_id))
    data = response.get_json()

    # then
    assert response.status_code == 200
    assert data['title'] == "Test Campaign"

def test_update_campaign_running_status_by_id(client, app):
    # given
    from app.models.campaign import Campaign
    from app.models.payout import Payout
    from app.initialization import db

    new_campaign_id = None
    with app.app_context():
        campaign = Campaign(title="Test Campaign", url="https://example.com", is_running=True)
        campaign.payouts.append(Payout(country="US", amount=5.0))
        db.session.add(campaign)
        db.session.commit()
        new_campaign_id = campaign.id
    payload = False

    # when
    response = client.put(BASE_URL + str(new_campaign_id) + "/running", data=json.dumps(payload), content_type='application/json')
    data = response.get_json()

    # then
    assert response.status_code == 200
    assert data == "OK"

def test_create_campaign_success(client):
    # given
    payload = {
        "title": "New Campaign",
        "isRunning": True,
        "landingPageUrl": "https://test.com",
        "payouts": [
            {"country": "TR", "amount": 10.0}
        ]
    }

    # when
    response = client.post(BASE_URL, json=payload)
    data = response.get_json()

    # then
    assert response.status_code == 201
    assert data['title'] == "New Campaign"
    assert data['landingPageUrl'] == "https://test.com"
    assert data['isRunning'] == True
    assert len(data['payouts']) == 1
    assert data['payouts'][0]['country'] == "TR"

def test_create_campaign_missing_fields(client):
    # given
    payload = {
        "landingPageUrl": "https://test.com",
        "payouts": []
    }

    # when
    response = client.post(BASE_URL, json=payload)
    data = response.get_json()

    # then
    assert response.status_code == 400
    assert "title" in data
    assert "payouts" in data
