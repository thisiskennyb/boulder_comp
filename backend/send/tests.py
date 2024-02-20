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
            "name": "Curls for the girls",
            "grade": "v5",
            "crag": "rocktown",
            "flash": False,
            "send_date": "2024-02-19"
        }

        # Include the token in the request headers
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


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
