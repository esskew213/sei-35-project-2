from datetime import date

from sqlalchemy import create_engine, desc
from sqlalchemy.orm import sessionmaker

from db_models import User, Base, Subscription, GmailCredentials, LastSynced

DATABASE_URI = 'postgresql://sarahqtw:sei35project2@localhost/sei35project2'
engine = create_engine(DATABASE_URI, echo=True)
SessionLocal = sessionmaker(bind=engine)


def recreate_database():
    Base.metadata.drop_all(engine)
    Base.metadata.create_all(engine)


def get_user(user_id: str):
    session = SessionLocal()
    user = session.query(User).filter_by(id=user_id).first()
    session.close()
    return user


def user_exists(user: User):
    return get_user(user.id) is not None


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
    credentials = session.query(GmailCredentials).filter_by(user_id=user.id).first()
    session.close()
    return credentials


def get_subscriptions(user_id: str):
    session = SessionLocal()
    subscriptions = session.query(Subscription).filter_by(user_id=user_id).all()
    session.close()
    return subscriptions


def edit_subscription(subscription: Subscription):
    session = SessionLocal()
    session.merge(subscription)
    session.commit()
    session.close()


def delete_subscription(subscription_id: int):
    session = SessionLocal()
    session.query(Subscription).filter_by(id=subscription_id).delete()
    session.commit()
    session.close()


def add_sync_date(last_synced_date: LastSynced):
    session = SessionLocal()
    session.add(last_synced_date)
    session.commit()
    session.close()


def get_last_synced(user_id: str):
    session = SessionLocal()
    last_synced_date = session.query(LastSynced.last_synced_date).filter_by(user_id=user_id).order_by(LastSynced.last_synced_date.desc()).first()
    session.close()
    return last_synced_date
