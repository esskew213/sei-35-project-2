from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from db_models import User, Base, Subscription
from google.oauth2.credentials import Credentials


DATABASE_URI = 'postgresql://sarahqtw:sei35project2@localhost/sei35project2'
engine = create_engine(DATABASE_URI, echo=True)
SessionLocal = sessionmaker(bind=engine)


def recreate_database():
    Base.metadata.drop_all(engine)
    Base.metadata.create_all(engine)


def write_user(user: User):
    session = SessionLocal()
    session.add(user)
    session.commit()
    session.close()


def write_subscription(subscriptions: list[Subscription]):
    session = SessionLocal()
    for sub in subscriptions:
        session.add(sub)
    session.commit()
    session.close()


def get_subscriptions(user_id: str):



gmail_credentials_table: dict[str: Credentials] = {}
users_table: dict[str: User] = {}
database = {
    "gmail_credentials_table": gmail_credentials_table,
    "users_table": users_table
}
