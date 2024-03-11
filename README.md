# :climbing: Boulder Comp :climbing:

Check out Boulder Comp [here](http://3.143.247.65/)!

---

<ins>**Welcome to Boulder Comp!**</ins> The premier platform for climbers to join leagues, form teams, and compete in bouldering challenges, both indoors and outdoors. But first, let's get acquainted with some climbing lingo:

**BOULDERING** is a form of rock climbing that is performed on a boulder or artificial rock walls without the use of ropes or harnesses. Compared to other forms of climbing, bouldering usually involves harder moves for a shorter duration.

**SEND**  a term used by rock climbers, "send" is an abbreviation of the word "ascend." It refers to successfully climbing a route or boulder from start to finish without falling, done cleanly and without any assistance.

Now, let's dive into what Boulder Comp is all about:

Whether you're a seasoned climber or just starting out, Boulder Comp offers an inclusive environment for climbers of all levels. Here's how it works:

- **Join or Create Leagues:** Users have the flexibility to either join existing leagues or create their own. There's no limit to the number of leagues you can participate in. Each league has a defined start and end date, along with a specified team size.
    
- **Log Sends:** After completing a climb, users can simply navigate to their dashboard and log a send. Users must specify the date of the send to track progress accurately. Sends that fall within the league dates will count for points in that league.
    
- **Scoring:** Points are awarded based on the difficulty of your climbs. The Users hardest completed bouldering grade determines their score, ensuring a fair and competitive playing field for participants of all skill levels. Click [here](http://3.143.247.65/rules-and-scoring) to learn more about scoring.

### Technology Used

**Frontend**
- Languages - Javascript, Bash
- Framework and Libraries - React, React-Toastify, React Router, Tailwind, Framermotion

**Backend** 
- Languages - Python
- Framework and Libraries - Django

**Database**
- PostgreSQL

**CI**
- GitHub Actions

**Other**
- Docker, AWS(EC2, S3)

<br></br>
<img align="left" alt="name_here" width="30px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"/>
<img align="left" alt="name_here" width="30px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"/>
<img align="left" alt="name_here" width="30px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"/>
<img align="left" alt="name_here" width="30px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg"/>
<img align="left" alt="name_here" width="30px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg"/>
<img align="left" alt="name_here" width="30px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg"/>
<img align="left" alt="name_here" width="30px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" />
<img align="left" alt="name_here" width="30px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" />
<img align="left" alt="name_here" width="30px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" />
<img align="left" alt="name_here" width="30px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/githubactions/githubactions-original.svg" />
<img align="left" alt="name_here" width="30px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg" />
          
<br></br>


## Table of Contents
- [What is bouldering?](#what-is-bouldering)
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

- [Contributions](#contributions)


### What is bouldering?

**BOULDERING** is a form of rock climbing that is performed on a boulder or artificial rock walls without the use of ropes or harnesses. Compared to other forms of climbing, bouldering usually involves harder moves for a shorter duration.

Watch the video below to understand the basics of bouldering or click [here](https://en.wikipedia.org/wiki/Bouldering):
<br></br>
[<img src="https://img.youtube.com/vi/u8F11DGPggs/0.jpg" width="400">](https://www.youtube.com/watch?v=u8F11DGPggs)

Watch the video below starting at `4:42` to learn more about the grading scale for bouldering or click [here](https://hardclimbs.info/bouldering-grades-explained/)
<br></br>
[<img src="https://img.youtube.com/vi/cD4XHKBwe3I/0.jpg" width="400">](https://www.youtube.com/watch?v=cD4XHKBwe3I)



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


### Getting Started

This project project uses:
- Email: An email for account activation and reset password features [How to set up Email](backend/README.md#email-setup)
- AWS S3 Storage: Blob storage used for handling files in the application [How to set up S3 Storage](backend/README.md#aws-s3-setup)
- Docker: To support infrastructure and deployment capabilities [How to set up Docker](backend/README.md#docker)
- A local development script: Runs your project locally in a docker container [How to run local script ](backend/README.md#run-local)

[Back to Table Of Contents](#table-of-contents)

---



