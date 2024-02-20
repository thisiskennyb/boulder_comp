from django.urls import path
from team.views import TeamView


urlpatterns = [
    
    path('', TeamView.as_view(), name='team'),

]