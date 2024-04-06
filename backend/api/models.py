from django.db import models
from django.contrib.auth.models import User

class ThreatSource(models.Model):
    name = models.CharField(max_length=100)
    url = models.URLField()
    description = models.TextField(blank=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='threatsources')

    def __str__(self):
        return self.name
    