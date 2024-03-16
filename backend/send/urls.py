from django.urls import path
from send.views import SendView, AllSendsFeedView


urlpatterns = [
    path('', SendView.as_view(), name='send'),
    path('all-sends-feed/', AllSendsFeedView.as_view(), name='all-sends-feed')
]