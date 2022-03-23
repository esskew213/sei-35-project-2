import logging
from datetime import date, timedelta, datetime
from decimal import Decimal
from enum import Enum
from typing import Optional

from pydantic import BaseModel, constr, condecimal, validator, conint
from dateutil.relativedelta import relativedelta


class RecursFreq(Enum):
    NEVER = "NEVER"
    WEEKLY = "WEEKLY"
    MONTHLY = "MONTHLY"
    YEARLY = "YEARLY"


class SubscriptionIOModel(BaseModel):
    id: Optional[constr(min_length=1)]
    date_started: date
    name: constr(strip_whitespace=True, min_length=1)
    price_in_dollars: condecimal(ge=Decimal(0), decimal_places=2)
    recurs: RecursFreq
    next_billing_date: Optional[date]

    @validator("next_billing_date", pre=False, always=True)
    def fill_next_billing_date(cls, value, values):
        if not value:
            return next_billing_date(date_started=values["date_started"], recurs=values["recurs"])
        else:
            logging.warning("Receiving input for next_billing_date. Not expected behaviour.")


def next_billing_date(date_started: date, recurs: RecursFreq) -> Optional[date]:

    def to_relative_delta(delta: timedelta):
        return relativedelta(
            seconds=int(delta.total_seconds()),
            microseconds=delta.microseconds
        )

    delta_since_started = to_relative_delta(date.today() - date_started)

    if recurs is RecursFreq.NEVER:
        return None
    elif recurs is RecursFreq.WEEKLY:
        delta_to_bill = relativedelta(weeks=(delta_since_started.weeks * (delta_since_started.years + 1) * (delta_since_started.months + 1) + 1))
    elif recurs is RecursFreq.MONTHLY:
        months = delta_since_started.months * (delta_since_started.years + 1) + 1
        delta_to_bill = relativedelta(months=months)
    elif recurs is RecursFreq.YEARLY:
        delta_to_bill = relativedelta(years=(delta_since_started.years + 1))
    else:
        raise ValueError("Unrecognised enum value for RecursFreq")

    return delta_to_bill + date_started


class SubsListIOModel(BaseModel):
    subscriptions: list[SubscriptionIOModel]


class UserIOModel(BaseModel):
    id: constr(min_length=1)
    name: constr(min_length=1)
    photo_url: constr(min_length=1)


class ScanResultsIOModel(BaseModel):
    date_started: Optional[date]
    name: constr(strip_whitespace=True, min_length=1)
    message_html: Optional[str]


class ScanListIOModel(BaseModel):
    scan_list: list[ScanResultsIOModel]
