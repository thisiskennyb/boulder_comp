from django.urls import path
from league.views import LeagueView, CreateLeagueTeamView


urlpatterns = [
    
    path('', LeagueView.as_view(), name='league'),
    path('<int:pk>', LeagueView.as_view(), name='league'),
    path('all/', LeagueView.as_view(), name='league'),
    path('create_team/', CreateLeagueTeamView.as_view(), name='create-team'),
    path('create_team/<int:pk>', CreateLeagueTeamView.as_view(), name='view-team')
]