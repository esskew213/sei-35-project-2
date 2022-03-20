from datetime import date
from typing import Optional

from pydantic import BaseModel


class SubscriptionIOModel(BaseModel):
    date_started: date
    name: str
    price_in_dollars: float
    recurs: str
    id: Optional[str]
