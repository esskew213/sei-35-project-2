from datetime import date
from pydantic import BaseModel

from db_models import Subscription


class SubscriptionIOModel(BaseModel):
    start_date: date
    name: str
    price_in_dollars: float
    recurs: str

    def convert_to_orm_model(self, user_id):
        return Subscription(
            start_date=self.start_date,
            name=self.name,
            price_in_dollars=self.price_in_dollars,
            recurs=self.recurs,
            user_id=user_id
        )
