# weather_app/urls.py

from django.urls import path
from .views import weather_view, hello_world, all_cities_weather

urlpatterns = [
    path('', hello_world, name='hello_world'),  # Root URL pattern
    path('weather/', all_cities_weather, name='all_cities_weather'),  # New URL pattern for all cities
    path('weather/<str:city>/', weather_view, name='weather'),
]
