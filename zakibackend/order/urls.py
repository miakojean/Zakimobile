from django.urls import path
from .views import CategoryList, CategoryDetail, OrderProductList, OrderProductDetail, OrderList, OrderDetail

urlpatterns = [
    # Routes pour les catégories
    path('categories/', CategoryList.as_view(), name='category-list'),
    path('categories/<int:pk>/', CategoryDetail.as_view(), name='category-detail'),

    # Routes pour les produits
    path('products/', OrderProductList.as_view(), name='product-list'),
    path('products/<int:pk>/', OrderProductDetail.as_view(), name='product-detail'),

    # Routes pour les produits dans une commande
    path('order-products/', OrderProductList.as_view(), name='order-product-list'),
    path('order-products/<int:pk>/', OrderProductDetail.as_view(), name='order-product-detail'),

    # Routes pour les commandes
    path('orders/', OrderList.as_view(), name='order-list'),
    path('orders/<int:pk>/', OrderDetail.as_view(), name='order-detail'),

    path('orders/create/', OrderCreateView.as_view(), name='order-create'),
    # Ajoute d'autres chemins si nécessaire

]
