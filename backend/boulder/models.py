from django.db import models

class Boulder(models.Model):
    name = models.CharField()
    grade = models.CharField()
    crag = models.CharField()
    ascents = models.CharField()

    def __str__(self):
        return f'{self.name} {self.grade} {self.crag}'

