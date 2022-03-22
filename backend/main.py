from datetime import date

from fastapi import FastAPI, Header
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional

import database as db
from conversion_util import convert_subscription_io_to_orm_model, convert_subscription_to_io_model, \
    convert_user_to_io_model
from email_scanner import get_message_subjects
from google_auth import handle_signup, create_user_from_jwt
from google.oauth2 import id_token
from google.auth.transport import requests
from io_models import SubscriptionIOModel, SubsListIOModel, RecursFreq, ScanListIOModel

app = FastAPI()

ORIGINS = [
    "http://localhost:3000",
]
CLIENT_ID = open('client_id.secret', 'r').read()

app.add_middleware(
    CORSMiddleware,
    allow_origins=ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/sign_in")
async def sign_in(authorization: Optional[str] = Header(None)):
    decoded_jwt = id_token.verify_oauth2_token(
        id_token=authorization,
        request=requests.Request(),
        audience=CLIENT_ID
    )
    user = create_user_from_jwt(decoded_jwt)
    user_id = user.id
    if not db.user_exists(user):
        handle_signup(user)
    return {"user_id": user_id}


@app.post("/add_subscriptions")
async def add_subscriptions(endpoint_input: SubsListIOModel, authorization: Optional[str] = Header(None)):
    subscriptions = [
        convert_subscription_io_to_orm_model(s_io_model=subscription, user_id=authorization)
        for subscription in endpoint_input.subscriptions
    ]
    db.write_subscription(subscriptions=subscriptions)


@app.get("/get_subscriptions")
async def get_subscriptions(authorization: Optional[str] = Header(None)):
    subscriptions = db.get_subscriptions(user_id=authorization)
    subscriptions = [convert_subscription_to_io_model(subscription=subscription) for subscription in subscriptions]
    return {"subscriptions": subscriptions}


@app.post("/edit_subscription")
async def edit_subscription(subscription_input: SubscriptionIOModel, authorization: Optional[str] = Header(None)):
    subscription = convert_subscription_io_to_orm_model(s_io_model=subscription_input, user_id=authorization)
    db.edit_subscription(subscription=subscription)


@app.delete("/delete_subscription")
async def delete_subscription(subscription_id: int, authorization: Optional[str] = Header(None)):
    db.delete_subscription(subscription_id=subscription_id)


@app.get("/get_user_info")
async def get_user_info(authorization: Optional[str] = Header(None)):
    user = db.get_user(user_id=authorization)
    return convert_user_to_io_model(user)


@app.get("/fetch_new_subscriptions")
async def fetch_new_subscriptions(authorization: Optional[str] = Header(None)):
    user = db.get_user(user_id=authorization)
    return ScanListIOModel(scan_list=get_message_subjects(user))

# SubsListIOModel(subscriptions=[
#         SubscriptionIOModel(
#             date_started=date(year=2020, month=2, day=29),
#             name="First email scan",
#             price_in_dollars=49.90,
#             recurs=RecursFreq.YEARLY
#         ),
#         SubscriptionIOModel(
#             date_started=date(year=2021, month=3, day=31),
#             name="Second email scan",
#             price_in_dollars=19.90,
#             recurs=RecursFreq.MONTHLY
#         ),
#         SubscriptionIOModel(
#             date_started=date(year=2019, month=1, day=1),
#             name="Third email scan",
#             price_in_dollars=33.33,
#             recurs=RecursFreq.NEVER
#         )
#     ]