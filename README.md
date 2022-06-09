# subSCRIBED
### Description
Proof-of-concept for an app to help users find and track their subscriptions in one place. It uses the Gmail API to to extract emails related to subscriptions from the user's inbox. The information is stored in a database so that it persists across sessions.

As there are security issues that have yet to be resolved, this app only runs locally on my computer at the moment. I hope to deploy it online in future.

____
### User stories
Pain point: As subscription services proliferate, it has become increasingly difficult to keep track of what we've subscribed to. Subscriptions that we forget to cancel in turn quietly siphon our money away. While an obvious fix would be to manually note down / set a reminder about every subscription, it would be much speedier if technology could help us with the process! What if we took advantage of the fact that subscriptions are usually accompanied by an email receipt, and used the latter to identify our subscriptions?

Enter __subSCRIBED__, an app that allows users to accomplish the following:
* Log in using Google's credentials flow and view the subscriptions they've added in the app.
* Manually add a subscription, including its name, cost, start date and frequency of recurrence. The app calculates your next billing date accordingly.
* Sort the list of subscriptions by any of the abovementioned fields.
* Have the app scan the user's inbox and retrieve messages related to subscriptions. The app automatically parses out the email's sender and received date for the user. It also provides a preview of the original email in an iframe for the user to check the email's contents.
* Have the user confirm which of the retrieved messages are actually subscriptions, edit details as necessary, and finally save the subscriptions to the app.

____
### UI screenshots
##### Sign in page
![subsCRIBED_signin](https://user-images.githubusercontent.com/99468700/160045675-6443b043-fb4f-4d74-a3d7-97bcf7a4acac.png)

##### Video of authentication flow
https://user-images.githubusercontent.com/99468700/172887275-cdd807fc-3b91-4933-8ea8-aa425671ecec.mov

##### Scan results page — email previews in a popover wrapped around an iframe
![subSCRIBED_homepage](https://user-images.githubusercontent.com/99468700/160045769-4f61ddff-663d-4dd7-afd1-41d71dd5eb95.png)

##### Homepage with subscriptions the user has added
![subSCRIBED_scanresults](https://user-images.githubusercontent.com/99468700/160045774-fce61260-5d7e-417b-a0c6-f2cf389fc29c.png)
____
### Technology and APIs used
* Frontend: React (Javascript)
* Backend: FastAPI (Python)
* Database: PostgreSQL

All three are running on local servers at the moment.

![architecture diagram](https://user-images.githubusercontent.com/99468700/172693645-4d623611-d3b1-4fa1-8c52-4a332ca66f85.png)

#### Gmail and Google APIs
I used the (very handy) [react-google-login](https://www.npmjs.com/package/react-google-login) to obtain each user's id token, which is then sent to the backend and decoded to be stored in the `User` database (yes, this is NOT safe practice!). The backend then uses the user id to check if our user's credentials already exist in the `GmailCredentials` table in our database; if not, a second credentials flow is triggered, this time to seek user's permission to let the app read their Gmail inbox. Upon completion of the flow, we store the credentials in our database and send back the user id to the frontend to store in local storage as the equivalent of a session token (also terrible practice — I'm still learning!). Every time the frontend makes a request to the backend, it sends across this user id/token as an Authorization header.

In my Python backend, I used the `list` method of the [Gmail API](https://developers.google.com/gmail/api/reference/rest/v1/users.messages/get) with a customised search string to obtain the messages that might be related to subscriptions. I then used the `get` method to get more details about the message, including the `Subject` and `Date` information in the headers, and the (encoded) HTML of the main message body. I decoded the message HTML to Unicode Escape with `base64`; from there it was a simple matter to return the HTML to the frontend to render in the iframe.

#### React and Material UI
I used Material UI to style the app — the `Modal`, `Card` and `Form` components are such lifesavers! The `useEffect` hook also proved useful because most requests to the backend endpoints had to run when the component mounted (e.g. on the home page), or when a particular change was made (e.g. edits to subscription details). `useContext` allowed me to easily access and update the `subscriptions` state from each of the app's pages rather than having to lift state to the highest common ancestor.

Here's a diagrammatic representation of my frontend:
![seiproject2v2](https://user-images.githubusercontent.com/99468700/159905547-62b7131f-b8e2-4b97-8587-58ba7b7dbe6e.png)

#### Pydantic, SQLAlchemy and PostgreSQL
Pydantic was very useful for parsing and validating inputs / outputs in the backend. I used [dateparser](https://dateparser.readthedocs.io/en/latest/) to help with calculation of the next billing date, as it handled the problem of different months having different numbers of days (not to mention leap years).


##### Example of using Pydantic
<img width="533" alt="Screenshot 2022-06-08 at 6 52 27 PM" src="https://user-images.githubusercontent.com/99468700/172828369-72b4b02f-19c5-456e-9d1b-20efe68f3cd3.png">

Separately, I also used SQLAlchemy's ORM to create tables for and perform CRUD operations on the PostgreSQL database. The database schema is shown here:
<img width="867" alt="db" src="https://user-images.githubusercontent.com/99468700/159868646-bbc8a16d-3a36-46f1-badd-18ed1f2e3fcb.png">

____
### Challenges and future work:
Working with Google's APIs and learning about authorisation and authentication was immensely challenging. As mentioned numerous times in this README, my workarounds weren't very ideal, and I'd like to streamline the credentials flow and use proper session cookies instead of sending across the user's id. This would set the stage for eventually deploying the app online.

I'd also like to refactor the code for the React frontend, creating more reusable components and custom hooks / functions to prevent components from getting bloated. And I'd definitely like to incorporate more error handling — for instance, catching errors from any API request failure.

Finally, more work could be done to improve the accuracy of the app's identification of actual subscriptions based on emails in the user's Gmail inbox. That might involve some machine learning model — outside of the scope of this project. ;)

