from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .serializers import CategorySerializer, UserSerializer, TransactionSerializer
from .models import Category, User, Transaction
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from django.core import serializers
# Create your views here.

def index(request):
    return HttpResponse('this is the budget app')

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all().order_by('description')
    serializer_class = CategorySerializer
    #create a category
    #delete a category

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('name')
    serializer_class = UserSerializer


class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    
    @action(methods=['get'], detail=False)
    def transactions_for_user(self, request, pk=None):
        request_user = request.query_params['user']
        transactions = Transaction.objects.filter(user=request_user).values()
        return Response(transactions)
    
    #todo create transaction by user, one at a time
    @action(methods=['post'], detail=False)
    def create_transaction(self, request, pk=None):
        transaction_obj = request.data
        new_transaction = Transaction(description=transaction_obj['description'], 
                    date=transaction_obj['date'],
                    cost=transaction_obj['cost'],
                    category_id=transaction_obj['category'],
                    user_id=transaction_obj['user'])
        new_transaction.save()
        return Response({'status': 'created transaction'})
    #edit transaction by id
    #delete a transaction
    
#income per user