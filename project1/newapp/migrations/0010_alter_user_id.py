# Generated by Django 3.2.8 on 2021-10-21 07:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('newapp', '0009_auto_20211021_1620'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='id',
            field=models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
    ]