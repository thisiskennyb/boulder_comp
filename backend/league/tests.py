from django.test import TestCase
from django.contrib.auth.models import User
from league.models import League
from team.models import Team
from accounts.models import UserDashboard
from rest_framework.test import APITestCase
from rest_framework.authtoken.models import Token
from rest_framework import status
from send.models import Boulder, Send



class LeagueViewTest(APITestCase):
    def setUp(self):
        # create user
        self.user1 = User.objects.create_user(username='testuser', password='testpassword')
        self.user2 = User.objects.create(
            username='testuser2',
            password='Testpassword123!'
        )

        # Initialize user dashboard
        UserDashboard.objects.create(
            user=self.user1,
            highest_boulder_grade='v7'
        )

        UserDashboard.objects.create(
            user=self.user2,
            highest_boulder_grade='v5'
        )
        
        # Activate the user's account
        self.user1.is_active = True
        self.user2.is_active = True
        self.user1.save()
        self.user2.save()
        self.token = Token.objects.create(user=self.user1)
        self.token_two = Token.objects.create(user=self.user2)

    def test_create_league(self):
        url = '/api/v1/league/'
        data = {
            "league_name": "kens league",
            "start_date": "2024-02-28",
            "end_date": "2024-04-28",
            "team_size": 4,
            "location": "Chattanooga"
        }   

        # Include the token in the request headers
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['league_name'], data['league_name'])

    def test_duplicate_league_name(self):
        url = '/api/v1/league/'
        data = {
            "league_name": "kens league",
            "start_date": "2024-02-28",
            "end_date": "2024-04-28",
            "team_size": 4,
            "location": "Chattanooga"
        }
        #Second test user data -- same league name
        data_two = {
            "league_name": "kens league",
            "start_date": "2024-03-28",
            "end_date": "2024-05-24",
            "team_size": 3,
            "location": "Brazil"
        }

        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['league_name'], data['league_name'])
        


        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token_two.key)
        response = self.client.post(url, data_two, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


    def test_create_team(self):

        league = League.objects.create(moderator=self.user1, league_name='test_league', start_date='2024-02-20', end_date='2024-03-20', team_size=4)

        league_id = league.id

        create_team_url = '/api/v1/league/create_team/'
        team_data = {
            "league_id": league_id,
            "team_name": "cyber punks"
        }
        
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        response = self.client.post(create_team_url, team_data, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['team_name'], team_data['team_name'])

    def test_update_rank_and_score(self):

        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

        # Create a league
        create_league_url = '/api/v1/league/'
        league_data = {
            "league_name": "kens league",
            "start_date": "2024-02-28",
            "end_date": "2024-04-28",
            "team_size": 4,
            "location": "Chattanooga"
        }

        create_league_post_response = self.client.post(create_league_url, league_data, format='json')
        league_id = create_league_post_response.data['id']

        # Create a team
        create_team_url = '/api/v1/league/create_team/'
        team1_data = {
            "league_id": league_id,
            "team_name": "team1"
        }
        create_team_post_response = self.client.post(create_team_url, team1_data, format='json')


        # Log send for user1
        log_send_url = '/api/v1/send/'
        send_data = {
            "name": "golden throttle",
            "grade": "v5",
            "crag": "rocktown",
            "flash": False,
            "send_date": "2024-03-19"
        }
        log_send_post_response = self.client.post(log_send_url, send_data, format='json')
       
       # Test that team score and rank are equal to zero
        self.assertEqual(create_team_post_response.data['score'], 0)
        self.assertEqual(create_team_post_response.data['rank'], 0)

        # Make a get request to fetch all of the users teams they are a member of
        # When the request is made the logic to update the team's rank and score is performed in the views.py file in the leagues directory
        get_all_teams_url = '/api/v1/league/create_team/'
        get_all_users_teams_response = self.client.get(get_all_teams_url, format='json')
        
        # The score should now be updated with the send logged by user1
        self.assertEqual(get_all_users_teams_response.data[0]['score'], 1)
        self.assertEqual(get_all_users_teams_response.data[0]['rank'], 1)
  
    def test_two_teams_update_rank_and_score(self):

        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

        # Create a league
        create_league_url = '/api/v1/league/'
        league_data = {
            "league_name": "kens league",
            "start_date": "2024-02-28",
            "end_date": "2024-04-28",
            "team_size": 4,
            "location": "Chattanooga"
        }

        create_league_post_response = self.client.post(create_league_url, league_data, format='json')
        league_id = create_league_post_response.data['id']

        # Create team1 and team2
        create_team_url = '/api/v1/league/create_team/'
        
        team1_data = {
            "league_id": league_id,
            "team_name": "team1"
        }

        team2_data = {
            "league_id": league_id,
            "team_name": "team2"
        }
        
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        create_team1_post_response = self.client.post(create_team_url, team1_data, format='json')

        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token_two.key)
        create_team2_post_response = self.client.post(create_team_url, team2_data, format='json')

        # Log send for user1 and user2
        log_send_url = '/api/v1/send/'
        
        send_data_user1 = {
            "name": "golden throttle",
            "grade": "v5",
            "crag": "rocktown",
            "flash": False,
            "send_date": "2024-03-19"
        }

        send_data_user2 = {
            "name": "art of the vogi",
            "grade": "v4",
            "crag": "stone fort",
            "flash": False,
            "send_date": "2024-03-19"
        }
        
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        log_send_post_response_user1 = self.client.post(log_send_url, send_data_user1, format='json')

        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token_two.key)
        log_send_post_response_user2 = self.client.post(log_send_url, send_data_user2, format='json')
       
       # Test that team score and rank are equal to zero
        self.assertEqual(create_team1_post_response.data['score'], 0)
        self.assertEqual(create_team1_post_response.data['rank'], 0)
        self.assertEqual(create_team2_post_response.data['score'], 0)
        self.assertEqual(create_team2_post_response.data['rank'], 0)

        # Make a get request to fetch all of the users teams they are a member of
        # When the request is made the logic to update the team's rank and score is performed in the view
        # Check that user team1 and team2 scores and ranks have been updated correctly
        get_all_teams_url = '/api/v1/league/create_team/'

        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        get_all_users_teams_response = self.client.get(get_all_teams_url, format='json')

        
        self.assertEqual(get_all_users_teams_response.data[0]['score'], 1)
        self.assertEqual(get_all_users_teams_response.data[0]['rank'], 2)

        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token_two.key)
        get_all_users_teams_response = self.client.get(get_all_teams_url, format='json')

        self.assertEqual(get_all_users_teams_response.data[0]['score'], 2)
        self.assertEqual(get_all_users_teams_response.data[0]['rank'], 1)


