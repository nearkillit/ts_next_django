from django.db.models import query
from rest_framework import viewsets
from . import serializers
from rest_framework.permissions import AllowAny
from .models import User, Coffee, Topping, Carts, OrderCoffee, Orderers, OrderTopping
import json
from rest_framework.response import Response
from rest_framework import status as http_status
from .permissions import IsMyselfToRetrieveUpdateDestroy 

# Create your views here.

class UserVieSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = serializers.UserSerializer
    permission_classes = (AllowAny,)

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
        # return self.queryset.filter(user=self.request.GET.get('id'))
        return self.queryset.filter(user=self.request.user.id)


class OrderCoffeeVieSet(viewsets.ModelViewSet):
    queryset = OrderCoffee.objects.all()    
    serializer_class = serializers.OrderCoffeeSerializer
    permission_classes = (AllowAny,)

    def get_queryset(self):
        # JSONの配列をpythonの配列へ        
        carts_list = list(self.request.GET.values())
        # 一つ一つJSONから辞書型に変換   
        carts_id_list = [ json.loads(c)['id'] for c in carts_list ]                
        # carts__inで検索             
        return self.queryset.filter(carts__in=carts_id_list)
    
    def destroy(self, request, *args, **kwargs):                           
        instance = self.queryset.filter(id=self.request.data["id"])
        instance.delete()
        return Response(status=http_status.HTTP_204_NO_CONTENT)

class OrderersVieSet(viewsets.ModelViewSet):
    queryset = Orderers.objects.all()
    serializer_class = serializers.OrderersSerializer
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user.id)


class OrderToppingVieSet(viewsets.ModelViewSet):
    queryset = OrderTopping.objects.all()
    serializer_class = serializers.OrderToppingSerializer

    def get_queryset(self):
        # JSONの配列をpythonの配列へ        
        carts_list = list(self.request.GET.values())
        # 一つ一つJSONから辞書型に変換   
        carts_id_list = [ json.loads(c)['id'] for c in carts_list ]                
        # carts__inで検索             
        return self.queryset.filter(cart__in=carts_id_list)

class OrderToppingListViewSet(viewsets.ModelViewSet):
    queryset = OrderTopping.objects.all()
    serializer_class = serializers.OrderToppingListSerializer    