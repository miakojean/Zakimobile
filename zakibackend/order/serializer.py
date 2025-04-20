from rest_framework import serializers
from .models import Order, OrderItem, Product, Category

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'price']  # Inclure les champs nécessaires


class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)  # Utilisez le sérialiseur Product
    product_id = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all(),
        source='product',
        write_only=True
    )

    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'product_id', 'quantity', 'price_at_purchase', 'subtotal']
        read_only_fields = ['price_at_purchase', 'subtotal']

class OrderSerializer(serializers.ModelSerializer):
    order_products = OrderItemSerializer(many=True, source='items')  # Utilisez 'source' pour mapper le champ
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Order
        fields = ['id', 'user', 'status', 'total', 'created_at', 'updated_at', 'order_products']
        read_only_fields = ['status', 'total', 'created_at', 'updated_at']

    def create(self, validated_data):
        # Récupère les articles ou une liste vide si non fournis
        items_data = validated_data.pop('items', [])  
        # Crée la commande avec l'utilisateur automatique
        order = Order.objects.create(**validated_data)  
        
        # Crée les articles associés
        for item_data in items_data:
            OrderItem.objects.create(order=order, **item_data)
        
        order.calculate_total()  # Calcule le total
        return order