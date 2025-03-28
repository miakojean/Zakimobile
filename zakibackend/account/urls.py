from django.urls import path
from .views import *

urlpatterns = [
    path('',view=index, name='index' ),
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('login/', UserLoginView.as_view(), name='login'),
    path('logout/', UserLogoutView.as_view(), name='logout'),
    path('voir/', view=is_logged, name='en_ligne'),
    path('profile/', UserProfileView.as_view(), name='profile'),
    path('password/reset/', PasswordResetRequestView.as_view(), name='password_reset_request'),
    path('password/reset/confirm/<uuid:token>/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
]