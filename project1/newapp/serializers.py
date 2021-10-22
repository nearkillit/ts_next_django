from django.db.models import fields
from rest_framework import serializers
from .models import User, Coffee, Topping, Carts, OrderTopping, OrderCoffee, Orderers
from rest_framework.utils.serializer_helpers import ReturnDict

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email')

class CoffeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coffee
        fields = ('id', 'coffee_name', 'coffee_detail', 'img', 'coffee_priceL', 'coffee_priceM')

class ToppingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topping
        fields = ('id', 'topping_name', 'topping_priceL', 'topping_priceM')

class CartsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Carts
        fields = ('id', 'user')
        extra_kwargs = {'user': {'read_only': True}}

class OrderCoffeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderCoffee
        fields = ('id', 'item_number','coffee_id', 'item_size', 'carts')


class OrderersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Orderers
        fields = ('id', 'carts', 'user' ,'order_name', 'addressnumber', 'address', 'email', 'order_date', 'order_time', 'tel', 'status')
        extra_kwargs = {'user': {'read_only': True}}

class OrderToppingSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderTopping
        fields = ('id', 'cart', 'topping_id')


