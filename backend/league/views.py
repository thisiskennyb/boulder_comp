from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from league.models import League
from .serializers import LeagueSerializer
from team.serializers import TeamSerializer
from team.models import Team



class LeagueView(APIView):
    def get(self, request, pk=None):
        """
    This view will get a specific league if a league id is included in the request url
    Otherwise it will get all of the leagues a user is in

    pk: league_id that will be present in url if specific league is desired

    If we have a pk, we try to query that league_id
    Exception is handled by returning a 400 status code and an empty list

    If there is no pk, we try to query all of the leagues that include the user
    Exception is handled by returning a 200 status and an empty list

    """
        #Gets a specific league, if league id is in url
        if pk:

            try:
                league = League.objects.get(id=pk)
                serializer = LeagueSerializer(league)
                return Response(serializer.data, status=status.HTTP_200_OK)
            # Handles the case of an incorrect pk
            # Will only be able to run if a bad pk is provided
            except League.DoesNotExist:
                return Response([], status=status.HTTP_400_BAD_REQUEST)
            
        #Gets all the leagues the user is part of
        else:
            user = request.user

            # Filter leagues based on the user
            try:
            # We want Leagues where participants = user
                user_leagues = League.objects.filter(participants=user)
                
                serializer = LeagueSerializer(user_leagues, many=True)

                return Response(serializer.data, status=status.HTTP_200_OK)
            # If user is not in any leagues we just return an empty list
            except League.DoesNotExist:
                return Response([], status=status.HTTP_200_OK)
            

           
   

    
    def post(self, request):
        """
        This view creates and returns a League

        Request Data: league_name, start_date, end_date, team_size, location required

        Try to query League with league_name=league_name
        If league exists return 400 Bad Request

        Otherwise create a new league with valid fields from Request Data

        Return: 201 Created, serialized League object
        """

        user = request.user
        league_data = request.data
        try:
            league_name = league_data['league_name']
            start_date = league_data['start_date']
            end_date = league_data['end_date']
            team_size = league_data['team_size']
            location = league_data['location']
        # Handle if these are not all found in the request data
        except KeyError as e:
            return Response({"message": f'One or more fields was missing, check {e}'}, status=status.HTTP_400_BAD_REQUEST)
        
        if League.objects.filter(league_name=league_name).exists():
            return Response({'error': 'This league name has already been used'}, status=status.HTTP_400_BAD_REQUEST)

        new_league = League.objects.create(moderator=user, league_name=league_name, start_date=start_date, end_date=end_date, team_size=team_size, location=location)
        new_league.save() # Save league after creating

        serializer = LeagueSerializer(new_league)

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    
    def put(self, request, pk):
        """
        This view takes in request data, picture, and updates league picture field
        """
        try:
            picture = request.data.get('picture')
        except KeyError as e:
            return Response({"message": f'There was an issue with one or more fields, chec {e}'}, status=status.HTTP_400_BAD_REQUEST)
            
        try:
            league = League.objects.get(id=pk)
            league.picture = picture
            league.save()
            serializer = LeagueSerializer(league)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except League.DoesNotExist:
            return Response({"error": "UserDashboard does not exist"}, status=status.HTTP_404_NOT_FOUND)
        


class AllLeagueView(APIView):
    #Returns all leagues
    def get(self, request):
        """
        This view returns all existing leagues
        Tries to query all leagues

        Exception handled by Returning empty list, status 200 OK
        Returns: 200 OK, serialized list of League Objects (all existing leagues)
        """
      
        try:
            all_leagues = League.objects.all()
            serializer = LeagueSerializer(all_leagues, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except League.DoesNotExist:
            return Response([], status=status.HTTP_200_OK)

    
class CreateLeagueTeamView(APIView):

    def get(self, request):
        """
        This view returns all of the teams that the user is currently a member of
        Before the data is returned all of the team's scores and ranks are updated
        Two model methods are called within this view to calculate a teams score and update a teams rank
        """

        # Get the teams a user is on
        user = request.user
        teams = Team.objects.filter(members=user)
        
        #loop through all of the teams that the user belongs to
        for team in teams:
            # for each league the team is in get all of the teams in that league
            all_teams_in_league = Team.objects.filter(league=team.league)           
            #loop through all of the teams for each league
            for t in all_teams_in_league:
                # get all of the members in each team
                members= t.members.all()
                # initialize a list with all member id's
                member_id_list = [member.id for member in members]
                # initialize variables to store the leagues start date and end date
                start_date = t.league.start_date
                end_date = t.league.end_date
                # call the Team method to calculate each teams score
                team_score = t.calculate_team_score(start_date, end_date, member_id_list)
                # update and save each teams score
                t.score = team_score
                t.save()
        
        

        # query all leagues that the user is in
        users_leagues = League.objects.filter(participants=user)
        # loop through the leagues queryset
        for league in users_leagues:
            # get the number of teams per league
            num_of_teams = Team.objects.filter(league=league).count()
            # update the league field with the number of teams and save
            league.number_of_teams = num_of_teams
            league.save()
            # query all teams for a given league
            all_teams = Team.objects.filter(league=league)
            # update each teams rank by calling the league method 'update_team_ranks' and save
            league.update_team_ranks(all_teams)
            league.save()
        
        # Query the team objects again to get the updated data        
        updated_teams = Team.objects.filter(members=user)
        
        # serialize the output
        serializer = TeamSerializer(updated_teams, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)


    def post(self, request):
        """
        This view lets a user create a team in a league

        Request Data: league_id, team_name required

        league_id: int, id of league to add team
        team_name: string, name of Team to be created

        Checks that the league_id does not have a team created by the user (captain)

        Uses League method add_team providing the instance of user, team_name, and the league instance

        Gets the team in the case of joining
        Or Creates the team in the case of creating a Team

        Returns: 201 Created, serialized Team Object with updated user
        """
        user = request.user
        team_data = request.data

        # create a team in league required input: league_id, team_name
        
        # Create an instance of League
        league_instance = League.objects.get(id=team_data['league_id'])

        if Team.objects.filter(league=league_instance, captain=user).exists():
            return Response({"message": f"User can only create one team per league"}, status=status.HTTP_400_BAD_REQUEST)
        
        # Call the add_team method on the league_instance
        league_instance.add_team(user, team_data['team_name'], league_instance)

        # Get or create the team -- Helps handle multiple requests from react
        # Cannot accidently create Team twice, because it will be queried if it exists
        team, created = Team.objects.get_or_create(league=league_instance, team_name=team_data['team_name'], captain=user)

        # Add the user who created the team to the league participants
        league_instance.participants.add(user)
        # Add user to the members for easier calculation
        team.add_team_member(user)
        serializer = TeamSerializer(team)

        # Handle appropriate code, 201 for new created team
        
        return Response(serializer.data, status=status.HTTP_201_CREATED)     
  






