from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from .views import SignupView, DashboardView
from .activate import ActivateView
from .views import change_password


urlpatterns = [
    path('get-token', obtain_auth_token),
    path('signup', SignupView.as_view(), name='signup'),
    path('activate/<uidb64>/<token>', ActivateView.as_view(),name='activate'),
    path('change_password/', change_password, name='change_password'),
    path('create_dashboard/', DashboardView.as_view()),
    path('create_dashboard/<int:pk>', DashboardView.as_view()),

]