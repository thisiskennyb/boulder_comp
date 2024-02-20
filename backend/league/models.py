from django.db import models
from team.models import Team
from django.contrib.auth.models import User
from .models import Team

class League(models.Model):
    teams = models.ForeignKey(Team, on_delete=models.CASCADE, null=True, blank=True)
    moderator = models.ForeignKey(User, on_delete=models.CASCADE)
    league_name = models.CharField()
    start_date = models.DateField()
    end_date = models.DateField()
    team_size = models.IntegerField()
    location = models.CharField(null=True, blank=True)


    def __str__(self):
        return f'{self.league_name} ends on {self.end_date}'
    