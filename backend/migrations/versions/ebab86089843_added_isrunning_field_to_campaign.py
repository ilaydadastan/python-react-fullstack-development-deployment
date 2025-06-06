"""Added isRunning field to campaign

Revision ID: ebab86089843
Revises: ba7f02f09674
Create Date: 2025-05-03 21:55:53.051063

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ebab86089843'
down_revision = 'ba7f02f09674'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('campaigns', schema=None) as batch_op:
        batch_op.add_column(sa.Column('is_running', sa.Boolean(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('campaigns', schema=None) as batch_op:
        batch_op.drop_column('is_running')

    # ### end Alembic commands ###
