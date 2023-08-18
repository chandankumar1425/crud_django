from django.db import models

class Dish(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)

class Order(models.Model):
    order_id = models.CharField(max_length=100)
    status = models.CharField(max_length=100)
