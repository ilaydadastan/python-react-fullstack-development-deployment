from app.initialization import db

class Payout(db.Model):
    __tablename__ = 'payouts'

    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float, nullable=False)
    country = db.Column(db.String(100), nullable=False)

    campaign_id = db.Column(db.Integer, db.ForeignKey('campaigns.id'), nullable=False)