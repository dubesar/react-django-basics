from django.db import models

# Create your models here.


class todo(models.Model):
    task = models.TextField()
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['task', 'created']
