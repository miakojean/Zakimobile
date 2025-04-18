from rest_framework import serializers
from .models import Category, Product, Order, OrderProduct

# Serializer pour Category
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'nom']  # Choisir les champs que tu veux exposer via l'API

# Serializer pour Product
class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer()  # Sérialiser également la catégorie

    class Meta:
        model = Product
        fields = ['id', 'nom', 'prix', 'category']

# Serializer pour OrderProduct
class OrderProductSerializer(serializers.ModelSerializer):
    product = ProductSerializer()  # Sérialiser également le produit
    prix = serializers.DecimalField(max_digits=10, decimal_places=2)  # Afficher le prix total calculé

    class Meta:
        model = OrderProduct
        fields = ['id', 'order', 'product', 'quantity', 'prix']

# Serializer pour Order
class OrderSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()  # Afficher le nom d'utilisateur (ou tu peux sérialiser un UserSerializer si tu veux plus de détails)
    order_products = OrderProductSerializer(many=True)  # Sérialiser les produits associés à la commande

    total_price = serializers.SerializerMethodField()  # Méthode pour calculer le prix total

    class Meta:
        model = Order
        fields = ['id', 'user', 'date_commande', 'status', 'order_products', 'total_price']

    def get_total_price(self, obj):
        # Calculer le prix total de la commande en fonction des produits associés
        return sum(order_product.prix for order_product in obj.order_products.all())
