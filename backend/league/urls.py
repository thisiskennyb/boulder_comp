from django.urls import path
from league.views import LeagueView, CreateLeagueTeamView, AllLeagueView, LeagueStatsView


urlpatterns = [
    
    path('', LeagueView.as_view(), name='league'),
    path('<int:pk>', LeagueView.as_view(), name='league'),
    path('all/', AllLeagueView.as_view(), name='league'),
    path('create_team/', CreateLeagueTeamView.as_view(), name='create-team'),
    path('create_team/<int:pk>', CreateLeagueTeamView.as_view(), name='view-team'),
    path('league_stats/', LeagueStatsView.as_view(), name='league-stats')
]