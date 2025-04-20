from rest_framework import serializers
from .models import Order, OrderItem, Product, Category

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'price']  # Inclure les champs nécessaires


class OrderItemSerializer(serializers.ModelSerializer):
    # Lecture : affiche toutes les infos du produit
    product = ProductSerializer(read_only=True)
    
    # Écriture : accepte soit l'ID soit le nom du produit
    product_id = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all(),
        source='product',
        required=False,
        write_only=True
    )
    product_name = serializers.SlugRelatedField(
        slug_field='name',
        queryset=Product.objects.all(),
        source='product',
        required=False,
        write_only=True
    )

    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'product_id', 'product_name', 'quantity', 'price_at_purchase', 'subtotal']
        read_only_fields = ['product', 'price_at_purchase', 'subtotal']

    def validate(self, data):
        # Vérifie qu'au moins un identifiant est fourni
        if not any(field in data for field in ['product', 'product_id', 'product_name']):
            raise serializers.ValidationError("Vous devez spécifier soit product_id, soit product_name")
        return data

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