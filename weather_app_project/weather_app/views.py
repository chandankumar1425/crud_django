from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404

# Create your views here.
weather_data = {
    'San Francisco': {'temperature': 14, 'weather': 'Cloudy'},
    'New York': {'temperature': 20, 'weather': 'Sunny'},
    'Los Angeles': {'temperature': 24, 'weather': 'Sunny'},
    'Seattle': {'temperature': 10, 'weather': 'Rainy'},
    'Austin': {'temperature': 32, 'weather': 'Hot'},
}


@csrf_exempt
def weather_list(request):
    if request.method == 'GET':
        return JsonResponse(weather_data)

    elif request.method == 'POST':
        new_weather = request.POST.dict()
        city = new_weather.get('city')
        weather_data[city] = {
            'temperature': int(new_weather['temperature']),
            'weather': new_weather['weather']
        }
        return JsonResponse(weather_data[city], status=201)

@csrf_exempt
def weather_detail(request, city):
    city_data = weather_data.get(city)
    if not city_data:
        return JsonResponse({'error': 'City not found'}, status=404)

    if request.method == 'GET':
        return JsonResponse(city_data)

    elif request.method == 'PUT':
        updated_weather = request.POST.dict()
        city_data['temperature'] = int(updated_weather.get('temperature', city_data['temperature']))
        city_data['weather'] = updated_weather.get('weather', city_data['weather'])
        return JsonResponse(city_data)

    elif request.method == 'DELETE':
        del weather_data[city]
        return JsonResponse({}, status=204)
    
