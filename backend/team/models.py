from django.db import models
from django.contrib.auth.models import User
from league.models import League

class Team(models.Model):
    league = models.ForeignKey(League, on_delete=models.CASCADE)
    members = models.ManyToManyField(User, related_name='team_members', blank=True)
    captain = models.ForeignKey(User, on_delete=models.CASCADE, related_name='team_captain')
    team_name = models.CharField()
    score = models.IntegerField(default=0)

    def __str__(self):
        return f'Captain: {self.captain}, Team: {self.team_name}'

    #  = models.PrimaryKey(Boulder, on_delete=models.CASCADE)
    # send_date = models.DateField()
    # flash = models.BooleanField(default=False)

    def add_team_member(self, user):
        self.members.add(user)
        return 'user added'

