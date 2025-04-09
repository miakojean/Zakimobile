import os
import django

# Initialiser Django si ce script est en dehors du projet
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'zakibackend.settings')
django.setup()

from django.core.mail import send_mail
from django.conf import settings

def test_envoi_email():
    sujet = "Test d'envoi d'email"
    message = "Ceci est un email de test envoyé depuis Django."
    expediteur = settings.EMAIL_HOST_USER  # Remplace si besoin
    destinataires = ['sinistre12@gmail.com']  # Mets ton email pour tester

    try:
        send_mail(sujet, message, expediteur, destinataires, fail_silently=False)
        print("✅ Email envoyé avec succès !")
    except Exception as e:
        print(f"❌ Erreur lors de l'envoi de l'email : {e}")

if __name__ == "__main__":
    test_envoi_email()
