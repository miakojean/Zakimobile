from django.contrib import admin

# Register your models here.
from .models import Profile

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'gender', 'birthday', 'phone_number', 'address')
    search_fields = ('user__username', 'phone_number', 'address')
    list_filter = ('gender',)
