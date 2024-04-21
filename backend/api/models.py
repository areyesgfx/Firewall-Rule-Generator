from django.db import models
from django.contrib.auth.models import User

class ThreatSource(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=15, null=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='threatsources')

    def __str__(self):
        return self.name
