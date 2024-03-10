

# Table of Contents
- [Quickstart](#quick-start)
- [Docker](#docker)
- [Email config](#email-setup)
- [S3 Storage Config ](#aws-s3-setup)
- [ Go to frontend instructions ](../frontend/README.md#run-frontend-local)



# Endpoints

- [Sign Up](#sign-up)
- [Sign In ](#sign-in)
- [Password / Reset ](#resetforgot-password)


[Return to Main Table of Contents](../README.md#table-of-contents)
[Backend Table of contents](#table-of-contents)

# Run Local Backend


In your `boulder_comp/backend` directory, create a `venv` with the commands below:
1. Create `venv`
```
python -m venv venv
```
2. Activate `venv`
```
source venv/bin/activate
```
3. Install the dependencies in your `venv` with the following command:
```
pip install -r requirements.txt
```
4. Start your `Docker container` with the Postgres database: See [Docker](#docker)
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

[Return to Main Table of Contents](../README.md#table-of-contents)
[Backend Table of contents](#table-of-contents)



### Quick Start

## Docker
This project has an integrated dockerized Postgres database and will require `Docker Desktop` to be installed
- Click [here](https://www.docker.com/products/docker-desktop/) to download docker desktop


# Email Setup


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

[Return to Main Table of Contents](../README.md#table-of-contents)
[Backend Table of contents](#table-of-contents)



## AWS S3 Setup
This project has file storage set up to use AWS S3 bucket storage. To properly handle images in the application

This is a service provided by AWS, to get started, create an account and login
- Click [here](https://aws.amazon.com/free/?gclid=CjwKCAiA0bWvBhBjEiwAtEsoW6CceEBLLkMr_4_vTAO2PTn3y-aLEu0V9fuZs8e514idfAa1maElpxoCIi8QAvD_BwE&trk=6a4c3e9d-cdc9-4e25-8dd9-2bd8d15afbca&sc_channel=ps&ef_id=CjwKCAiA0bWvBhBjEiwAtEsoW6CceEBLLkMr_4_vTAO2PTn3y-aLEu0V9fuZs8e514idfAa1maElpxoCIi8QAvD_BwE:G:s&s_kwcid=AL!4422!3!651751059780!e!!g!!aws!19852662197!145019195897&all-free-tier.sort-by=item.additionalFields.SortRank&all-free-tier.sort-order=asc&awsf.Free%20Tier%20Types=*all&awsf.Free%20Tier%20Categories=*all)





- [ ] Go to AWS and Create a S3 Bucket
    - [ ] Give bucket a name
    - [ ] Uncheck block all public access
- [ ] Edit bucket policy
    - [ ] Use AWS policy generator
        - [ ] S3 Bucket
        - [ ] Allow
        - [ ] Principal *
        - [ ] Action Get Object
        - [ ] Provide bucket ARN on AWS
        - [ ] Append /* to ARN name
        - [ ] Generate Policy
        - [ ] Copy generated policy and save changes

- [ ] Generate Access Keys
    - [ ] Go to IAM console
    - [ ] Go to Security Credentials
    - [ ] Create Access Key, Do not share with anyone
    - [ ] Store Generated Access Key credentials somewhere securely, again do not share


Python Libraries to update

Navigate to your boulder_comp/backend, and ensure your venv is activated and up to date with the current policies
For more information on your python virtual environment, click [here](#python-venv)


If you want to know more about the boto3 library, click [here](https://django-storages.readthedocs.io/en/latest/backends/amazon-S3.html)
- Configuration for django:
    - [ ] Install the boto 3 library, Note this will be included in the requirements.txt
    - [ ] Update Django to use your s3 bucket
        - [ ] Provide Access Key in settings, these are sensitive, best not to hard code exposed to github or other version control
        - [ ] Provide Secret Key in settings, these are sensitive, best not to hard code exposed to github or other version control
        - [ ] Provide Bucket Name in settings, these are sensitive, best not to hard code exposed to github or other version control


At this point you should be able to run your code locally, but be sure not to leave hardcoded information

For help with `setting up a script` or `handling environment variables` click [here](#run-local)

[Return to Main Table of Contents](../README.md#table-of-contents)
[Backend Table of contents](#table-of-contents)




# Run Frontend Local
Steps for running front end here
---

[Run Frontend Local](../frontend/README.md#run-frontend-local)




## make Env
Navigate to `boulder_comp/backend`

Create a .env file

- Command to create a file named

```
touch .env
```

Inside your .env file update the following variables:

- env checklist
    - [ ] S3 Access
    - [ ] S3 Secret
    - [ ] S3 Bucket
    - [ ] email for account activation/password reset
    - [ ] credentials for email

- You need to provide these credentials to run the application. 

- You may use the same format for your environment variables, but still must use your credentials
    - [ ] Assign S3 variable in env to S3 Access key
    - [ ] Assign S3 variable in env to S3 Secret key
    - [ ] Assign S3 variable in env to S3 Bucket name
    - [ ] Assign email variable in env  to email
    - [ ] Assign email variable in env to email credentials
    - [ ] Check that variables in ENV are properly used in `boulder_comp/backend/roll_tracker/settings.py`
- Do not hard code credentials for security purposes


Navigate to your `boulder_comp/backend` directory




[Return to Main Table of Contents](../README.md#table-of-contents)
[Backend Table of contents](#table-of-contents)
  
### Backend Endpoints


### Sign-Up
- Make a post request to 
---
```
localhost:8000/api/v1/accounts/register/signup
```
---
- with the following fields:
---
```json
{
	"username": "maintest1",
	"password": "fishings1F!",
	"confirm_password": "fishings1F!",
	"email": "example@yahoo.com" // Use a valid email, you need the code from the email
}
```
---

- When the POST request is made an email is sent to the user that contains a link. The user will remain inactive until the link is clicked. Clicking the link will direct the user to a react route as their account is activated
<br><br>
Note: the redirect route can be specified within the `accounts` app directory in the `activate.py` file

[Back to Table Of Contents](#table-of-contents)









## Sign-In

- Make a POST request to
--- 
```
localhost:8000/api/v1/accounts/register/get-token
```
---

- with the following fields:
---
```json
{
	"username": "maintest1",
	"password": "fishings1F!"
}
```
---

- This will return a response with a token as seen below:
---
```json
{

"token": "390e8ee5a89577bbd0ae6039073242e2a2ea4ac1"

}
```

[Back to Table Of Contents](#table-of-contents)


### Reset/Forgot Password
- To reset a forgotten password Django has created a built-in method to accomplish this that provides two different endpoints

- To initiate a password reset make a POST request to
 ```
 localhost:8000/password_reset/
 ``` 
 - using the email address that is associated with the account in the BODY 
 ---
```json
{
	"email": "example@yahoo.com"
}
```
---
- An email will be sent to the specified email address that contains a link. The last part of the link following the last forward slash contains the reset_password_token that is needed for the next POST request
<br></br>
<br></br>
---
- ex. link:`http://localhost:5173/reset-password/63baecd2474b730f7e55e1` reset_password_token:`63baecd2474b730f7e55e1` 
---
<br></br>
<br></br>

- Lastly make a POST request to 
---
```
localhost:8000/password_reset/confirm/
```
---
- with the reset_password_token and new password in the BODY
---
```json
{
	"password":"Better55!",
	"token": "63baecd2474b730f7e55e1"
}
```
---

[Back to Table Of Contents](#table-of-contents)


### Change Password
- Make a POST request to `localhost:8000/api/v1/accounts/register/change_password/` with the following fields:
```json
{
	"old_password": "Kingkong78@",
	"new_password": "jimboB99!"
}
```

[Back to Table Of Contents](#table-of-contents)
### Create User Dashboard
- Make a POST request to `localhost:8000/api/v1/accounts/register/create_dashboard/` with the folowing data:

Don't forget to put Authorization Header with Token

```json
{
    "highest_boulder_grade": "V7"
}
```
[Back to Table Of Contents](#table-of-contents)
### Retrieve User Dashboard

- Make a GET request to `localhost:8000/api/v1/accounts/register/create_dashboard/` with the folowing data:

Don't forget to put Authorization Header with Token

No body to pass for GET

Returns something like:
```json
{
    "user": 6,
    "height": null,
    "weight": null,
    "ape_index": null,
    "highest_boulder_grade": "V7",
    "highest_route_grade": null
}
```

[Back to Table Of Contents](#table-of-contents)
### Make Changes to User Dashboard

- Make PUT request to `localhost:8000/api/v1/accounts/register/create_dashboard/` with the following data:

Don't forget Auth Header

(All fields are optional, so send the fields you wish to update) -- Will handle logic for updating boulder grades later
Body:
```json
	{
    "height": "80",
    "weight": 400,
    "ape_index": 3.2
}
```

Returns: Updated User Dashboard Info

```json
{
    "id": 1,
    "height": "80",
    "weight": 400,
    "ape_index": 3.2,
    "highest_boulder_grade": "V7",
    "highest_route_grade": null,
    "user": 6
}
```
[Back to Table Of Contents](#table-of-contents)
### Log a Send

- Make POST request to `localhost:8000/api/v1/send/` with the following data:

```json
{
    "name": "Curls for the girls",
    "grade": "v5",
    "crag": "rocktown",
    "flash": false,
    "send_date": "2024-02-19"
}

```

Which should return something like:

```json
{
    "id": 8,
    "boulder": {
        "id": 2,
        "name": "Curls for the girl",
        "grade": "v5",
        "crag": "rocktown"
    },
    "send_date": "2024-02-19",
    "flash": false,
    "score": 1,
    "user": 6
}
```
[Back to Table Of Contents](#table-of-contents)
### View all sends for a user

- Make GET request to `localhost:8000/api/v1/send/` , no data needed for GET

Returns something like:
```json
[
    {
        "id": 3,
        "boulder": {
            "id": 1,
            "name": "Curls for the girls",
            "grade": "v7",
            "crag": "rocktown"
        },
        "send_date": "2024-02-19",
        "flash": true,
        "score": 0,
        "user": 6
    },]
```

### Create a League

- Make a post request to `localhost:8000/api/v1/league/` with the following data:

```json
{
    "league_name": "Testing Team E",
    "start_date": "2024-02-28",
    "end_date": "2024-04-28",
    "team_size": 4,
    "location": "Chattanooga"
}
```

[Back to Table Of Contents](#table-of-contents)

### Get all Leagues

- Make a GET request to `localhost:8000/api/v1/league/all/` no data needed.

[Back to Table Of Contents](#table-of-contents)
### Get all leagues that a user is in

- Make a GET request to `localhost:8000/api/v1/league/` no data is needed

[Back to Table Of Contents](#table-of-contents)
### Get a specific league

- Make a GET request to `localhost:8000/api/v1/league/1` where the number after league/ is the league_id you wish to retrieve

[Back to Table Of Contents](#table-of-contents)
### Create a Team in a league

- Make a POST request `localhost:8000/api/v1/league/create_team/` with the following data:

```json
{
    "league_id": 3,
    "team_name": "chiparroo"
}
```
[Back to Table Of Contents](#table-of-contents)

### Get all of a Users Teams
- Make a GET request to `localhost:8000/api/v1/league/create_team/`

[Back to Table Of Contents](#table-of-contents)

### Get all Teams in a League

- Make a GET request to `localhost:8000/api/v1/team/league/1` include league pk

[Back to Table Of Contents](#table-of-contents)

### Get a specific Team

- Make GET request to `localhost:8000/api/v1/team/7` include team pk:

[Back to Table Of Contents](#table-of-contents)

### Add user to a Team in a league

- Make a POST request `localhost:8000/api/v1/team/` with the following data:

```json
{
    "league_id": 1,
    "team_id": 1
}
```
change

[Back to Table Of Contents](#table-of-contents)
