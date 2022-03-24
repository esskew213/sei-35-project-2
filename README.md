# SEI-35 PROJECT 2
### Description
A toy app to help users find and track their subscriptions in one place. It uses the Gmail API to to extract emails related to subscriptions from the user's inbox. The information is stored in a database so that it persists across sessions.

As there are security issues that have yet to be resolved, this app only runs locally on my computer at the moment. I hope to deploy it online in future.

____
### User stories
Pain point: As subscription services proliferate, it has become increasingly difficult to keep track of our subscriptions, resulting in a waste of money if we forget to cancel subscriptions that we no longer use. While an obvious fix would be to manually note down / set a reminder about every subscription, it would be much speedier if technology could help us with the process! What if we took advantage of the fact that subscriptions are usually accompanied by an email receipt, and used the latter to identify our subscriptions?

Enter __subSCRIBED__, an app that allows users to accomplish the following:
* Log in using Google's credentials flow and view the subscriptions they've added in the app.
* Manually add a subscription, including its name, cost, start date and frequency of recurrence. The app calculates your next billing date accordingly.
* Sort the list of subscriptions by any of the abovementioned fields.
* Have the app scan the user's inbox and retrieve messages related to subscriptions. The app automatically parses out the email's sender and received date for the user. It also provides a preview of the original email in an iFrame for the user to check the email's contents.
* Have the user confirm which of the retrieved messages are actually subscriptions, edit details as necessary, and finally save the subscriptions to the app.

____
### Technology and APIs used
* Frontend: React (Javascript)
* Backend: FastAPI (Python)
* Database: PostgreSQL
All three are running on local servers at the moment.

I used Google's OAuth 2.0 flow to obtain the user's info (including their profile photo and name), and the Gmail API to scan emails in the user's inbox. I also used SQLAlchemy's ORM to create and write to the database. The ERD is shown here:
<img width="867" alt="db" src="https://user-images.githubusercontent.com/99468700/159868646-bbc8a16d-3a36-46f1-badd-18ed1f2e3fcb.png">

____
### Challenges and future work:

Working with Google's APIs was immensely difficult. The [react-google-login](https://www.npmjs.com/package/react-google-login) package enabled me to obtain an id token — which I sent to the backend to decode (yes, this is NOT safe!). The decoded user info is stored in the User table in the database.
