from django.contrib import admin
from .models import Category, Product, Order, OrderProduct

# Enregistrer le modèle Category
admin.site.register(Category)

# Enregistrer le modèle Product
admin.site.register(Product)

# Enregistrer le modèle OrderProduct
class OrderProductAdmin(admin.TabularInline):
    model = OrderProduct
    extra = 1
    readonly_fields = ('prix',)  # Le prix est en lecture seule

class OrderAdmin(admin.ModelAdmin):
    inlines = [OrderProductAdmin]
    list_display = ('user', 'status', 'date_commande', 'total_price')  # Ajout du prix total
    list_filter = ('status',)
    
    def total_price(self, obj):
        return sum(order_product.prix for order_product in obj.order_products.all())
    total_price.short_description = 'Prix total'

# Enregistrer le modèle Order avec la classe d'admin personnalisée
admin.site.register(Order, OrderAdmin)
