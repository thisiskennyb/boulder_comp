from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from league.models import League
from .serializers import LeagueSerializer, TeamSerializer
from team.models import Team
from django.db.models import Sum, Count
from send.models import Send

# Unused imports... Sum, Count, Send

# Not sure if we use this, but set up poorly

## Need to protect queries in try/except

# Response If.. 200 OK and Else... 200 OK is confusing written without the try/excepts

###
### if pk
     ##### Try
              ##### Query league where id = pk
     ##### Except
        ##### Pass (Or return a useful status, in this case we want to pass to let the Else handle the case of no pk)
    #Else
    #####  Try
            ###### Query leagues where user is a particpant
    ###### Except
    ###### Return 204 No Content if empty? 404 if no leagues with user? status can tell us something if we use it


class LeagueView(APIView):

    def get(self, request, pk=None):
        #Gets a specific league, if league id is in url
        if pk:
            league = League.objects.get(id=pk)
            
            serializer = LeagueSerializer(league)
            return Response(serializer.data, status=status.HTTP_200_OK)
        #Gets all the leagues the user is part of
        else:
            user = request.user
            # Filter leagues based on the user
            # We want Team where members = user
            user_leagues = League.objects.filter(participants=user)
            serializer = LeagueSerializer(user_leagues, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        

    #### Same as above, Make

    #Creates a league, requires league_name, start_date, end_date, team_size, location
    def post(self, request):
        user = request.user
        league_data = request.data
        league_name = league_data['league_name']
        start_date = league_data['start_date']
        end_date = league_data['end_date']
        team_size = league_data['team_size']
        location = league_data['location']

        if League.objects.filter(league_name=league_name).exists():
            return Response({'error': 'This league name has already been used'}, status=status.HTTP_400_BAD_REQUEST)

        new_league = League.objects.create(moderator=user, league_name=league_name, start_date=start_date, end_date=end_date, team_size=team_size, location=location)


        new_league.save()

        serializer = LeagueSerializer(new_league)

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    
    def put(self, request, pk):
        user = request.user
        data = request.data
        print(data)

        try:
            league = League.objects.get(id=pk)
        except League.DoesNotExist:
            return Response({"error": "UserDashboard does not exist"}, status=status.HTTP_404_NOT_FOUND)
        
        picture = request.data.get('picture')
        # league_name = request.data.get('league_name')
        # start_date = request.data.get('start_date')
        # end_date = request.data.get('end_date')
        # location = request.data.get('location')
        # team_size = request.data.get('team_size')
        

        
        league.picture = picture
        # league.league_name = league_name
        # league.start_date = start_date
        # league.end_date = end_date
        # league.location = location
        # league.team_size = team_size
        
        league.save()
        serializer = LeagueSerializer(league)

        
        return Response(serializer.data, status=status.HTTP_200_OK)
    


class AllLeagueView(APIView):
    #Returns all leagues
    def get(self, request):
        all_leagues = League.objects.all()
        serializer = LeagueSerializer(all_leagues, many=True)
        return Response(serializer.data)
    
class CreateLeagueTeamView(APIView):

    def get(self, request):

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
        
              
        updated_teams = Team.objects.filter(members=user)
                

        # serialize the output
        serializer = TeamSerializer(updated_teams, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)


    def post(self, request):
        user = request.user
        team_data = request.data

        # create a team in league required input: league_id, team_name
        
        # Create an instance of League
        league_instance = League.objects.get(id=team_data['league_id'])

        if Team.objects.filter(league=league_instance, captain=user).exists():
            return Response({"message": f"User can only create one team per league"}, status=status.HTTP_400_BAD_REQUEST)
        
        # Call the add_team method on the league_instance
        league_instance.add_team(user, team_data['team_name'], league_instance)

        # Get or create the team
        team, created = Team.objects.get_or_create(league=league_instance, team_name=team_data['team_name'], captain=user)

        # Add the user who created the team to the league participants
        league_instance.participants.add(user)
        # Add user to the members for easier calculation
        team.add_team_member(user)

        serializer = TeamSerializer(team)
        return Response(serializer.data, status=status.HTTP_201_CREATED)     
  



#### Whats going on with this?
### Leagues not getting used, Response?


class LeagueStatsView(APIView):

    def get(self, request):
        user = request.user
        leagues = League.objects.filter(participants=user)
        
        teams = Team.objects.filter(members=user)
        print(teams)

        for team in teams:
            print(team.members)
   

        return Response({"message": "you suck"})




