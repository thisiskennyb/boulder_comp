from django.contrib.auth import login, get_user_model
from django.urls import reverse
from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode
from django.shortcuts import redirect
from django.views import View
from .tokens import email_verification_token
from rest_framework.response import Response

class ActivateView(View):

    def get_user_from_email_verification(self, uidb64, token: str):
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = get_user_model().objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError,
                get_user_model().DoesNotExist):
            return None

        if user is not None and email_verification_token.check_token(user, token):
            return user

        return None

    def get(self, request, uidb64, token):
        user = self.get_user_from_email_verification(uidb64, token)
        if user is not None:
            user.is_active = True
            user.save()
            login(request, user)
            success_message = {"success": "registration successful"}
            return redirect('http://localhost:5173/email-verification')
        else:
            # Handle the case when the user is not found or the token is invalid
            return redirect('http://localhost:5173/email-verification')
