from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Team
from league.serializers import TeamSerializer
from league.models import League


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
        user = request.user
        data = request.data

        # Get the team and league objects
        team = Team.objects.get(id=data['team_id'], league_id=data['league_id'])
        league = League.objects.get(id=data['league_id'])
        print(league.team_size)
        # Add the user to the team
        team.add_team_member(user)

        # Add the user to the league's participants
        league.participants.add(user)

        # Return the serialized team
        serializer = TeamSerializer(team)
        return Response(serializer.data)









