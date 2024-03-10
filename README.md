## Boulder Comp

Want to try the app? Click [here](http://3.143.247.65/)

---

## Table of Contents

- [Using the App](#using-the-app)
    - [Purpose](#purpose)
    - [Pages](#pages)
        - [Dashboard](#dashboard)
        - [Leagues](#leagues)
        - [Scoring](#scoring)

- [Rock Climbing](#rock-climbing)
    - [What is Rock Climbing?](#what-is-rock-climbing)
    - [Grading System](#grading-system)
    - [Competition Scoring](#competition-scoring)

- [How to run application locally](#run-local)
    - [Local setup getting started](#getting-started)
    - [Backend Endpoints](#backend-endpoints)
        - [Sign Up](#sign-up)
        - [Sign In](#sign-in)
        - [Password Reset ](#resetforgot-password)

- [Contributions](#contributions)



### Getting Started

This project project uses:
- Email: An email for account activation and reset password features [How to set up Email](#email-setup)
- AWS S3 Storage: Blob storage used for handling files in the application [How to set up S3 Storage](#aws-s3-setup)
- A local development script: Runs your project locally in a docker container [How to run local script ](#run-local)

[Back to Table Of Contents](#table-of-contents)

## Using the App

The Simplest way to use the app will be signing up to make an account on our live version running [here](http://3.143.247.65/)
Once you sign up you will be routed to your dashboard and prompted to enter your highest Boulder grade

<br></br>

Your highest boulder grade will be used to properly score boulders for your active leagues you are participating in
Once you have selected your grade, you are free to Create Leagues or Join existing leagues.
Once leagues have been started, they will be viewable but teams can no longer be joined or created!
To create your own league, simply go to the Leagues page and click create League. 
<br></br>

Here you will be prompted for details like:
- League Name
- League Location
- League Start Date
- League End Date
- Team Size

<br></br>
When you create league, its especially important to note the start date, end date, and team size for a league.

1. When you go to join a league, it must not already be active. See more about Leagues [here](#leagues)
- Leagues that are already active will be viewable, but users cannot create or join teams
2. You cannot already be participating in that league, i.e you are not already on a team in this league
3. The team you are joining cannot be be at the league team size limit, i.e the team is not full

<br></br>
You can create as many leagues as you would like, but you may only participate once per league
This means that when you join a team, you will be placed as a participant of the league for its duration

- You will not be able to create a different team in this league
- You will not be able to join a different team in this league
<br></br>
Similar to creating a league, you may create or join a team

To create or join a team, you must be viewing a league that is not yet active

- You can create a team by clicking the create team button
    - This will prompt you for the name of your team, note that the league is what determines how many teammates you can have
- You can join a team if the league is not active, the team is not full, and you are not already on a team in this league

<br></br>
You can participate in multiple leagues as at a time. Each league will keep track of the appropriate score for the teams competing in it
You do not need to be in a league or competition to "Send" a boulder, there just will not be any score associated with it
To Log a Send, you can click the Log Send Button from your dashboard. Which will prompt you for information about your Send.
<br></br>
You need to enter:
- Name of the boulder
- Grade of the boulder
- Date of the Send
- Location of the boulder
<br></br>
Please use descriptive names for generic names such as unknown V1, or V1, or no name V1
For cases like this, please use a more intuitive naming convention
Examples: Unnamed V1 Front LRC, V0 Rocktown Labrynth
<br></br>
If you intend to use the application for indoor competitions, you similarly will want to use some naming convention.
For an imaginary gym called Costal Mesa Climbing Gym
Example: CMC April Left Wall V0
<br></br>

Now that you know how to Create or Join a League, Log a Send, you are ready to start competing!

1. Start a league with start and end dates that make sense for you and your friends.
2. Invite your friends to make teams and join the league
3. Compete during the duration of the league and see which team scores the most points!
<br></br>

[Back to Table Of Contents](#table-of-contents)


### Purpose
The purpose for this project is to serve my friends in the rock climbing community to help organize bouldering competitions

#### Pages

## Dashboard

Displays users stats along with all of the leagues they are a participant in along with their place and team name for the given league

[Back to Table Of Contents](#table-of-contents)

## Leagues

Gives the user the option to join or create a league
	- Leagues will require a start and end date along with a name
 	- Users can join a league by either creating a team within the league or joining an already existing team

[Back to Table Of Contents](#table-of-contents)

## Scoring

The rules are simple:
- Scoring is based on the grade of the hardest boulder the user has sent
- Only the user's three hardest grades count for points towards the competition
- If the user completes a climb on their first try the score is doubled
  - Example: users highes boulder grade: v7
    - grade/points: v7/3points v6/2points v5/1point
    - v7 flash = 6points
  
[Back to Table Of Contents](#table-of-contents)

## Rock Climbing

### What Is Rock Climbing
What is Rock Climbing? In its simplest form its the act of moving across rocky terrain or artificially 'rocky' terrain.

To provide some additional context you can watch a short video on the history of climbing [here](https://www.youtube.com/watch?v=uUrrOdzKB3Q)

If you enjoyed the context of the above video, you can get a quick explaination of competition climbing history [here](https://www.youtube.com/watch?v=ik9WkEEkLW4)

[Back to Table Of Contents](#table-of-contents)

### Grading System

In present day bouldering the V-scale, named after climber John Vermin Sherman, is used to grade the difficulty of a boulder

The scale ranges from V0 to V17 with V17 being the hardest grade currently established.

[Back to Table Of Contents](#table-of-contents)

### Competition Scoring

Scoring for this competition is intended to be adjusted upon your current highest grade acheived.

The highest boulder grade can only be changed or edited while you are not in a active league

You should adjust your score to accurately reflect your highest boulder grade before signing up to any leagues


When properly filled out, this data levels the playing field for climbers of varying experience competing together

We would like teams to be able to fairly compete no matter the skill composition


When completing a climb, you will get 3 points for climbs at your highest difficulty level, losing 1 point for each level below your highest grade.

If your climb was a flash attempt, you will receive double the amount of points

Climbs that are far below your highest difficulty level will be scored as 0, but will still appear in your send feed

To see an example of scoring click [here](#scoring)

[Back to Table Of Contents](#table-of-contents)

---

### Quick Start

This project has an integrated dockerized Postgres database and will require `Docker Desktop` to be installed
- Click [here](https://www.docker.com/products/docker-desktop/) to download docker desktop

This project has file storage set up to use AWS S3 bucket storage. To properly handle images in the application

This is a service provided by AWS, to get started, create an account and login
- Click [here](https://aws.amazon.com/free/?gclid=CjwKCAiA0bWvBhBjEiwAtEsoW6CceEBLLkMr_4_vTAO2PTn3y-aLEu0V9fuZs8e514idfAa1maElpxoCIi8QAvD_BwE&trk=6a4c3e9d-cdc9-4e25-8dd9-2bd8d15afbca&sc_channel=ps&ef_id=CjwKCAiA0bWvBhBjEiwAtEsoW6CceEBLLkMr_4_vTAO2PTn3y-aLEu0V9fuZs8e514idfAa1maElpxoCIi8QAvD_BwE:G:s&s_kwcid=AL!4422!3!651751059780!e!!g!!aws!19852662197!145019195897&all-free-tier.sort-by=item.additionalFields.SortRank&all-free-tier.sort-order=asc&awsf.Free%20Tier%20Types=*all&awsf.Free%20Tier%20Categories=*all)

Set up a AWS S3 bucket
- Click [here](#aws-s3-setup)

[Back to Table Of Contents](#table-of-contents)

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

[Back to Table Of Contents](#table-of-contents)

## AWS S3 Setup


This is where we are going to describe how to set up an s3 bucket





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

[Back to Table Of Contents](#table-of-contents)
  
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

### Contributions

This is a placeholder for contributor information

[Back to Table Of Contents](#table-of-contents)
## Run Local
#### Navigate to the boulder_comp/backend
#### All from the backend directory
1 Create a virtual environment
---
* If you name this differently, make sure to update .gitignore and .dockerignore
---
```bash
python -m venv venv
```
---
2 Activate your virtual environment
---
```
source venv/bin/activate
```
---

3 Install dependencies
---
* May require pip3 install -r requirements.txt if alias pip == pip3 does not exist
```

pip install -r requirements.txt
```
---
Create dockerized postgres database
---
* See docker-compose.yml in backend for more information
```
docker compose up -d
```
---
4 Once your container is running, make migrations
---
```
python manage.py makemigrations
```
```
python manage.py migrate
```
After migrations have been made, run the server
```
python manage.py runserver
```
---
Navigate to the boulder_comp/frontend
---

---
From the frontend directory
---
5 Install dependencies
---
```
npm install
```
---
6 Run the development server
---

```
npm run dev
```
---
[Back to Table Of Contents](#table-of-contents)

## Run Local Script
