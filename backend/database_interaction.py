from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from config import DATABASE_URI
from models import Base, User, Subscription

engine = create_engine(DATABASE_URI,
                       echo=True
                       )

# create a session and bind it to the engine we just created
# sessions allow us to add rows / make changes to objects that have been queried from the db,
# and only commit them when ready
Session = sessionmaker(bind=engine)


def recreate_database():
    Base.metadata.drop_all(engine)
    Base.metadata.create_all(engine)


recreate_database()

s = Session()

user = User(
    name='sarah'
)

s.add(user)
s.commit()
s.query(User).first()

