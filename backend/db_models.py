from sqlalchemy import Column, Integer, Date, Text, Float, Boolean
from sqlalchemy import ForeignKey
from sqlalchemy import String
from sqlalchemy.orm import declarative_base, relationship

Base = declarative_base()


class User(Base):
    __tablename__ = "users"

    id = Column(String)
    name = Column(String)
    email = Column(String)
    photo_url = Column(String)

    subscriptions = relationship("Subscription", back_populates="subscriber")


class Subscription(Base):
    __tablename__ = 'subscriptions'

    id = Column(Integer, primary_key=True)
    start_date = Column(Date, unique=True)
    name = Column(Text)
    price = Column(Float)
    recurs = Column(Boolean, default=False)
    user_id = Column(Integer, ForeignKey('users.id'))

    subscriber = relationship("User", back_populates="subscriptions")
