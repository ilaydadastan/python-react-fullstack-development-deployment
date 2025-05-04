import os

from flask import Flask
from app.api import api_bp
from config import config_by_profile_name
from app.initialization import db, ma, migrate
from flask_cors import CORS


def create_app():
    profile_name = os.getenv("ACTIVE_PROFILE", "development")

    app = Flask(__name__)

    app.config.from_object(config_by_profile_name[profile_name])

    db.init_app(app)
    ma.init_app(app)
    migrate.init_app(app, db)

    CORS(app, origins=config_by_profile_name[profile_name].ALLOWED_ORIGINS)
    app.register_blueprint(api_bp, url_prefix='/api')

    return app
