from googleapiclient.discovery import build

from db_models import User
from google_auth import get_and_refresh_credentials


def get_message_subjects(user: User):
    credentials = get_and_refresh_credentials(user)
    service = build('gmail', 'v1', credentials=credentials)

    # Get the message ids of possible subscriptions
    response = service.users().messages().list(
        userId='me',
        maxResults=1,
        q="+subscribing OR +subscription -(+canceled OR +newsletter)",
        includeSpamTrash=False
    ).execute()
    message_ids = [message["id"] for message in response["messages"]]

    # Create a new batch request for all the messages' contents
    batch = service.new_batch_http_request()
    for message_id in message_ids:
        batch.add(
            service.users().messages().get(
                userId='me',
                id=message_id,
                format="metadata",
                metadataHeaders=["From", "Date"]
            )
        )
    batch.execute()

    for response in batch._responses.values():
        print(response[1])
        message_headers = response[1]["payload"]["headers"]
        print(message_headers)


import database as db

user = db.get_user(user_id="108090992261441832535")
get_message_subjects(user)