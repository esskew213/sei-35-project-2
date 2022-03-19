import logging

import googleapiclient.discovery as google_client
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.errors import HttpError

from database import database
from user import User

SCOPES = [
    'https://www.googleapis.com/auth/gmail.readonly',
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email',
    'openid'
]


def grant_credentials_flow() -> Credentials:
    flow = InstalledAppFlow.from_client_secrets_file('gmail_oauth_token.json', SCOPES)
    credentials = flow.run_local_server(port=0)
    return credentials


def get_and_refresh_credentials(user_email: str) -> Credentials:
    credentials = database["gmail_credentials_table"].get(user_email)
    if not credentials or not credentials.valid:
        if credentials.expired and credentials.refresh_token:
            credentials.refresh(Request())
        else:
            credentials = grant_credentials_flow()
        database["gmail_credentials_table"][user_email] = credentials
    return credentials


def handle_signup():
    credentials = grant_credentials_flow()
    user = get_user(credentials)
    database["gmail_credentials_table"][user.email] = credentials
    database["users_table"][user.email] = user
    return user.email


def get_user(credentials: Credentials) -> User:
    user_info_service = google_client.build('people', 'v1', credentials=credentials)
    user_info = None

    try:
        user_info = user_info_service.people().get(
            resourceName='people/me',
            personFields='names,photos,emailAddresses'
        ).execute()
    except HttpError as e:
        logging.error('An error occurred: %s', e)

    user_id = user_info["resourceName"][7:]
    name = user_info["names"][0]["displayName"]
    email = user_info["emailAddresses"][0]["value"]
    photo_url = user_info["photos"][0]["url"]
    return User(id=user_id, name=name, email=email, photo_url=photo_url)
