from django.db import models
from django.contrib.auth.models import User



class League(models.Model):
    participants = models.ManyToManyField(User,related_name="participants", blank=True)
    moderator = models.ForeignKey(User, on_delete=models.CASCADE, related_name='moderator')
    league_name = models.CharField()
    start_date = models.DateField()
    end_date = models.DateField()
    team_size = models.IntegerField()
    location = models.CharField(null=True, blank=True)


    def __str__(self):
        return f'{self.league_name} ends on {self.end_date}'
    

    def add_team(self, user, team_name, league_object):
        from team.models import Team
        Team.objects.create(captain=user, team_name=team_name, league=league_object)