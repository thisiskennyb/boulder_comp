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

#changong password imports
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import update_session_auth_hash
from .serializers import ChangePasswordSerializer


class SignupView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = SignupSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        validated_data = serializer.validated_data
        username = validated_data["username"]
        email = validated_data["email"]
        password = validated_data["password"]

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
        current_site = get_current_site(self.request)
        subject = 'Activate Your Account'
        body = render_to_string(
            'email_verification.html',
            {
                'domain': current_site.domain,
                'uid': urlsafe_base64_encode(force_bytes(user.pk)),
                'token': email_verification_token.make_token(user),
            }
        )
        EmailMessage(to=[user.email], subject=subject, body=body).send()

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