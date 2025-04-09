from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from .models import Profile
from django.core.validators import validate_image_file_extension

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

class ProfileSerializer(serializers.ModelSerializer):
    profile_picture = serializers.ImageField(
        max_length=None,
        allow_empty_file=False,
        use_url=True,
        required=False,
        validators=[validate_image_file_extension]
    )
    
    class Meta:
        model = Profile
        fields = [
            'id',
            'gender', 
            'birthday',
            'phone_number',
            'address',
            'commune',
            'profile_picture'
        ]
        extra_kwargs = {
            'phone_number': {'required': False},
            'address': {'required': False},
            'commune': {'required': False}
        }

    def validate_profile_picture(self, value):
        # Validation de la taille de l'image (5MB max)
        max_size = 5 * 1024 * 1024
        if value.size > max_size:
            raise serializers.ValidationError("La taille de l'image ne doit pas dépasser 5MB")
        return value

    def update(self, instance, validated_data):
        # Gestion spécifique pour la mise à jour
        instance.gender = validated_data.get('gender', instance.gender)
        instance.birthday = validated_data.get('birthday', instance.birthday)
        instance.phone_number = validated_data.get('phone_number', instance.phone_number)
        instance.address = validated_data.get('address', instance.address)
        instance.commune = validated_data.get('commune', instance.commune)
        
        # Gestion spécifique de l'image
        if 'profile_picture' in validated_data:
            instance.profile_picture = validated_data['profile_picture']
        
        instance.save()
        return instance