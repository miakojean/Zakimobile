from rest_framework import serializers
from .models import Order, OrderItem, Product

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
    items = OrderItemSerializer(many=True, required=False)
    user = serializers.StringRelatedField(read_only=True)
    status = serializers.CharField(read_only=True)  # Le statut n'est pas modifiable directement

    class Meta:
        model = Order
        fields = ['id', 'user', 'status', 'total', 'created_at', 'updated_at', 'items']
        read_only_fields = ['total', 'created_at', 'updated_at']

    def create(self, validated_data):
        items_data = validated_data.pop('items', [])
        order = Order.objects.create(**validated_data)
        
        for item_data in items_data:
            OrderItem.objects.create(order=order, **item_data)
        
        order.calculate_total()
        return order