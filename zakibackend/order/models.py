from django.contrib.auth.models import User  # à importer
from django.db import models

class Category(models.Model):
    nom = models.CharField(max_length = 100, blank=True,)

    def __str__(self):
        
        return self.nom

class Product(models.Model):
    nom = models.CharField(max_length=100)
    prix = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self):

        return self.nom

class Order(models.Model):

    STATUS_CHOICES = [
    ('PDG', 'Pending'),
    ('DLD', 'Delivered'),
    ('CLD', 'Canceled'),
]


    user = models.ForeignKey(User, on_delete=models.CASCADE)  
    date_commande = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=3, choices=STATUS_CHOICES, default='PDG')

    def __str__(self):
        return f"{self.user.username} - {self.get_status_display()}"


class OrderProduct(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='order_products')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    prix = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)

    def save(self, *args, **kwargs):
        # Mettre à jour le prix en fonction du produit sélectionné
        self.prix = self.product.prix * self.quantity  # Calcul du prix total pour la quantité de produits
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.quantity} x {self.product.nom} pour la commande {self.order.id} - Prix: {self.prix}"

