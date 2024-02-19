from django.db import models
from boulder.models import Boulder
from django.contrib.auth.models import User


class Send(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    boulder = models.ForeignKey(Boulder, on_delete=models.CASCADE)
    send_date = models.DateField()
    flash = models.BooleanField(default=False)
    score = models.IntegerField(default=0)


    def __str__(self):
        return f"Send by {self.user.username}"


