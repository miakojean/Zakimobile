from django.db import models
from django.core.validators import RegexValidator
from django.contrib.auth.models import User
# Create your models here.

class Profile(models.Model):
    # Gender choices
    GENDER_CHOICES = [
        ('Homme', 'Homme'),
        ('Femme', 'Femme'),
    ]
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES, blank=True, null=True)
    birthday = models.DateField(blank=True, null=True)
    phone_regex = RegexValidator(
        regex=r'^\+?1?\d{9,15}$',
        message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed."
    )
    phone_number = models.CharField(validators=[phone_regex], max_length=17, blank=True, null=True)
    address = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return f"{self.user.username}'s Profile"
