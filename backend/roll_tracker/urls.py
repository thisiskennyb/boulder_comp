"""
URL configuration for roll_tracker project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_registration.api.views import send_reset_password_link, reset_password



urlpatterns = [
    path('admin/', admin.site.urls),
    path('password_reset/', include('django_rest_passwordreset.urls', namespace='password_reset')),
    path('password_reset/confirm/', include('django_rest_passwordreset.urls', namespace='confirm_password_reset')),
    path('api/v1/accounts/', include('rest_registration.api.urls')),
    path('api/v1/accounts/send-reset-password-link/', send_reset_password_link),
    path('api/v1/accounts/reset-password/', reset_password),
    path('api/v1/accounts/register/', include("accounts.urls")),

]





