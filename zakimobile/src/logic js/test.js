const verifyToken = async () => {
    const token = tokenInput.value; // Supposons que tokenInput est une ref() contenant le token saisi
    const savedEmail = localStorage.getItem('resetEmail'); // Récupérer l'email stocké

    if (!token || !savedEmail) {
        errorMessage.value = "Token ou email manquant";
        return;
    }

    try {
        const response = await axios.post('http://127.0.0.1:8000/api/password/verify-token/', {
            email: savedEmail,
            token: token
        });

        if (response.data.valid) {
            // Token valide, rediriger vers la page de réinitialisation du mot de passe
            router.push('/new-password');
        } else {
            errorMessage.value = "Token invalide ou expiré";
        }
    } catch (error) {
        console.error('Erreur lors de la vérification du token:', error.response?.data);
        errorMessage.value = error.response?.data.error || "Une erreur est survenue";
    }
};

setup() {
    const router = useRouter();
    const newModal = ref(false);
    const errorMessage = ref('');
    const token = ref('');
    const newPassword = ref('');
    const confirmPassword = ref('');
    const step = ref(1);

    // Récupérer l'email depuis le localStorage
    const savedEmail = localStorage.getItem('resetEmail');

    const voirStorage = () => {
        console.log(savedEmail)
    }

    const verifyToken = async () => {
      if (!token.value) {
        newModal.value = true;
        errorMessage.value = "Veuillez entrer le token reçu par email";
        return;
      }
      
      try {
        const response = await axios.post('http://localhost:8000/account/password/verify-token/', {
          email: savedEmail,
          token: token.value
        });

        if (response.data.valid) {
          step.value = 2; // Passer à l'étape 2 si le token est valide
        } else {
          newModal.value = true;
          errorMessage.value = "Token invalide ou expiré";
        }
      } catch (error) {
        newModal.value = true;
        errorMessage.value = error.response?.data.error || "Une erreur est survenue";
      }
    };

    const resetPassword = async () => {
      if (newPassword.value !== confirmPassword.value) {
        newModal.value = true;
        errorMessage.value = "Les mots de passe ne correspondent pas";
        return;
      }

      try {
        await axios.post('http://localhost:8000/account/password/reset-confirm/', {
          email: savedEmail,
          token: token.value,
          new_password: newPassword.value
        });
        
        // Nettoyer le localStorage après réussite
        localStorage.removeItem('resetEmail');
        router.push('/login');
      } catch (error) {
        newModal.value = true;
        errorMessage.value = error.response?.data.error || "Erreur lors de la réinitialisation";
      }
    };

    return {
      router,
      newModal,
      errorMessage,
      token,
      newPassword,
      confirmPassword,
      step,
      verifyToken,
      resetPassword,
      alertCircleOutline,
      closeCircleOutline
    };
  },