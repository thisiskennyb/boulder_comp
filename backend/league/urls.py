from django.urls import path
from league.views import LeagueView


urlpatterns = [
    path('<int:pk>', LeagueView.as_view(), name='send')
]