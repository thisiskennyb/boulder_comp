from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from league.models import League
from .serializers import LeagueSerializer, TeamSerializer
from team.models import Team

class LeagueView(APIView):

    def get(self, request, pk=None):

        if pk == None:
            all_leagues = League.objects.all()
            
            serializer = LeagueSerializer(all_leagues, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            #Works for now, still need to verify with Teams being made, currently returns []
            user = request.user
            # Filter leagues based on the user
            print("We executed the else block")
            user_leagues = League.objects.filter(teams__users=user)
            serializer = LeagueSerializer(user_leagues, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)


    def post(self, request):
        user = request.user
        league_data = request.data
        # Set the user field to the current user
        league_name = league_data['league_name']

        start_date = league_data['start_date']
        end_date = league_data['end_date']
        team_size = league_data['team_size']
        location = league_data['location']

        new_league = League.objects.create(moderator=user, league_name=league_name, start_date=start_date, end_date=end_date, team_size=team_size, location=location)
        new_league.save()

        serializer = LeagueSerializer(new_league)

        return Response(serializer.data, status=status.HTTP_201_CREATED)
    

class CreateLeagueTeamView(APIView):
    def get(self, request, pk):

        #Works for now, still need to verify with Teams being made, currently returns []
        user = request.user
        # Filter leagues based on the user
        # league = League.objects.get(id=pk)
        teams = Team.objects.filter(league_id=pk)
       

        serializer = TeamSerializer(teams, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)


        # serializer = LeagueSerializer(user_leagues, many=True)
        # return Response(serializer.data, status=status.HTTP_200_OK)




    def post(self, request):
        # need user, league_id, team_name
        user = request.user
        team_data = request.data
        
         # Create an instance of League
        league_instance = League.objects.get(id=team_data['league_id'])

        if Team.objects.filter(league=league_instance, captain=user).exists():
            return Response({"message": f"User can only create one team per league"}, status=status.HTTP_400_BAD_REQUEST)
        
        # Call the add_team method on the league_instance
        league_instance.add_team(user, team_data['team_name'], league_instance)

        team = Team.objects.get(league_id=team_data['league_id'], team_name=team_data['team_name'])

        serializer = TeamSerializer(team)
        return Response(serializer.data, status=status.HTTP_201_CREATED)        
  

