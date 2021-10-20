from django.db import models
import uuid

# Create your models here.

class Coffee(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    coffee_name = models.CharField('商品名', max_length=100, blank=False)
    coffee_detail = models.CharField('商品詳細', max_length=200, blank=False)
    image = models.CharField('商品画像パス', max_length=100, blank=False)
    coffee_priceL = models.IntegerField('商品Lサイズ料金', blank=False, null=False)
    coffee_priceM = models.IntegerField('商品Mサイズ料金', blank=False, null=False)

class Topping(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    topping_name = models.CharField('トッピング名', max_length=100, blank=False)    
    topping_priceL = models.IntegerField('トッピングLサイズ料金', blank=False, null=False)
    topping_priceM = models.IntegerField('トッピングMサイズ料金', blank=False, null=False)

class OrderCoffee(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)    
    item_number = models.IntegerField('数量', blank=False, null=False)
    coffee_id = models.OneToOneField(Coffee, on_delete=models.CASCADE) # parent_link=False
    item_size = models.CharField('商品サイズ', max_length=6, blank=False, null=False) #　型付けする

class Orderers(models.Model):
    order_coffee = models.ForeignKey(OrderCoffee, on_delete=models.CASCADE, related_name="users_table")
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    order_name = models.CharField('注文者名', max_length=30, blank=False)
    addressnumber = models.CharField('郵便番号', max_length=9, blank=False) #　型付けする
    address = models.CharField('住所', max_length=100, blank=False)
    email = models.EmailField('住所', max_length=100, blank=False)
    order_date = models.DateField('配達日', blank=False, null=False)
    order_time = models.IntegerField('配達時間', blank=False, null=False)
    tel = models.CharField('電話番号', max_length=14, blank=False) #　型付けする
    status = models.IntegerField('注文状況', blank=False, null=False)

class OrderTopping(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    cart = models.ForeignKey(OrderCoffee, on_delete=models.CASCADE, related_name="carts_table")
    topping_id = models.OneToOneField(Topping, on_delete=models.CASCADE) # parent_link=False
    