# Unit Testing

class TestLeague(TestCase):
    def setUp(self):
        self.user = User.objects.create(
            username='testuser',
            password='Testpassword123!'
        )
        self.user_two = User.objects.create(
            username='testuser2',
            password='Testpassword123!'
        )
        self.user_three = User.objects.create(
            username='testuser3',
            password='Testpassword123!'
        )
        self.user_four = User.objects.create(
            username='testuser4',
            password='Testpassword123!'
        )


        

    def test_create_league(self):
        League.objects.create(
            moderator=self.user,
            league_name='Beasti Boyz',
            start_date='2024-12-01',
            end_date='2024-12-25',
            team_size=5,
            )
        
        self.assertEqual(League.objects.count(), 1)

    def test_create_multiple_leagues(self):
        League.objects.create(
            moderator=self.user,
            league_name='Beasti Boyz',
            start_date='2024-12-01',
            end_date='2024-12-25',
            team_size=5,
            )
        
        League.objects.create(
            moderator=self.user,
            league_name='Thugzilla',
            start_date='2023-12-01',
            end_date='2024-12-25',
            team_size=5,
            )
        
        League.objects.create(
            moderator=self.user,
            league_name='Ruffingers',
            start_date='2024-12-11',
            end_date='2024-12-25',
            team_size=5,
            )
        
        self.assertEqual(League.objects.count(), 3)


    def test_create_team(self):
        
        league1 = League.objects.create(
            moderator=self.user,
            league_name='Beasti Boyz',
            start_date='2024-12-01',
            end_date='2024-12-25',
            team_size=5,
            )
        
        Team.objects.create(
            league=league1,
            captain=self.user,
            team_name="broncos" 
        )

        team1 = Team.objects.get(team_name="broncos")
        self.assertEqual(team1.team_name, "broncos")

    def test_add_team_members(self):

        league1 = League.objects.create(
            moderator=self.user,
            league_name='Beasti Boyz',
            start_date='2024-12-01',
            end_date='2024-12-25',
            team_size=5,
            )
        
        team1 = Team.objects.create(
            league=league1,
            captain=self.user,
            team_name="broncos" 
        )

        team1.add_team_member(self.user)
        team1.add_team_member(self.user_two)

        self.assertEqual(team1.members.all().count(), 2)


    def test_add_multiple_teams_to_league(self):

        league1 = League.objects.create(
            moderator=self.user,
            league_name='Beasti Boyz',
            start_date='2024-12-01',
            end_date='2024-12-25',
            team_size=5,
            )
        
        team1 = Team.objects.create(
            league=league1,
            captain=self.user,
            team_name="tacomas" 
        )

        team2 = Team.objects.create(
            league=league1,
            captain=self.user,
            team_name="coolkids" 
        )

        team1.add_team_member(self.user)
        team1.add_team_member(self.user_two)

        team2.add_team_member(self.user)
        team2.add_team_member(self.user_two)

        teams_in_league = Team.objects.filter(league=league1)

        self.assertEqual(teams_in_league.count(), 2)


    def test_add_team_to_league(self):

        league1 = League.objects.create(
            moderator=self.user,
            league_name='Beasti Boyz',
            start_date='2024-12-01',
            end_date='2024-12-25',
            team_size=5,
            )
        

        league1.add_team(self.user, "yodas", league1)


        teams_in_league = Team.objects.filter(league=league1)

        self.assertEqual(teams_in_league.count(), 1)
        

    
