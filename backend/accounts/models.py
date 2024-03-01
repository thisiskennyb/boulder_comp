
from django.dispatch import receiver
from django.urls import reverse
from django_rest_passwordreset.signals import reset_password_token_created
from django.core.mail import send_mail, EmailMessage
from django.db import models
from django.contrib.auth.models import User
from dotenv import load_dotenv
import os


class UserDashboard(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    height = models.CharField(null=True)
    weight = models.IntegerField(null=True)
    ape_index = models.FloatField(null=True)
    highest_boulder_grade = models.CharField()
    highest_route_grade = models.CharField(null=True)
    avatar = models.FileField(upload_to="useravatars/", blank=True, null=True)

    def __str__(self):
        return f"{self.user}"




@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):

    host = os.getenv("HOST") if os.getenv("HOST") else "localhost:5173"

    # the below like concatinates your websites reset password url and the reset email token which will be required at a later stage
    email_plaintext_message = "Open the link to reset your password" + " " + "{}{}".format(instance.request.build_absolute_uri(f'http://{host}/reset-password/'), reset_password_token.key)
    
    """
        this below line is the django default sending email function, 
        takes up some parameter (title(email title), message(email body), from(email sender), to(recipient(s))
    """
    send_mail(
        # title:
        "Password Reset for {title}".format(title="Crediation portal account"),
        # message:
        email_plaintext_message,
        # from:
        "info@yourcompany.com",
        # to:
        [reset_password_token.user.email],
        fail_silently=False,
    )