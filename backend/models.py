from sqlalchemy.orm import declarative_base
from sqlalchemy import String, Boolean, Integer, Column, Text, Float, DateTime

Base = declarative_base()


class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False)

    def __repr__(self):
        return "<User(name='{}')>" \
            .format(self.name)


class Subscription(Base):
    __tablename__ = 'subscriptions'
    id = Column(Integer, primary_key=True)
    start_date = Column(DateTime)
    name = Column(Text)
    price = Column(Float)
    recurs = Column(Boolean, default=False)

    def __repr__(self):
        return "<Subscription( start_date='{}', name={}, price={}, recurs={})>" \
            .format(self.start_date, self.name, self.price, self.recurs)