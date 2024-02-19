from django.db import models
from team.models import Team

class League(models.Model):
    teams = models.ForeignKey(Team, on_delete=models.CASCADE, null=True, blank=True)
    league_name = models.CharField()
    start_date = models.DateField()
    end_date = models.DateField()
    team_size = models.IntegerField()
    location = models.CharField(null=True, blank=True)