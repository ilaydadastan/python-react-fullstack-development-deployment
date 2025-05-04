import pytest
from app import create_app
from app.initialization import db as testdb


@pytest.fixture
def app():
    app = create_app()
    with app.app_context():
        testdb.create_all()
        yield app
        testdb.session.remove()
        testdb.drop_all()


@pytest.fixture
def client(app):
    return app.test_client()
