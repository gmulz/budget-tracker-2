from django.urls import include, path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'categories', views.CategoryViewSet)
router.register(r'users', views.UserViewSet)
router.register(r'transactions', views.TransactionViewSet)
router.register(r'recurring_expenses', views.RecurringExpenseViewSet)


urlpatterns = [
    path('', views.index, name='index'),
    path('', include(router.urls)),
]