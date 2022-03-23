from googleapiclient.discovery import build
import re
from datetime import datetime, date

from conversion_util import convert_last_synced_to_orm_model
from database import get_last_synced, add_sync_date
from db_models import User
from google_auth import get_and_refresh_credentials
import base64
import pprint
import dateparser


def get_message_subjects(user: User):
    credentials = get_and_refresh_credentials(user)
    service = build('gmail', 'v1', credentials=credentials)
    latest_sync = get_last_synced(user_id=user.id)
    if latest_sync:
        search_str = f'after:{latest_sync} +subscribing OR +subscription (confirmation OR payment OR charge OR bill OR receipt) -newsletter  -"manage your" -"email preferences" -"unsubscribe from" -"discount" -"offer" -"been cancelled" -"been canceled" -"have canceled" -"have cancelled" -"will be cancelled"',
        print(latest_sync)
    else:
        search_str = '+subscribing OR +subscription (confirmation OR payment OR charge OR bill OR receipt) -newsletter  -"manage your" -"email preferences" -"unsubscribe from" -"discount" -"offer" -"been cancelled" -"been canceled" -"have canceled" -"have cancelled" -"will be cancelled"',

# Get the message ids of possible subscriptions
    try:
        response = service.users().messages().list(
            userId='me',
            maxResults=5,
            q=search_str,
            includeSpamTrash=False
        ).execute()
        message_ids = [message["id"] for message in response["messages"]]

        all_messages_info = []
        for message_id in message_ids:
            message_info = {}
            message_full = service.users().messages().get(userId='me', id=message_id, format="full").execute()
            message_payload = message_full["payload"]

            try:
                message_body_encoded = message_payload["parts"][1]["body"]["data"]
                message_padded = message_body_encoded + (4 - len(message_body_encoded) % 4)*'='
                message_body_b64 = base64.urlsafe_b64decode(message_padded.encode('ascii'))
                message_body_html = message_body_b64.decode('unicode_escape')
                message_info['message_html'] = message_body_html.replace('"', '&quot;')

            except Exception:
                message_info['message_html'] = '<div>No information available.</div>'

            message_headers = message_payload["headers"]
            for message_header in message_headers:

                if message_header['name'] == 'From':
                    try:
                        re_name = re.match(r'(.*)\s[<]', message_header['value'])
                        message_info['name'] = re_name.group(1)
                    except Exception:
                        message_info['name'] = 'no name found'

                elif message_header['name'] == 'Date':
                    try:
                    #TODO: fix some dates can't print
                        re_date = re.search(r'[0-9]+\s[a-zA-Z]{3}\s[0-9]{4}', message_header['value'])
                        message_info['date_started'] = dateparser.parse(re_date.group(0)).date()
                    except Exception:
                        message_info['date_started'] = date.today()

            all_messages_info.append(message_info)

        #
        add_sync_date(last_synced_date=convert_last_synced_to_orm_model(last_synced_date=date.today(), user_id=user.id))

        if not all_messages_info:
            return ['No messages found.']
        else:
            return all_messages_info

    except Exception:
        return [{"date_started": date.today(), "name":'no new subscriptions', "message_html": ''}]
#
# import database as db
# user = db.get_user(user_id="106457933112770779046")
# get_message_subjects(user)