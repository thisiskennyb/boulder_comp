from django.test import TestCase
from django.contrib.auth.models import User
from league.models import League
from team.models import Team

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
        

    
