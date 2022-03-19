import pickle

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow

from database import write_user, write_gmail_credentials, get_gmail_credentials
from db_models import User, GmailCredentials

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


def get_and_refresh_credentials(user: User) -> Credentials:
    tentative_credentials = get_gmail_credentials(user)
    if tentative_credentials:
        credentials = pickle.loads(tentative_credentials.credentials_pickle)
    else:
        credentials = None

    if not credentials or not credentials.valid:
        if credentials.expired and credentials.refresh_token:
            credentials.refresh(Request())
        else:
            credentials = grant_credentials_flow()
        gmail_credentials = GmailCredentials(user_id=user.id, credentials_pickle=pickle.dumps(credentials))
        write_gmail_credentials(gmail_credentials)
    return credentials


def handle_signup(user: User):
    credentials = grant_credentials_flow()
    gmail_credentials = GmailCredentials(user_id=user.id, credentials_pickle=pickle.dumps(credentials))
    write_user(user)
    write_gmail_credentials(gmail_credentials)


def create_user_from_jwt(decoded_jwt):
    user_id = str(decoded_jwt["sub"])
    name = decoded_jwt["given_name"]
    email = decoded_jwt["email"]
    photo_url = decoded_jwt["picture"]
    return User(id=user_id, name=name, email=email, photo_url=photo_url)
