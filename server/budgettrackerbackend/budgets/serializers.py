from rest_framework import serializers

from .models import User, Income, Category, Transaction, RecurringExpense

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['name', 'id']

class IncomeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Income
        fields = ['date', 'description', 'income', 'user']

class CategorySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Category
        fields = ['description', 'id', 'is_recurring']

class TransactionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Transaction
        fields = ['description', 'date', 'cost', 'category', 'user', 'id']

class RecurringExpenseSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = RecurringExpense
        fields = ['description', 'cost', 'category', 'user', 'id']