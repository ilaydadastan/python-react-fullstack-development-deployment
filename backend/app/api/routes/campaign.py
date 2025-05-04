from flask import Blueprint, jsonify, request
from marshmallow import ValidationError
from sqlalchemy import or_

from app.api.schemas.campaign import CampaignSchema
from app.models.campaign import Campaign
from app.initialization import db
from app.models.payout import Payout

campaign_bp = Blueprint('campaign', __name__, url_prefix='/campaigns')


@campaign_bp.route('', methods=['GET'])
def get_campaigns():
    search = request.args.get('search')
    is_running_filter = str_to_bool(request.args.get('isRunning'))

    query = Campaign.query

    if search:
        like_pattern = f"%{search}%"
        query = query.filter(
            or_(
                Campaign.title.ilike(like_pattern),
                Campaign.url.ilike(like_pattern)
            )
        )

    if is_running_filter is not None:
        query = query.filter(Campaign.is_running.is_(is_running_filter))

    campaigns = query.all()
    campaign_schema = CampaignSchema(many=True)
    return campaign_schema.dump(campaigns)


@campaign_bp.route('/<int:campaign_id>', methods=['GET'])
def get_campaign(campaign_id):
    campaign = db.session.get(Campaign, campaign_id)
    campaign_schema = CampaignSchema(many=False)
    return campaign_schema.dump(campaign)


@campaign_bp.route('/<int:campaign_id>/running', methods=['PUT'])
def update_campaign_running(campaign_id):
    is_running = request.get_json()

    if not isinstance(is_running, bool):
        return {"error": "Expected boolean true or false in request body"}, 400

    campaign = db.session.get(Campaign, campaign_id)
    if not campaign:
        return {"error": "Campaign not found"}, 404

    campaign.is_running = is_running
    db.session.commit()

    return jsonify("OK"), 200


@campaign_bp.route('', methods=['POST'])
def create_campaign():
    data = request.get_json()

    campaign_schema = CampaignSchema()

    try:
        validated_data = campaign_schema.load(data)
    except ValidationError as err:
        return jsonify(err.messages), 400

    new_campaign = Campaign(
        url=validated_data['url'],
        title=validated_data['title'],
        is_running=validated_data['is_running'],
        payouts=[
            Payout(
                amount=p['amount'],
                country=p['country']
            ) for p in validated_data['payouts']
        ]
    )
    db.session.add(new_campaign)
    db.session.commit()

    return campaign_schema.dump(new_campaign), 201


def str_to_bool(value):
    if value is None or value == '':
        return None
    return value.lower() == 'true'
