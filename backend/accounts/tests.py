from rest_framework.test import APITestCase #Testing API's
from rest_framework import status
from .views import SignupView
from django.contrib.auth.models import User
#Used for testing email/user
from django.test import RequestFactory
from rest_framework.authtoken.models import Token
from django.core import mail
from django.core.exceptions import ValidationError
from .validators import CustomPasswordValidator

#Unittest with models
from django.test import TestCase
from accounts.models import UserDashboard


class SignupViewTest(APITestCase):
    def test_signup_view(self):
        # Valid signup test
        url = '/api/v1/accounts/register/signup'
        data = {
        "username": "testuser",
        "email": "testuser@example.com",
        "password": "Testpassword123!",
        "confirm_password": "Testpassword123!",
        }

        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

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





# Lets have APITests in our APITestcase part of tests.py, with the bottom half to be used for TestCase unit tests



class TestUserDashboard(TestCase):
    #Creating a user to link dashboard to
    def setUp(self):
        self.user = User.objects.create(
            username='testuser',
            password='Testpassword123!'
        )
    # Creating dashboard, need User and highest_boulder_grade
    def test_create_dashboard(self):
        UserDashboard.objects.create(
            user=self.user,
            highest_boulder_grade='v7'
        )

        self.assertEqual(UserDashboard.objects.count(), 1)

    def test_dashboard_initial_values(self):
        #If a user submits their highest_boulder_grade, initial values for height, weight, ape_index, and highest_route_grade should be None
        UserDashboard.objects.create(
            user=self.user,
            highest_boulder_grade='v7'
        )
        #Looping through queries and asserting that all are None for initial values expected to be None
        query_dashboard = UserDashboard.objects.get(user=self.user)
        self.assertTrue(all(value is None for value in [
            query_dashboard.height,
            query_dashboard.weight,
            query_dashboard.ape_index,
            query_dashboard.highest_route_grade
        ]))
        # Verify the initial value for highest_boulder_grade matches
        self.assertEqual(query_dashboard.highest_boulder_grade, 'v7')


    def test_update_dashboard(self):
        # Create user, update values, save, see that dashboard updates if user queries it
        UserDashboard.objects.create(
        user=self.user,
        highest_boulder_grade='v7'
        )
        test_dashboard = UserDashboard.objects.get(user=self.user)
        test_dashboard.height = "72"
        test_dashboard.weight = 200
        test_dashboard.ape_index = 1.1
        test_dashboard.highest_route_grade = "5.11"
        test_dashboard.save()
        #A user getting their dashboard info after updating it
        updated_dashboard = UserDashboard.objects.get(user=self.user)
       
        self.assertFalse(all(value is None for value in [
            updated_dashboard.height,
            updated_dashboard.weight,
            updated_dashboard.ape_index,
            updated_dashboard.highest_route_grade
        ]))

    

    
    # def test_create_dashboard_w_null_values_view(self):

    #     # Define test data
    #     data = {
    #         "highest_boulder_grade": "v7"
    #     }

    #     # Authenticate the user
        

    #     # Make a POST request to the DashboardView
    #     response = self.client.post("/api/v1/accounts/register/create_dashboard/", data, format="json")

    #     # Check if the response status code is 200 (OK)
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)

   

