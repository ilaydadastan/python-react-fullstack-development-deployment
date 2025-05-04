from app.initialization import db


class Campaign(db.Model):
    __tablename__ = 'campaigns'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), nullable=False)
    url = db.Column(db.String(255), nullable=False)
    is_running = db.Column(db.Boolean, default=True)
    payouts = db.relationship('Payout', backref='campaign', lazy=True)