from django.db import models
from boulder.models import Boulder
from django.contrib.auth.models import User


class Send(models.Model):
    user = models.PrimaryKey(User, on_delete=models.CASCADE)
    boulder = models.PrimaryKey(Boulder, on_delete=models.CASCADE)
    send_date = models.DateField()
    flash = models.BooleanField(default=False)


    def __str__(self):
        return f"Send by {self.user.username}"


