from django.db import models
from django.contrib.auth.models import User
from league.models import League
from send.models import Send
from django.db.models import F, Count

class Team(models.Model):
    league = models.ForeignKey(League, on_delete=models.CASCADE)
    members = models.ManyToManyField(User, related_name='team_members', blank=True)
    captain = models.ForeignKey(User, on_delete=models.CASCADE, related_name='team_captain')
    team_name = models.CharField()
    score = models.IntegerField(default=0)
    rank = models.IntegerField(default=0)

    def __str__(self):
        return f'Captain: {self.captain}, Team: {self.team_name}'

    def add_team_member(self, user):
        self.members.add(user)
        return 'user added'

    # this is the method to be used in CreateLeagueTeamView to assist in updating each teams score
    def calculate_team_score(self, start_date, end_date, member_ids):
            # initialize variable to keep track of team score
            team_total_score = 0
            # loop through members
            for member_id in member_ids:
                # get each user object for evey member
                member_user = User.objects.get(id=member_id)
                # get all of the users sends
                member_sends = Send.objects.filter(user=member_user, send_date__range=[start_date, end_date])
                # initialize variable to keep track of each members score
                member_score = 0
                # For each member loop through their sends and add up the members score
                for send in member_sends:
                    # update the members score with the score of each valid send
                     member_score += send.score
                # add each members score to the total score for the team
                team_total_score += member_score

            return team_total_score
    



