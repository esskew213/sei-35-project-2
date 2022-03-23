from datetime import date
from db_models import Subscription, User, LastSynced
from io_models import SubscriptionIOModel, UserIOModel, LastSyncedDateIOModel


def convert_subscription_io_to_orm_model(s_io_model: SubscriptionIOModel, user_id):
    return Subscription(
        id=s_io_model.id,
        date_started=s_io_model.date_started,
        name=s_io_model.name,
        price_in_dollars=s_io_model.price_in_dollars,
        recurs=s_io_model.recurs.value,
        user_id=user_id
    )


def convert_subscription_to_io_model(subscription: Subscription):
    return SubscriptionIOModel(
        date_started=subscription.date_started,
        name=subscription.name,
        price_in_dollars=subscription.price_in_dollars,
        recurs=subscription.recurs,
        id=subscription.id
    )


def convert_user_to_io_model(user: User):
    return UserIOModel(
        id=user.id,
        name=user.name,
        photo_url=user.photo_url
    )


def convert_last_synced_to_orm_model(last_synced_date: date, user_id):
    return LastSynced(
        last_synced_date=last_synced_date,
        user_id=user_id
    )
