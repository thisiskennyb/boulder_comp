## Django Authentication Boilerplate

Current features:
- Password validator (requires 8+ characters, 1+ numbers, 1+ special characters)
- Unit testing
- Email account activation on signup
- Reset/forgot password through email
- Change password

In The Works:
- Single sign-on using Google and Facebook
- CI/CD pipeline through GitHub actions
- Containerization for deployment

---

### Purpose
This project will be designed to use as a starting point for future projects that require authentication and is equiped with the following features:
- full authentication with the features listed above
- CI/CD pipline
- Containerized and ready to deploy

---

### Configuration/Setup
This project has an integrated dockerized Postgres database and will require `Docker Desktop` to be installed
- Click [here](https://www.docker.com/products/docker-desktop/) to download docker desktop

This project is designed to send emails and will need to be configured with email account credentials.
<br><br>
Complete the steps below:
1. Create a `.env` file in the root directory and add the email address you would like to use along with the app password
   - [Here](https://support.google.com/mail/answer/185833?hl=en#:~:text=Go%20to%20your%20Google%20Account,the%20page%2C%20select%20App%20passwords.) is a guide on where to find your app password if using GMAIL
```
GMAIL_APP_PASSWORD='sdre mljg iteq hdsa'
EMAIL='example@gmail.com'
```
Note: This project is configured to work with gmail only but can be changed in the `settings.py` file in the project directory

2. In your `backend` directory, create a python virtual environment with the commands below:
```
python -m venv venv
```
```
source venv/bin/activate
```
3. Install the dependencies in your virtual environment with the following command:
```
pip install -r requirements.txt
```
4. Start your Docker container with the Postgres database:
```
docker compose up -d
```
5. Make migrations
```
python manage.py migrate
```
6. Run the server
```
python manage.py runserver
```


---


  
### Usage


### Sign-Up
- Make a post request to `localhost:8000/api/v1/accounts/register/signup` with the following fields:
```json
{
	"username": "maintest1",
	"password": "fishings1F!",
	"confirm_password": "fishings1F!",
	"email": "example@yahoo.com"

}
```
- When the POST request is made an email is sent to the user that contains a link. The user will remain inactive until the link is clicked. Clicking the link will direct the user to a react route as their account is activated
<br><br>
Note: the redirect route can be specified within the `accounts` app directory in the `activate.py` file


### Sign-In
- Make a POST request to `localhost:8000/api/v1/accounts/register/get-token` with the following fields:
```json
{
	"username": "maintest1",
	"password": "fishings1F!"
}
```
- This will return a response with a token as seen below:
```json
{

"token": "390e8ee5a89577bbd0ae6039073242e2a2ea4ac1"

}
```


### Reset/Forgot Password
- To reset a forgotten password Django has created a built-in method to accomplish this that provides two different endpoints

- To initiate a password reset make a POST request to `localhost:8000/password_reset/` using the email address that is associated with the account 
```json
{
	"email": "example@yahoo.com"
}
```
- An email will be sent to the specified email address that contains a link. The last part of the link following the last forward slash contains the reset_password_token that is needed for the next POST request

ex. link:`http://localhost:5173/reset-password/63baecd2474b730f7e55e1` reset_password_token:`63baecd2474b730f7e55e1` 

- Lastly make a POST request to `localhost:8000/password_reset/confirm/` with the reset_password_token and new password
```json
{
	"password":"Better55!",
	"token": "63baecd2474b730f7e55e1"
}
```


### Change Password
- Make a POST request to `localhost:8000/api/v1/accounts/register/change_password/` with the following fields:
```json
{
	"old_password": "Kingkong78@",
	"new_password": "jimboB99!"
}
```

