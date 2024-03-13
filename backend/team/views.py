from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Team
from team.serializers import TeamSerializer
from league.models import League


class TeamsInLeagueView(APIView):
    #Gets all teams for a specific league, requires league_id
    def get(self, request, pk):
        data = request.data
        league_teams = Team.objects.filter(league=pk)
        print(league_teams)
        serializer = TeamSerializer(league_teams, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    


##### Not Sure this is being used very much? ##########
##### Cases for needing all teams... stats? ##########
    
class AllTeamsView(APIView):
    #Gets all teams
    def get(self, request):
        all_teams = Team.objects.all()
        serializer = TeamSerializer(all_teams, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

##### Not Sure this is being used very much? ##########
##### Cases for needing all teams... stats? ##########

class TeamView(APIView):
    #Get specific team with team_id
    def get(self, request, pk):
        """
        Gets a specific team
        Needs: team_id, expected in url (pk)
        """
        #CAN REFACTOR, DATA NOT USED? NEED TRY CATCH, QUERY COULD FAIL
        data = request.data
        team = Team.objects.get(id=pk)
        serializer = TeamSerializer(team)

        return Response(serializer.data)


    def post(self, request):
        user = request.user
        data = request.data

        try:
        # Get the team and league objects

        #DO WE NEED LEAGUE?
        #TEAM IS HAS ACCESS TO LEAGUE
        #CAN MAYBE CHECK IF USER ID NOT IN TEAM.LEAGUE.PARTICIPANTS


            team = Team.objects.get(id=data['team_id'], league_id=data['league_id'])
            league = League.objects.get(id=data['league_id'])
        # Check if the user is already a member of any other team in the league
            other_teams_in_league = Team.objects.filter(league=league).exclude(id=team.id)
            for other_team in other_teams_in_league:
                if user in other_team.members.all():
                    return Response({"message": "You are already a member of another team in this league"}, status=status.HTTP_400_BAD_REQUEST)

            
            ## Check if user is in team
            if user in team.members.all():
                return Response({"message": "You are already a member of this team"}, status=status.HTTP_400_BAD_REQUEST)
            
            ## Check if the team has room
            if team.members.count() >= league.team_size:
                return Response({"message": "This team is full"}, status=status.HTTP_400_BAD_REQUEST)


            # Add the user to the team
            team.add_team_member(user)

            # Add the user to the league's participants
            league.participants.add(user)

            # Return the serialized team
            serializer = TeamSerializer(team)
            return Response(serializer.data)
        except Team.DoesNotExist:
            return Response({"message": "Team not found"}, status=status.HTTP_404_NOT_FOUND)
        except League.DoesNotExist:
            return Response({"message": "League not found"}, status=status.HTTP_404_NOT_FOUND)





    def put(self, request, pk):
        user = request.user
        data = request.data
       ###USER AND DATA EVEN USED HERE?

        try:
            team = Team.objects.get(id=pk)
        except Team.DoesNotExist:
            return Response({"error": "Team does not exist"}, status=status.HTTP_404_NOT_FOUND)

        picture = request.data.get('team_picture')

        team.team_picture = picture
        
        team.save()
        serializer = TeamSerializer(team)

        
        return Response(serializer.data, status=status.HTTP_200_OK)



