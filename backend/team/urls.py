from django.urls import path
from team.views import TeamView, TeamsInLeagueView, AllTeamsView


urlpatterns = [
    
    path('', TeamView.as_view(), name='team'),
    path('<int:pk>', TeamView.as_view(), name='team'),
    path('league/<int:pk>', TeamsInLeagueView.as_view(), name='team_league'),
    path('league/all/', AllTeamsView.as_view(), name='team_league'),
 
]