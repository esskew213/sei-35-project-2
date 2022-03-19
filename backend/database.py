from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from db_models import User, Base, Subscription, GmailCredentials

DATABASE_URI = 'postgresql://sarahqtw:sei35project2@localhost/sei35project2'
engine = create_engine(DATABASE_URI, echo=True)
SessionLocal = sessionmaker(bind=engine)


def recreate_database():
    Base.metadata.drop_all(engine)
    Base.metadata.create_all(engine)


def user_exists(user: User):
    session = SessionLocal()
    exists = session.query(User.id).filter_by(id=user.id).first() is not None
    session.close()
    return exists


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


def write_gmail_credentials(credentials: GmailCredentials):
    session = SessionLocal()
    session.add(credentials)
    session.commit()
    session.close()


def get_gmail_credentials(user: User):
    session = SessionLocal()
    credentials = session.query(GmailCredentials.user_id).filter_by(id=user.id)
    session.close()
    return credentials


def get_subscriptions(user_id: str):
    ...
