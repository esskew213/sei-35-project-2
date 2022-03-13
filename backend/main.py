from datetime import date
from typing import Optional

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from enum import Enum


app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class RecurrenceFreq(Enum):
    WEEKLY = "weekly"
    MONTHLY = "monthly"
    YEARLY = "yearly"
    NEVER = "never"


class Subscription(BaseModel):
    """
    This class takes the JSON input from the front end and makes sure that it's the correct format.
    Otherwise, it returns a validation error.
    """
    name: str
    start_date: date
    renewal_date: date
    recurrence: RecurrenceFreq
    price: Optional[float]


class Datastore:
    """
    This class simulates a database that holds a single item.
    """
    subscriptions: list[Subscription] = []


@app.get("/get_subscriptions")
async def get_items():
    subscription_str_list = [f"{subscription.name}" for subscription in Datastore.subscriptions]
    subscriptions_str = " | ".join(subscription_str_list)
    return {"message": f"The database contains: {subscriptions_str}"}


@app.post("/post_subscription")
async def post_item(subscription: Subscription):
    Datastore.subscriptions.append(subscription)
