from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from league.models import League
from .serializers import LeagueSerializer, TeamSerializer
from team.models import Team
from django.db.models import Sum, Count
from send.models import Send

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

    #Creates a league, requires league_name, start_date, end_date, team_size, location
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
        

        new_league.participants.add(user)
        new_league.save()

        serializer = LeagueSerializer(new_league)

        return Response(serializer.data, status=status.HTTP_201_CREATED)
    


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
        serializer = TeamSerializer(teams, many=True)

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
  



class LeagueStatsView(APIView):

# Get all leagues the user is in
    #Initialize hash map
    # For each league get the teams
        # hashmap['league_name'] = [store the teams scores in here] #this can be ordered and return the data we need
        #For each team get the members
            #calculate team score
            #For each member get the sends
            #calculate member score
            # interate through send and add to the score if valid (within league date range)

    def get(self, request):
        user = request.user
        leagues = League.objects.filter(participants=user)
        
        teams = Team.objects.filter(members=user)
        print(teams)

        for team in teams:
            print(team.members)
        
        # sends where user = user 
        # league_data = []

        # for league in leagues:
        #     print(league)
        #     teams_in_league = Team.objects.filter(league=league)
        #     user_team = teams_in_league.filter(members=user).first()

        #     # Get all sends made by members of the user's team
        #     team_sends = Send.objects.filter(user__in=user_team.members.all())

        #     # Calculate user's team rank
        #     user_rank = teams_in_league.annotate(num_sends=Count('members__send')).filter(num_sends__gt=user.send.count()).count() + 1

        #     # Calculate user's team score
        #     team_score = team_sends.aggregate(total_score=Sum('score'))['total_score']

        #     league_info = {
        #         'league_name': league.league_name,
        #         'user_rank': user_rank,
        #         'team_score': team_score
        #     }
        #     league_data.append(league_info)

        return Response({"message": "you suck"})




