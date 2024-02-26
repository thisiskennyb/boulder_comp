from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Team
from league.serializers import TeamSerializer
from league.models import League


class TeamsInLeagueView(APIView):
    #Gets all teams for a specific league, requires league_id
    def get(self, request, pk):
        data = request.data

        ################
#     def post(self, request):
#         user = request.user
#         data = request.data
#         print(request.data, 'this is data')
        
#         start_date = data['start_date']
#         end_date = data['end_date']

#         # get all of the leagues the user is in
#         leagues = League.objects.filter(user=user)

#         league_dict = {}

#         # Loop through each league
#         for league in leagues:
#              # Get the teams for each league
#             teams = Team.objects.filter(leage=league)
#             # keep track of each teams score
#             team_score = 0
#             team_name = ''
#             team_score_arr = []
#             for team in teams:
#                  print(team)
#                  # get league start date, and end date
#                  # get the array of member_ids from team
#                  # call the send model method 'calculate_team_score'
#                  # team_score += member score
#                  # team_name = team name
#             # update league dict
#             league_dict['league.league_name'] = [team_name, team_score]
#             # reset team_score and team_name variables
#             team_score = 0
    

# # this is the method to be used in the above method
# def calculate_team_score(self, start_date, end_date, member_ids):

#         team_total_score = 0

#         # loop through members
#         for member_id in member_ids:
#             member_user = User.objects.get(id=member_id)
#             print(member_user, 'THIS IS A MEMBER OR SOMETHING')
#             member_sends = Send.objects.filter(user=member_user, send_date__range=[start_date, end_date])
            
#             member_score = 0
#         # For each member loop through their sends and add up the members score
#             for send in member_sends:
                
#                  score += send.score

#         # add each members score to the total score for the team
#             team_total_score += member_score

#         return team_total_score
##############################

        league_teams = Team.objects.filter(league=pk)
        print(league_teams)
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
    def get(self, request, pk):
        #Get a specific team, requires id
        data = request.data
        team = Team.objects.get(id=pk)
        serializer = TeamSerializer(team)

        return Response(serializer.data)


##### Needs some validation or logic in add_team_member method
## Probably can query League to check team_size and only allow add_team_member to function when members <= team_size

    def post(self, request):
        user = request.user
        data = request.data


        #Query inside of try

        try:


        # Get the team and league objects
            team = Team.objects.get(id=data['team_id'], league_id=data['league_id'])
            league = League.objects.get(id=data['league_id'])
            print(league.team_size)

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









