from sqlalchemy import Column, Date, Text, Float, Integer, LargeBinary
from sqlalchemy import ForeignKey
from sqlalchemy import String
from sqlalchemy.orm import declarative_base, relationship

Base = declarative_base()


class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True)
    name = Column(String)
    email = Column(String)
    photo_url = Column(String)

    subscriptions = relationship("Subscription", back_populates="subscriber")
    gmail_credentials = relationship("GmailCredentials", back_populates="user")


class Subscription(Base):
    __tablename__ = 'subscriptions'

    id = Column(Integer, primary_key=True, autoincrement=True)
    date_started = Column(Date)
    name = Column(Text)
    price_in_dollars = Column(Float)
    recurs = Column(String)
    user_id = Column(String, ForeignKey('users.id'))

    subscriber = relationship("User", back_populates="subscriptions")


class GmailCredentials(Base):
    __tablename__ = 'gmail_credentials'

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(String, ForeignKey('users.id'))
    credentials_pickle = Column(LargeBinary)

    user = relationship("User", back_populates="gmail_credentials")
