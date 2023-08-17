from django.urls import path
from .views import weather_list, weather_detail

urlpatterns = [
    path('weather/', weather_list, name='weather_list'),
    path('weather/<str:city>/', weather_detail, name='weather_detail'),
]
