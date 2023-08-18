from decimal import Decimal
from django.test import TestCase
from restaurant.models import Dish, Order

class ModelsTestCase(TestCase):
    def setUp(self):
        Dish.objects.create(name="Pizza", price=Decimal("10.99"))
        Order.objects.create(order_id="123456", status="received")

    def test_dish_model(self):
        dish = Dish.objects.get(name="Pizza")
        self.assertEqual(dish.name, "Pizza")
        
        expected_price = Decimal("10.99")
        self.assertEqual(dish.price, expected_price)

    # ... other test methods ...
    def test_order_model(self):
        order = Order.objects.create(order_id="123456", status="received")
        self.assertEqual(order.order_id, "123456")
        self.assertEqual(order.status, "received")

    def test_create_dish(self):
        Dish.objects.create(name="Burger", price=7.99)
        self.assertEqual(Dish.objects.count(), 2)    

    def test_read_dish(self):
        dish = Dish.objects.get(name="Pizza")
        expected_price = Decimal("10.99")
        self.assertEqual(dish.price, expected_price)

    def test_update_dish(self):
        dish = Dish.objects.get(name="Pizza")
        dish.price = Decimal("14.99")
        dish.save()
        updated_dish = Dish.objects.get(name="Pizza")
        self.assertEqual(updated_dish.price, Decimal("14.99"))


    def test_delete_dish(self):
        dish = Dish.objects.get(name="Pizza")
        dish.delete()
        self.assertEqual(Dish.objects.count(), 0)

    def test_generate_order_id(self):
        order = Order.objects.create(status="received")
        self.assertIsNotNone(order.order_id)    

    def test_initial_order_status(self):
        order = Order.objects.get(order_id="123456")
        self.assertEqual(order.status, "received")    

    def test_update_order_status(self):
        order = Order.objects.get(order_id="123456")
        order.status = "in_progress"
        order.save()
        updated_order = Order.objects.get(order_id="123456")
        self.assertEqual(updated_order.status, "in_progress")    