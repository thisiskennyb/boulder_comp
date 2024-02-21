from django.urls import path
from send.views import SendView


urlpatterns = [
    path('', SendView.as_view(), name='send')
]