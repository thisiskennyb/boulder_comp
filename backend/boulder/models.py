from django.db import models

class Boulder(models.Model):
    name = models.CharField()
    grade = models.CharField()
    crag = models.CharField()

