from django.urls import path
from send.views import SendView, ValidSendView


urlpatterns = [
    path('', SendView.as_view(), name='send'),
    path('valid/', ValidSendView.as_view(), name='send')
]