from django.db import models

# Create your models here.
class User(models.Model):
    name = models.CharField(max_length=255)

class Income(models.Model):
    date = models.DateField()
    description = models.CharField(max_length=255)
    income = models.FloatField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)


class Category(models.Model):
    description = models.CharField(max_length=255)
    is_recurring = models.BooleanField(default=False)

class Transaction(models.Model):
    description = models.CharField(max_length=255)
    date = models.DateField()
    cost = models.FloatField()
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    #split_with?

class RecurringExpense(models.Model):
    description = models.CharField(max_length=255)
    cost = models.FloatField()
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)