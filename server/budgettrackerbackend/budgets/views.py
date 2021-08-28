from django.shortcuts import render
from django.http import HttpResponse
from .serializers import CategorySerializer
from .models import Category
from rest_framework import viewsets
# Create your views here.

def index(request):
    return HttpResponse('this is the budget app')

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all().order_by('description')
    serializer_class = CategorySerializer