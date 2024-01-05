from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from .views import SignupView
from .activate import ActivateView
from .views import change_password


urlpatterns = [
    path('get-token', obtain_auth_token),
    path('signup', SignupView.as_view()),
    path('activate/<uidb64>/<token>', ActivateView.as_view(),name='activate'),
    path('change_password/', change_password, name='change_password'),

]