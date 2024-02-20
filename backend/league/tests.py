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


        

    
