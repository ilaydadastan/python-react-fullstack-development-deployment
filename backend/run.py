import os

from app import create_app
from config import config_by_profile_name

profile_name = os.getenv("PROFILE", "development")
app = create_app(profile_name)

if __name__ == '__main__':
    app.run(debug=config_by_profile_name[profile_name].DEBUG, host='0.0.0.0', port=5001)
