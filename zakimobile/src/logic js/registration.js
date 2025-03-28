import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default function useSignup() {
    const router = useRouter();
    const newModal = ref(false);
    
    // Champs du formulaire
    const first_name = ref('');
    const last_name = ref('');
    const username = ref('');
    const email = ref('');
    const password = ref('');
    const password2 = ref('');
    
    // Gestion des erreurs
    const errorMessage = ref('');
    const frenchMessage = ref('');

    // Ouvrir la modale
    const openNewModal = () => {
        newModal.value = true;
    };

    // Fonction d'inscription
    const signup = async () => {
        if (!first_name.value || !last_name.value || !username.value || !email.value || !password.value || !password2.value) {
            newModal.value = true;
            errorMessage.value = 'Remplissez tous les champs';
            return;
        }
        try {
            const response = await axios.post('http://127.0.0.1:8000/account/register/', {
                username: username.value,
                email: email.value,
                password: password.value,
                password2: password2.value,
                first_name: first_name.value,
                last_name: last_name.value
            });

            console.log('Registration successful:', response.data);
            router.push('/signin');
        } catch (error) {
            console.error('Registration error:', error.response?.data);
            frenchMessage.value = error.response?.data || "Erreur inconnue";
        }
    };

    return {
        first_name, last_name, username, email, password, password2,
        errorMessage, frenchMessage, newModal, openNewModal, signup
    };
}
