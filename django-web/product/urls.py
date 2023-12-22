from django.urls import path
from .views import fetch_user

urlpatterns = [
    path('fetch-user/', fetch_user, name='fetch_user'),
]
