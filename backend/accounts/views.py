from rest_framework.generics import CreateAPIView
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from .serializers import SignupSerializer
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from django.core.exceptions import ValidationError
from rest_framework import serializers
from django.core.mail import EmailMessage   
from .tokens import email_verification_token
from django.contrib.sites.shortcuts import get_current_site
from django.utils.encoding import force_bytes
# from django.utils.encoding import force_text
from django.utils.http import urlsafe_base64_encode
from django.utils.http import urlsafe_base64_decode
from django.template.loader import render_to_string
from django.shortcuts import render
from django.urls import reverse
from django.core.mail import send_mail
from rest_framework.views import APIView
from .models import UserDashboard
from django.shortcuts import get_object_or_404
from datetime import datetime
from .serializers import UserDashboardSerializer
from dotenv import load_dotenv
import os



#changong password imports
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import update_session_auth_hash
from .serializers import ChangePasswordSerializer


from rest_framework import serializers, status
from rest_framework.response import Response
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError


class SignupView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = SignupSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        validated_data = serializer.validated_data
        username = validated_data["username"]
        email = validated_data["email"]
        password = validated_data["password"]

        # Check if the username already exists
        if User.objects.filter(username=username).exists():
            raise serializers.ValidationError({'unavailable': ['Sorry, that username is already in use. Please choose another one.']})

        # Validate the password using Django's password validators
        try:
            validate_password(password, user=User)
        except ValidationError as e:
            raise serializers.ValidationError(detail=e.messages)

        # Create the user if the password is valid
        user = User.objects.create_user(username=username, email=email, password=password)
        user.is_active = False
        user.save()

        self._send_email_verification(user)

        return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)



    def _send_email_verification(self, user):
        domain = os.getenv("HOST") if os.getenv("HOST") else "localhost:8000"
        current_site = get_current_site(self.request)
        verification_token = email_verification_token.make_token(user)
        verification_url = reverse('activate', kwargs={'uidb64': urlsafe_base64_encode(force_bytes(user.pk)), 'token': verification_token})
        absolute_verification_url = f'http://{domain}{verification_url}'
        email_plaintext_message = f"Click the following link to activate your account: {absolute_verification_url}"

        send_mail(
            # title:
            "Activate Your Account",
            # message:
            email_plaintext_message,
            # from:
            "info@yourcompany.com",
            # to:
            [user.email],
            fail_silently=False,
        )


# view for changing password
        
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def change_password(request):
    if request.method == 'POST':
        serializer = ChangePasswordSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            user = request.user
            if user.check_password(serializer.data.get('old_password')):
                user.set_password(serializer.data.get('new_password'))
                user.save()
                update_session_auth_hash(request, user)  # To update session after password change
                return Response({'message': 'Password changed successfully.'}, status=status.HTTP_200_OK)
            return Response({'error': 'Incorrect old password.'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


class DashboardView(APIView):

    def get(self, request, pk=None):
        myid = request.user.id
        user_dashboard = get_object_or_404(UserDashboard, user=request.user)
        username = user_dashboard.user.username
        date_joined = user_dashboard.user.date_joined
        weight = user_dashboard.weight
        height = user_dashboard.height
        ape_index = user_dashboard.ape_index
        highest_boulder_grade = user_dashboard.highest_boulder_grade
        highest_route_grade = user_dashboard.highest_route_grade

        return Response({
            'username': username,
            'member_since': date_joined, 
            'weight': weight, 
            'height' : height,
            'ape_index' : ape_index,
            'highest_boulder_grade' : highest_boulder_grade,
            'highest_route_grade' : highest_route_grade,            
            })



    def post(self, request):
        dashboard_data = request.data
        # Set the user field to the current user
        dashboard_data['user'] = request.user.pk  # Assuming request.user is the authenticated user
        serializer = UserDashboardSerializer(data=dashboard_data)
        if serializer.is_valid(raise_exception=True):
            dashboard_saved = serializer.save()
            return Response({"result": f"{dashboard_saved.highest_boulder_grade} saved"})
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)