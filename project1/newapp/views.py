from django.db.models import query
from rest_framework import viewsets
from . import serializers
from rest_framework.permissions import AllowAny
from .models import User, Coffee, Topping, Carts, OrderCoffee, Orderers, OrderTopping

# Create your views here.

class UserVieSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = serializers.UserSerializer

class CoffeeVieSet(viewsets.ModelViewSet):
    queryset = Coffee.objects.all()
    serializer_class = serializers.CoffeeSerializer
    permission_classes = (AllowAny,)


class ToppingVieSet(viewsets.ModelViewSet):
    queryset = Topping.objects.all()
    serializer_class = serializers.ToppingSerializer
    permission_classes = (AllowAny,)


class CartVieSet(viewsets.ModelViewSet):
    queryset =  Carts.objects.all()
    serializer_class = serializers.CartsSerializer
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    
    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)


class OrderCoffeeVieSet(viewsets.ModelViewSet):
    queryset = OrderCoffee.objects.all()
    serializer_class = serializers.OrderCoffeeSerializer

class OrderersVieSet(viewsets.ModelViewSet):
    queryset = Orderers.objects.all()
    serializer_class = serializers.OrderersSerializer
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)

class OrderToppingVieSet(viewsets.ModelViewSet):
    queryset = OrderTopping.objects.all()
    serializer_class = serializers.OrderToppingSerializer