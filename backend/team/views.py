from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Team
from team.serializers import TeamSerializer
from league.models import League


class TeamsInLeagueView(APIView):
    """
    This view gets all teams for a specific league

    Request Data: league_id

    Tries to query all teams associated with a league id
    Exception that no teams exist handled by returning Status 200, and an empty list

    Returns: 200 OK response, serialized list of Team Objects
    """
    #Gets all teams for a specific league, requires league_id
    def get(self, request, pk):
        try:
            league_teams = Team.objects.filter(league=pk)
            serializer = TeamSerializer(league_teams, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        # If no team is found return an empty list and 200 OK
        except Team.DoesNotExist():
            return Response([], status=status.HTTP_200_OK)
       

class AllTeamsView(APIView):
    def get(self, request):
        """
        This view gets all of the teams that exist

        Returns: 200 OK and serialized List of Team objects, or Empty list and 200 OK if no teams
        """
        try:
            all_teams = Team.objects.all()
            serializer = TeamSerializer(all_teams, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        # If no teams, return an empty list
        except Team.DoesNotExist:
            return Response([], status=status.HTTP_200_OK)
            

class TeamView(APIView):
    def get(self, request, pk):
        """
        Gets a specific team
        Needs: team_id, expected in url (pk)

        Returns: Team Object, Response 200 OK
        """
        try:
            team = Team.objects.get(id=pk)
            serializer = TeamSerializer(team)
            return Response(serializer.data)
        except Team.DoesNotExist:
            return Response({"error": "There is an error with one or more fields in request"}, status=status.HTTP_200_OK)
            



    def post(self, request):
        """
        This view adds a User to a Team (Lets a user join a team)

        Request Data: team_id and league_id required

        Try to get Team and League objects that match appropriate ids
        Exception handled by returning Error message with status 404

        Checks if user is a member of the team

        Checks that team is not full

        Adds member to team if user is not a member of the team and is not full

        Returns: 201 Created, Updated serialized Team Object
        """
        user = request.user
        data = request.data

        try:
            # Getting an instance of the team and league to update
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
        """
        This view lets a user update their Team Photo

        Request Data: team_picture required, pk --> included in request url

        Tries to get the Team that matches the id passed in pk
        Exceptions handled with 404 Response if not found, and 400 for incorrect/invalid pk

        Returns: Response 201 Created, serialized Team Object
        """
        try:
            team = Team.objects.get(id=pk)
            picture = request.data.get('team_picture')
            team.team_picture = picture
            team.save()
            serializer = TeamSerializer(team)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Team.DoesNotExist:
            return Response({"error": "Team does not exist"}, status=status.HTTP_404_NOT_FOUND)
        except KeyError as e:
            return Response({"error:" f'One or more fields is not correct, check {e}',}, status=status.HTTP_400_BAD_REQUEST)


        

        



