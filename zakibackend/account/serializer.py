from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password

class UserCreateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, label='Confirm Password')

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'password2', 'first_name', 'last_name')
        extra_kwargs = {
            'password': {'write_only': True},
            'email': {'required': True},
            'first_name': {'required': False},
            'last_name': {'required': False},
        } 

    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError({"password": "Les mots de passe ne correspondent pas."})
        return data

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', '')
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
    
class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['username', 'email', 'first_name', 'last_name']
