from googleapiclient.discovery import build
import re
from datetime import datetime
from db_models import User
from google_auth import get_and_refresh_credentials
import base64
import pprint


def get_message_subjects(user: User):
    credentials = get_and_refresh_credentials(user)
    service = build('gmail', 'v1', credentials=credentials)

    # Get the message ids of possible subscriptions
    response = service.users().messages().list(
        userId='me',
        maxResults=1,
        q="+subscribing OR +subscription -(+canceled OR +cancelled OR +newsletter)",
        includeSpamTrash=False
    ).execute()
    message_ids = [message["id"] for message in response["messages"]]

    all_messages_info = []
    for message_id in message_ids:
        message_info = {}
        message_full = service.users().messages().get(userId='me', id=message_id, format="full").execute()
        message_payload = message_full["payload"]
        pp = pprint.PrettyPrinter(indent=4)
        pp.pprint(message_payload)
        message_body_encoded = message_payload["parts"][1]["body"]["data"]
        message_padded = message_body_encoded + (4 - len(message_body_encoded) % 4)*'='
        message_body_b64 = base64.urlsafe_b64decode(message_padded.encode('ascii'))
        message_body_html = message_body_b64.decode('unicode_escape')
        message_info['message_html'] = message_body_html
        # pp.pprint(re.search(r'(Sent)', message_body_decoded, re.M))
        message_headers = message_payload["headers"]
        for message_header in message_headers:
            if message_header['name'] == 'From':
                re_name = re.match(r'(.*)\s[<]', message_header['value'])
                message_info['name'] = re_name.group(1)
            elif message_header['name'] == 'Date':
                print(message_header['value'])
                # re_date = re.match(r'[0-9]+\s[a-zA-Z]{3}\s[0-9]{4}', message_header['value'])
                # print(re_date)
                message_info['date_started'] = datetime.strptime(message_header['value'], "%a, %d %b %Y %H:%M:%S %z").date()

        all_messages_info.append(message_info)
        pp.pprint(all_messages_info)

    #
    # if not message_subjects:
    #     return ['No messages found.']
    # else:
    #     return message_subjects


import database as db
user = db.get_user(user_id="108090992261441832535")
get_message_subjects(user)