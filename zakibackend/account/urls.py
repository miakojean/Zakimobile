from django.urls import path
from .views import index, UserRegistrationView, UserLoginView, UserLogoutView, is_logged

urlpatterns = [
    path('',view=index, name='index' ),
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('login/', UserLoginView.as_view(), name='login'),
    path('logout/', UserLogoutView.as_view(), name='logout'),
    path('voir/', view=is_logged, name='en_ligne')
]