from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from django.contrib.auth.models import User
from .serializers import SignupSerializer
from django.core.exceptions import ValidationError
from .validators import CustomPasswordValidator
from django.core import mail
from .views import SignupView
from django.test import RequestFactory
from django.urls import reverse
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from django.utils.http import urlsafe_base64_decode
from django.template.loader import render_to_string
from .tokens import email_verification_token
from rest_framework.authtoken.models import Token




class SignupViewTest(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_signup_view(self):
        # Define test data
        data = {
            "username": "testuser",
            "email": "testuser@example.com",
            "password": "Testpassword123!",
            "confirm_password": "Testpassword123!",
        }

        # Make a POST request to the SignupView
        response = self.client.post("/api/v1/accounts/register/signup", data, format="json")

        # Check if the response status code is 201 (created)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # Check if a user with the given username exists in the database
        self.assertTrue(User.objects.filter(username="testuser", email="testuser@example.com").exists())

    def test_invalid_signup_view(self):
        # Define invalid test data (missing required field)
        data = {
            "password": "testpassword",
        }

        # Make a POST request to the SignupView with invalid data
        response = self.client.post("/api/v1/accounts/register/signup", data, format="json")

        # Check if the response status code is 400 (bad request)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        # Check if a user with the given username does not exist in the database
        self.assertFalse(User.objects.filter(username="testuser", email="testuser@example.com").exists())

    def test_password_validation(self):
        # Test valid password
        valid_password = "Testpassword123!"
        validator = CustomPasswordValidator()
        try:
            validator.validate(valid_password)
        except ValidationError:
            self.fail(f"Validation for a valid password failed: {valid_password}")

        # Test invalid password (too short)
        invalid_password_short = "Short1"
        with self.assertRaises(ValidationError):
            validator.validate(invalid_password_short)

        # Test invalid password (missing digit)
        invalid_password_no_digit = "NoDigitUpperCase"
        with self.assertRaises(ValidationError):
            validator.validate(invalid_password_no_digit)

        # Test invalid password (missing special character)
        invalid_password_no_special = "NoSpecial123"
        with self.assertRaises(ValidationError):
            validator.validate(invalid_password_no_special)

    def test_send_email_verification(self):
        # Create a user for testing
        user = User.objects.create_user(
            username='testuser',
            email='testuser@example.com',
            password='Testpassword123!'
        )

        # Create an instance of SignupView with a request object
        request = RequestFactory().get('/fake-path/')
        signup_view = SignupView()
        signup_view.request = request  # Attach the request object

        # Call _send_email_verification method on the SignupView instance
        signup_view._send_email_verification(user)

        # Check that one message has been sent
        self.assertEqual(len(mail.outbox), 1)

        # Optionally, reset the outbox for other tests
        mail.outbox = []


    def test_change_password(self):

        # Create a user
        self.user = User.objects.create_user(
            username='testuser',
            email='testuser@example.com',
            password='Testpassword123!'
        )

        # Obtain a token for the user
        self.token = Token.objects.create(user=self.user)

        # Define test data
        data = {
            "old_password": "Testpassword123!",
            "new_password": "Newpassword321!",
        }

        # Include the token in the Authorization header
        self.client.credentials(HTTP_AUTHORIZATION=f'token {self.token.key}')

        # Make a POST request to the SignupView
        response = self.client.post("/api/v1/accounts/register/change_password/", data, format="json")

        # Check if the response status code is 200 (OK)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Refresh the user object from the database to get the latest data
        self.user.refresh_from_db()

        # Check if the user's password has been updated correctly
        self.assertTrue(self.user.check_password("Newpassword321!"))