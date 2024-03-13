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
    number_of_teams = models.IntegerField(default=0)
    picture = models.FileField(upload_to="leaguephotos/", blank=True, null=True)


    def __str__(self):
        return f'{self.league_name} ends on {self.end_date}'
    

    def add_team(self, user, team_name, league_object):
        from team.models import Team
        team = Team.objects.create(captain=user, team_name=team_name, league=league_object)
        team.add_team_member(user)

    def update_team_ranks(self, teams_queryset):
        # Order the queryset by score in descending order
        teams_queryset = teams_queryset.order_by('-score')

        # Initialize rank and previous_score variables
        rank = 1
        previous_score = None

        # Update rank field based on score and handle ties
        for team in teams_queryset:
            # If the score is different from the previous score, update the rank
            if team.score != previous_score:
                team.rank = rank
                team.save()
            # If the score is the same as the previous score, don't increment the rank
            else:
                team.rank = rank - 1
                team.save()
            
            # Update previous_score for the next iteration
            previous_score = team.score

            # Increment rank
            rank += 1
            team.save()



