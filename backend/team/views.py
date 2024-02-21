from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Team
from league.serializers import TeamSerializer


class TeamsInLeagueView(APIView):
    #Gets all teams for a specific league, requires league_id
    def get(self, request):
        data = request.data

        league_teams = Team.objects.filter(league=data['league_id'])
        serializer = TeamSerializer(league_teams, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class AllTeamsView(APIView):
    #Gets all teams
    def get(self, request):
        all_teams = Team.objects.all()
        serializer = TeamSerializer(all_teams, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
class TeamView(APIView):
    #Get specific team with team_id
    def get(self, request):
        #Get a specific team, requires id
        data = request.data
        team = Team.objects.get(id=data['team_id'])
        serializer = TeamSerializer(team)

        return Response(serializer.data)


##### Needs some validation or logic in add_team_member method
## Probably can query League to check team_size and only allow add_team_member to function when members <= team_size
    def post(self, request):
        #Join a team in a a league, requires league_id, team_id
        user = request.user
        data = request.data

        # league = League.objects.get(id=data['league_id'])

        team = Team.objects.get(id=data['team_id'], league_id=data['league_id'])

        team.add_team_member(user)
        # print(team)
        serializer = TeamSerializer(team)
        return Response(serializer.data)


        # {
        #     team_id
        #     league_id
        # }




# Create your views here.


# from django.db.models import Sum, F

# # Assuming you have imported the necessary models: User, Send, Team, and League

# # Define your league's start and end dates
# league_start_date = '2024-01-01'
# league_end_date = '2024-12-31'

# # Retrieve the individual scores of each team member within the league's date range
# team_members_scores = Send.objects.filter(
#     user__teams__league__start_date__lte=F('send_date'),
#     user__teams__league__end_date__gte=F('send_date'),
# ).values('user__id').annotate(total_score=Sum('score'))

# # team_members_scores is a queryset containing dictionaries with user_id and total_score

# # Example of accessing individual scores
# for member_score in team_members_scores:
#     user_id = member_score['user__id']
#     total_score = member_score['total_score']
#     print(f"User ID: {user_id}, Total Score: {total_score}")
