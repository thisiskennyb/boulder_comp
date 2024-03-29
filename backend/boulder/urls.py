from django.urls import path
from boulder.views import CragsListView, CragBouldersView



urlpatterns = [
    path('crags-list/', CragsListView.as_view(), name='crags-list'),
    path('crag-boulders/', CragBouldersView.as_view(), name='crag-boulders'),
]