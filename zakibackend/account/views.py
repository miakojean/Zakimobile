from django.shortcuts import HttpResponse, render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializer import UserCreateSerializer, UserSerializer, ProfileSerializer
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from .models import Profile
from django.contrib.auth.models import User
from django.core.mail import send_mail
from django.urls import reverse
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
        if serializer.is_valid():
            user = serializer.save()
            return Response({'message': 'Utilisateur créé avec succès'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserLoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(request, username=username, password=password)

        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            })
        else:
            return Response({'error': 'Identifiants invalides'}, status=status.HTTP_401_UNAUTHORIZED)

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
            # Ne pas révéler si l'utilisateur existe ou non pour des raisons de sécurité
            return Response({'message': 'Un lien de réinitialisation a été envoyé à votre adresse e-mail si un compte existe.'}, status=status.HTTP_200_OK)

        # Supprimer les tokens de réinitialisation précédents pour cet utilisateur
        PasswordResetToken.objects.filter(user=user).delete()

        # Générer un nouveau token
        token = PasswordResetToken.objects.create(
            user=user,
            expires_at=timezone.now() + datetime.timedelta(hours=1)  # Expiration dans 1 heure
        )

        # Créer le lien de réinitialisation
        reset_link = request.build_absolute_uri(reverse('password_reset_confirm', args=[str(token.token)]))

        # Envoyer l'e-mail
        subject = 'Réinitialisation de votre mot de passe'
        message = f'Cliquez sur le lien suivant pour réinitialiser votre mot de passe : {reset_link}'
        from_email = settings.DEFAULT_FROM_EMAIL
        recipient_list = [email]

        send_mail(subject, message, from_email, recipient_list, fail_silently=True)

        return Response({'message': 'Un lien de réinitialisation a été envoyé à votre adresse e-mail si un compte existe.'}, status=status.HTTP_200_OK)
    
class PasswordResetConfirmView(APIView):
    def post(self, request, token):
        new_password = request.data.get('new_password')
        confirm_password = request.data.get('confirm_password')

        if not new_password or not confirm_password:
            return Response({'error': 'Veuillez fournir un nouveau mot de passe et le confirmer.'}, status=status.HTTP_400_BAD_REQUEST)

        if new_password != confirm_password:
            return Response({'error': 'Les nouveaux mots de passe ne correspondent pas.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            password_reset_token = PasswordResetToken.objects.get(token=token)
        except PasswordResetToken.DoesNotExist:
            return Response({'error': 'Le lien de réinitialisation est invalide.'}, status=status.HTTP_400_BAD_REQUEST)

        if not password_reset_token.is_valid():
            return Response({'error': 'Le lien de réinitialisation a expiré.'}, status=status.HTTP_400_BAD_REQUEST)

        user = password_reset_token.user
        user.set_password(new_password)
        user.save()

        # Supprimer le token après utilisation
        password_reset_token.delete()

        return Response({'message': 'Votre mot de passe a été réinitialisé avec succès.'}, status=status.HTTP_200_OK)