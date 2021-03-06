# Generated by Django 3.2.8 on 2021-10-20 06:11

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import newapp.models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('email', models.EmailField(max_length=255, unique=True)),
                ('name', models.CharField(max_length=255)),
                ('is_active', models.BooleanField(default=True)),
                ('is_staff', models.BooleanField(default=False)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Coffee',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('coffee_name', models.CharField(max_length=100, verbose_name='?????????')),
                ('coffee_detail', models.CharField(max_length=200, verbose_name='????????????')),
                ('img', models.ImageField(blank=True, null=True, upload_to=newapp.models.upload_coffee_path)),
                ('coffee_priceL', models.IntegerField(verbose_name='??????L???????????????')),
                ('coffee_priceM', models.IntegerField(verbose_name='??????M???????????????')),
            ],
        ),
        migrations.CreateModel(
            name='OrderCoffee',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('item_number', models.IntegerField(verbose_name='??????')),
                ('item_size', models.CharField(max_length=6, verbose_name='???????????????')),
                ('coffee_id', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='newapp.coffee')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_table', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Topping',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('topping_name', models.CharField(max_length=100, verbose_name='??????????????????')),
                ('topping_priceL', models.IntegerField(verbose_name='???????????????L???????????????')),
                ('topping_priceM', models.IntegerField(verbose_name='???????????????M???????????????')),
            ],
        ),
        migrations.CreateModel(
            name='OrderTopping',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('cart', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='carts_table', to='newapp.ordercoffee')),
                ('topping_id', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='newapp.topping')),
            ],
        ),
        migrations.CreateModel(
            name='Orderers',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('order_name', models.CharField(max_length=30, verbose_name='????????????')),
                ('addressnumber', models.CharField(max_length=9, verbose_name='????????????')),
                ('address', models.CharField(max_length=100, verbose_name='??????')),
                ('email', models.EmailField(max_length=100, verbose_name='??????')),
                ('order_date', models.DateField(verbose_name='?????????')),
                ('order_time', models.IntegerField(verbose_name='????????????')),
                ('tel', models.CharField(max_length=14, verbose_name='????????????')),
                ('status', models.IntegerField(verbose_name='????????????')),
                ('order_coffee', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='coffee_table', to='newapp.ordercoffee')),
            ],
        ),
    ]
