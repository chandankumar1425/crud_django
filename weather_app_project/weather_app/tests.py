from django.test import TestCase
from django.urls import reverse
from .views import weather_data

class WeatherViewTest(TestCase):

    def test_get_valid_city(self):
        response = self.client.get(reverse('weather_detail', kwargs={'city': 'San Francisco'}))
        self.assertEqual(response.status_code, 200)
        self.assertJSONEqual(str(response.content, encoding='utf8'), {'temperature': 14, 'weather': 'Cloudy'})

    def test_get_invalid_city(self):
        response = self.client.get(reverse('weather_detail', kwargs={'city': 'InvalidCity'}))
        self.assertEqual(response.status_code, 404)

    def test_post_new_weather(self):
        new_weather = {'city': 'Chicago', 'temperature': 18, 'weather': 'Cloudy'}
        response = self.client.post(reverse('weather_list'), new_weather, content_type='application/json')
        self.assertEqual(response.status_code, 201)  # 201 Created

    def test_update_weather(self):
        updated_weather = {'temperature': 22}
        response = self.client.put(reverse('weather_detail', kwargs={'city': 'San Francisco'}), updated_weather, content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(weather_data['San Francisco']['temperature'], 22)

    def test_delete_weather(self):
        response = self.client.delete(reverse('weather_detail', kwargs={'city': 'Los Angeles'}))
        self.assertEqual(response.status_code, 204)  # 204 No Content
        self.assertNotIn('Los Angeles', weather_data)

    # ... Other test methods for other routes ...

