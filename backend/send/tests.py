from django.test import TestCase
from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth.models import User
from send.models import Send
from boulder.models import Boulder
from rest_framework.authtoken.models import Token
from accounts.models import UserDashboard


# Create your tests here.

class SendViewTest(APITestCase):
    def setUp(self):
        # create user
        self.user = User.objects.create_user(username='testuser', password='testpassword')

        # Initialize user dashboard
        UserDashboard.objects.create(
            user=self.user,
            highest_boulder_grade='v7'
        )
        
        # Activate the user's account
        self.user.is_active = True
        self.user.save()
        self.token = Token.objects.create(user=self.user)

    def test_send_view(self):
        url = '/api/v1/send/'
        data = {
            "name": "golden throttle",
            "grade": "v5",
            "crag": "rocktown",
            "flash": False,
            "send_date": "2024-02-19"
        }

        # Include the token in the request headers
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_score_calulation(self):
        url = '/api/v1/send/'
        data = {
            "name": "golden throttle",
            "grade": "v5",
            "crag": "rocktown",
            "flash": False,
            "send_date": "2024-02-19"
        }

        # Include the token in the request headers
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        response = self.client.post(url, data, format='json')

        send_name = Boulder.objects.get(name=data['name'])
        self.assertEqual(send_name.name, 'golden throttle')

        send_score = Send.objects.get(user_id = self.user).score
        self.assertEqual(send_score, 1)


    def test_multiple_sends(self):
        url = '/api/v1/send/'
        boulder1 = {
            "name": "croc bloc",
            "grade": "v5",
            "crag": "rocktown",
            "flash": False,
            "send_date": "2024-02-20"
        }

        boulder2 = {
            "name": "pocket pool",
            "grade": "v4",
            "crag": "little rock city",
            "flash": False,
            "send_date": "2024-02-21"
        }

        # Include the token in the request headers
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        self.client.post(url, boulder1, format='json')
        self.client.post(url, boulder2, format='json')
        

        sends = Send.objects.filter(user_id = self.user)
        self.assertEqual(sends.count(), 2)

        total_score = 0
        
        for send in sends:
            total_score += send.score

        self.assertEqual(total_score, 1)


    def test_multiple_sends_with_flash(self):
        url = '/api/v1/send/'
        boulder1 = {
            "name": "hairlining",
            "grade": "v7",
            "crag": "rocktown",
            "flash": True,
            "send_date": "2024-02-20"
        }

        boulder2 = {
            "name": "pulling tubes",
            "grade": "v6",
            "crag": "rocktown",
            "flash": True,
            "send_date": "2024-02-21"
        }

        # Include the token in the request headers
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        self.client.post(url, boulder1, format='json')
        self.client.post(url, boulder2, format='json')
        
        sends = Send.objects.filter(user_id = self.user)

        total_score = 0
        
        for send in sends:
            total_score += send.score

        self.assertEqual(total_score, 10)

        

        


class TestSend(TestCase):
    def setUp(self):
        # Create a user
        self.user = User.objects.create_user(username='testuser', email='test@example.com', password='Testpassword123!')
        
        # Create a boulder
        self.boulder = Boulder.objects.create(
            name='the comet',
            grade='v7',
            crag='rocktown'
        )

    def test_log_send(self):
        Send.objects.create(
            user=self.user, boulder=self.boulder, send_date="2024-03-05", flash=False, score=3
        )

        self.assertEqual(Send.objects.count(), 1)
