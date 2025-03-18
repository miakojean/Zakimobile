from django.shortcuts import HttpResponse, render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializer import UserCreateSerializer, UserSerializer
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated


# Create your views here.
def index():
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
        return Response(user_serializer.data)

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