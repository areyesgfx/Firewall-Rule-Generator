# Generated by Django 5.0.4 on 2024-04-20 18:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_threatsource_delete_rule'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='threatsource',
            name='description',
        ),
    ]