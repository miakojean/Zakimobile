from django.db import models
from django.contrib.auth.models import User  # Ou ton CustomUser
from django.core.validators import MinValueValidator

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    slug = models.SlugField(max_length=100, unique=True)  # Pour les URLs SEO

    class Meta:
        verbose_name_plural = "categories"  # Corrige l'affichage dans l'admin

    def __str__(self):
        return self.name

class Product(models.Model):
    name = models.CharField(max_length=200)
    category = models.ForeignKey(Category, related_name='products', on_delete=models.SET_NULL, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.PositiveIntegerField(default=0)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} ({self.price} FCFA)"

class Order(models.Model):
    STATUS_CHOICES = [
        ('pending', 'En attente'),
        ('paid', 'Payé'),
        ('shipped', 'Expédié'),
        ('delivered', 'Livré'),
        ('cancelled', 'Annulé'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    total = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)

    class Meta:
        ordering = ['-created_at']  # Trie les commandes du plus récent au plus ancien

    def __str__(self):
        return f"Commande #{self.id} - {self.user.username}"

    def update_total(self):
        """Calcule le total de la commande en fonction des OrderItems"""
        self.total = sum(item.subtotal() for item in self.items.all())
        self.save()

    def calculate_total(self):
        total = sum(
            item.subtotal() 
            for item in self.items.all() 
            if item.subtotal() is not None  # Filtre les valeurs None
        )
        self.total = total if total is not None else 0.00
        self.save()

class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE)
    product = models.ForeignKey('Product', on_delete=models.PROTECT)
    quantity = models.PositiveIntegerField(validators=[MinValueValidator(1)])
    price_at_purchase = models.DecimalField(
        max_digits=10, 
        decimal_places=2,
        default=0.00  # Ajoute une valeur par défaut
    )

    def subtotal(self):
        # Vérifie que les valeurs ne sont pas None avant de calculer
        if self.price_at_purchase is None or self.quantity is None:
            return 0.00
        return self.quantity * self.price_at_purchase

    def save(self, *args, **kwargs):
        # Garantit que price_at_purchase est toujours défini
        if not self.price_at_purchase or self.price_at_purchase == 0.00:
            if self.product and self.product.price:  # Vérifie que le produit et son prix existent
                self.price_at_purchase = self.product.price
            else:
                self.price_at_purchase = 0.00  # Valeur de secours
        
        super().save(*args, **kwargs)
        self.order.calculate_total()
