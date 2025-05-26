from django.contrib import admin
from .models import Order, OrderItem, Product, Category


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 3  # 3 formulaires vides affichés par défaut
    readonly_fields = ['subtotal']  # Affiche le sous-total

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    inlines = [OrderItemInline]
    readonly_fields = ['total']  # Empêche la modification manuelle

admin.site.register(Product)
admin.site.register(Category)
admin.site.register(OrderItem)