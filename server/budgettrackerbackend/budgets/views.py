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
    @action(methods=['post'], detail=False)
    def create_category(self, request, pk=None):
        category_dict = request.data
        new_category = Category(description=category_dict['description'])
        new_category.save()
        return Response({'status': 'created category'})
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
        start_date = '0001-01-01'
        end_date = '3100-01-01'
        if 'start_date' in request.query_params:
            start_date = request.query_params['start_date']
        if 'end_date' in request.query_params:
            end_date = request.query_params['end_date']
        print(start_date)
        transactions = Transaction.objects.filter(user=request_user, date__range=[start_date, end_date]).values()
        return Response(transactions)
    
    #transactions for user within specific time frame
    
    @action(methods=['post'], detail=False)
    def create_transaction(self, request, pk=None):
        transaction_dict = request.data
        new_transaction = Transaction(description=transaction_dict['description'], 
                    date=transaction_dict['date'],
                    cost=transaction_dict['cost'],
                    category_id=transaction_dict['category'],
                    user_id=transaction_dict['user'])
        new_transaction.save()
        return Response({'status': 'created transaction'})
    #edit transaction by id
    #delete a transaction

    @action(methods=['delete'], detail=True)
    def delete_transaction(self, request, pk=None):
        transaction = self.get_object()
        transaction.delete()
        return Response({'status': 'transaction deleted'})

    
#income per user