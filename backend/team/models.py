from django.db import models
from django.contrib.auth.models import User

class Team(models.Model):
    users = models.ManyToManyField(User)
    team_name = models.CharField()
    score = models.IntegerField()

    #  = models.PrimaryKey(Boulder, on_delete=models.CASCADE)
    # send_date = models.DateField()
    # flash = models.BooleanField(default=False)
