from django.urls import path
from . import views

urlpatterns = [
    path('threatsources/', views.ThreatSourceListCreate.as_view(), name='threatsources-list'),
    path('threatsources/delete/<int:pk>/', views.ThreatSourceDelete.as_view(), name='delete-threatsource'),   
]
