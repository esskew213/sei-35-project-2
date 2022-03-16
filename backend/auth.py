from __future__ import print_function

import os.path

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build

# If modifying these scopes, delete the file token.json.
SCOPES = ['https://www.googleapis.com/auth/gmail.readonly']


def has_logged_in():
    """Shows basic usage of the Gmail API.
    Lists the user's Gmail labels.
    """
    creds = None
    # The file token.json stores the user's access and refresh tokens, and is
    # created automatically when the authorization flow completes for the first
    # time.
    if os.path.exists('token.json'):
        creds = Credentials.from_authorized_user_file('token.json', SCOPES)
    # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                'oauth_token.json', SCOPES)
            creds = flow.run_local_server(port=0)
        # Save the credentials for the next run
        with open('token.json', 'w') as token:
            token.write(creds.to_json())
    return True


def get_message_subjects():
    creds = Credentials.from_authorized_user_file('token.json', SCOPES)
    # Call the Gmail API
    service = build('gmail', 'v1', credentials=creds)
    results = service.users().messages().list(userId='me', maxResults=5, includeSpamTrash=False).execute()
    message_ids = [message["id"] for message in results["messages"]]
    message_subjects = []
    for message_id in message_ids:
        message_metadata = service.users().messages().get(userId='me', id=message_id, format="metadata", metadataHeaders=["Subject"]).execute()
        message_headers = message_metadata["payload"]["headers"]
        if message_headers[0]['name'] == "Subject":
            message_subjects.append(message_headers[0]['value'])

    if not message_subjects:
        return ['No messages found.']
    else:
        return message_subjects


if __name__ == '__main__':
    has_logged_in()
