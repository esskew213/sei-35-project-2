from datetime import date
from pydantic import BaseModel

from db_models import Subscription


class SubscriptionIOModel(BaseModel):
    date_started: date
    name: str
    price_in_dollars: float
    recurs: str

    def convert_to_orm_model(self, user_id):
        return Subscription(
            date_started=self.date_started,
            name=self.name,
            price_in_dollars=self.price_in_dollars,
            recurs=self.recurs,
            user_id=user_id
        )
