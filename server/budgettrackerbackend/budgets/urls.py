from django.urls import include, path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'categories', views.CategoryViewSet)


urlpatterns = [
    path('', views.index, name='index'),
    path('', include(router.urls)),
]