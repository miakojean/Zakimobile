from django.urls import path
from .views import *

urlpatterns = [
    path('', OrderListCreateView.as_view(), name='order-list-create'),
    path('orders/', OrderCreateAPIView.as_view(), name='order-create'),
]