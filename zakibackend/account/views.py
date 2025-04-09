from django.shortcuts import HttpResponse, render
from rest_framework import status, generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializer import UserCreateSerializer, ProfileSerializer, UserSerializer
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from .models import Profile
from django.contrib.auth.models import User
from django.core.mail import send_mail
from .models import PasswordResetToken
from django.conf import settings
from django.utils import timezone
import datetime

# Create your views here.
def index(request):
    return HttpResponse('Bienvenu au pays mon fils')

def is_logged(request):
    if request.user.is_authenticated:
        # L'utilisateur est authentifié
        username = request.user.username
        return render(request, 'index.html', {'username': username})
    else:
        # L'utilisateur n'est pas authentifié
        return render(request, 'index.html')

class UserRegistrationView(APIView):
    serializer_class = UserCreateSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        
        if not serializer.is_valid():
            errors = serializer.errors
            
            # Check for specific field errors
            if 'username' in errors:
                if "This field may not be blank." in errors['username']:  # Vérifie si le champ est vide
                    return Response(
                        {'error': 'Username is required', 'details': errors['username'], 'french': 'Le nom d\'utilisateur est requis'},
                        status=status.HTTP_400_BAD_REQUEST
                    )
                elif "user with this username already exists." in errors['username']:  # Vérifie si le username existe déjà
                    return Response(
                        {'error': 'Username already taken', 'details': errors['username'], 'french': 'Ce nom d\'utilisateur est déjà pris'},
                        status=status.HTTP_400_BAD_REQUEST
                    )
                
            if 'email' in errors:
                return Response(
                    {'error': 'Invalid email', 'details': errors['email'], 'french': 'Adresse email invalide'},
                    status=status.HTTP_400_BAD_REQUEST
                )
                
            if 'password' in errors:
                return Response(
                    {'error': 'Invalid password', 'details': errors['password']},
                    status=status.HTTP_400_BAD_REQUEST
                )
                
            # Generic validation error
            return Response(
                {'error': 'Validation failed', 'details': errors},
                status=status.HTTP_400_BAD_REQUEST
            )
            
        try:
            user = serializer.save()
            return Response(
                {'message': 'Utilisateur créé avec succès'}, 
                status=status.HTTP_201_CREATED
            )
            
        except Exception as e:
            # Handle all other unexpected errors
            return Response(
                {'error': 'Server error', 'details': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class UserLoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        if not username or not password:
            return Response({'error': 'Veuillez fournir un nom d\'utilisateur et un mot de passe.'}, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(request, username=username, password=password)

        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            })
        else:
            return Response({'error': 'Nom d\'utilisateur ou mot de passe incorrect.'}, status=status.HTTP_401_UNAUTHORIZED)

class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        user_serializer = UserSerializer(user)

        try:
            profile = Profile.objects.get(user=user)
            profile_serializer = ProfileSerializer(profile)
        except Profile.DoesNotExist:
            profile_serializer = None
        return Response({
            "user": user_serializer.data,  # Correction : afficher les données de l'utilisateur
            "profile": profile_serializer.data if profile_serializer else None, # Correction : afficher les données du profil si elles existent
        }, status=status.HTTP_200_OK)

class ProfileUpdateAPIView(generics.UpdateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        # Retourne toujours le profil de l'utilisateur connecté
        return self.request.user.profile

    def patch(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', True) 
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

class UserLogoutView(APIView):
    permission_classes = [IsAuthenticated]  # Seuls les utilisateurs authentifiés peuvent se déconnecter

    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
class PasswordResetRequestView(APIView):
    def post(self, request):
        email = request.data.get('email')
        if not email:
            return Response({'error': 'L\'adresse e-mail est requise.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({'message': 'Un email a été envoyé si le compte existe.'}, status=status.HTTP_200_OK)

        # Supprimer les anciens tokens
        PasswordResetToken.objects.filter(user=user).delete()

        # Générer un nouveau token
        token = PasswordResetToken.objects.create(
            user=user,
            expires_at=timezone.now() + datetime.timedelta(hours=1)  # Expire dans 1h
        )

        # Construire le message de l'email
        subject = 'Réinitialisation de votre mot de passe'
        message = f'Votre code de réinitialisation est : {token.token}\nCopiez ce code et utilisez-le pour réinitialiser votre mot de passe.'
        from_email = settings.EMAIL_HOST_USER
        recipient_list = [email]

        send_mail(subject, message, from_email, recipient_list, fail_silently=False)

        return Response({'message': 'Un email avec le token a été envoyé.'}, status=status.HTTP_200_OK)
    
class VerifyPasswordResetTokenView(APIView):
    def post(self, request):
        email = request.data.get('email')
        token = request.data.get('token')

        if not email or not token:
            return Response({'error': 'L\'email et le token sont requis.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(email=email)
            reset_token = PasswordResetToken.objects.get(
                user=user,
                token=token,
                expires_at__gt=timezone.now()  # Vérifie que le token n'a pas expiré
            )
            return Response({'valid': True}, status=status.HTTP_200_OK)
            
        except User.DoesNotExist:
            return Response({'valid': False}, status=status.HTTP_200_OK)
        except PasswordResetToken.DoesNotExist:
            return Response({'valid': False}, status=status.HTTP_200_OK)
    
class PasswordResetConfirmView(APIView):
    def post(self, request, token):
        new_password = request.data.get('new_password')
        confirm_password = request.data.get('confirm_password')

        if not new_password or not confirm_password:
            return Response({'error': 'Veuillez fournir un nouveau mot de passe et le confirmer.'}, status=status.HTTP_400_BAD_REQUEST)

        if new_password != confirm_password:
            return Response({'error': 'Les mots de passe ne correspondent pas.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            password_reset_token = PasswordResetToken.objects.get(token=token)
        except PasswordResetToken.DoesNotExist:
            return Response({'error': 'Token invalide ❌'}, status=status.HTTP_400_BAD_REQUEST)

        # Vérifier l'expiration
        if password_reset_token.expires_at < timezone.now():
            return Response({'error': 'Token expiré ❌'}, status=status.HTTP_400_BAD_REQUEST)

        # Vérifier que le token correspond bien à un utilisateur valide
        if not password_reset_token.user.is_active:
            return Response({'error': 'Compte utilisateur inactif ou non valide ❌'}, status=status.HTTP_400_BAD_REQUEST)

        # Tout est bon, on peut modifier le mot de passe
        user = password_reset_token.user
        user.set_password(new_password)
        user.save()

        # Supprimer le token après utilisation
        password_reset_token.delete()

        return Response({'message': 'Mot de passe réinitialisé avec succès ✅'}, status=status.HTTP_200_OK)