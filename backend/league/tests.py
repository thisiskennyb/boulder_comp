from django.test import TestCase
from django.contrib.auth.models import User
from league.models import League
from team.models import Team
from accounts.models import UserDashboard
from rest_framework.test import APITestCase
from rest_framework.authtoken.models import Token
from rest_framework import status


class LeagueViewTest(APITestCase):
    def setUp(self):
        # create user
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.user_two = User.objects.create(
            username='testuser2',
            password='Testpassword123!'
        )

        # Initialize user dashboard
        UserDashboard.objects.create(
            user=self.user,
            highest_boulder_grade='v7'
        )

        UserDashboard.objects.create(
            user=self.user_two,
            highest_boulder_grade='v5'
        )
        
        # Activate the user's account
        self.user.is_active = True
        self.user_two.is_active = True
        self.user.save()
        self.user_two.save()
        self.token = Token.objects.create(user=self.user)
        self.token_two = Token.objects.create(user=self.user_two)

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

        league = League.objects.create(moderator=self.user, league_name='test_league', start_date='2024-02-20', end_date='2024-03-20', team_size=4)

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

    # def test_get_teams_by_league(self):

    #     league = League.objects.create(moderator=self.user, league_name='test_league', start_date='2024-02-20', end_date='2024-03-20', team_size=4)

    #     league_id = league.id

    #     team1 = Team.objects.create(captain=self.user, league_id=league_id, team_name="buccaneers")

    #     data = {
    #         "league_id": league_id
    #     }
        
    #     url = f"/api/v1/team/league/"
 
    #     self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
    #     response = self.client.get(url, data, format='json')
        
    #     print(response.data)
        # self.assertEqual(response.status_code, status.HTTP_200_OK)
        # self.assertEqual(response.data['team_size'], 4)
        # self.assertEqual(response.data['league_name'], "buccaneers")

       






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

        # print(team1.members.all())

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
        

    
