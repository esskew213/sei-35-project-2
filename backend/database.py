from user import User
from google.oauth2.credentials import Credentials


gmail_credentials_table: dict[str: Credentials] = {}
users_table: dict[str: User] = {}
database = {
    "gmail_credentials_table": gmail_credentials_table,
    "users_table": users_table
}
