from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class BookMarks(models.Model):
    class Meta:
        managed = True
        db_table = 'table_name'

        
    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.IntegerField()
    rating = models.IntegerField()
    url = models.URLField(max_length=1000)
    customer = models.ForeignKey(User, on_delete=models.CASCADE, related_name="hotels")

    def __str__(self):
        return self.name