from flask import Blueprint

from .routes.campaign import campaign_bp

api_bp = Blueprint('api', __name__)
api_bp.register_blueprint(campaign_bp)

