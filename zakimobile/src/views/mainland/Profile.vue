<template>
    <ionPage>
      <ionContent>
        <div class="main__container profile__container">
          <div class="profile__pic">
            <h3>
              Mon compte
            </h3> 
            <div class="profile__pictures">
              <img 
                :src="'http://127.0.0.1:8000/account' + profile.profile_picture" 
                alt="Profile picture"
                class="profile-image"
              >
            </div>
            <span>Changer ma photo</span>
          </div>
          <ion-list :inset="true" lines="full" class="list__info">
            <itemLabel 
              v-for="field in editableFields"
              :key="field.name"
              :label="field.label"
              :valeur="getFieldValue(field)"
              :placeholder="field.placeholder"
              :type="field.type"
              @update:valeur="(val) => updateField(field, val)"
              @edit-start="handleEditStart"
              @validate="saveChanges"
            />
          </ion-list>
          <div class="logout" @click="logout">
            <i class="ri-logout-box-line"></i>
            <p>Déconnexion</p>
          </div>
        </div>
      </ionContent> 
    </ionPage>
</template>
    
<script>
import { IonPage, IonContent, IonHeader, IonList } from '@ionic/vue';
import { defineComponent, ref, onMounted } from 'vue';
import headerLayout2 from '../../components/tools/headerLayout.vue';
import itemLabel from '../../tools/itemLabel.vue';
import itemList from '../../tools/itemLabel2.vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
  
export default defineComponent({
  components: {
    IonPage, IonContent, IonHeader, itemLabel, IonList, itemList, headerLayout2,
  },

  setup() {
    const router = useRouter();
    const user = ref({ username: '', first_name: '', last_name: '',  email: '',});
    const profile = ref ({ gender:'', phone_number:'', address: '', birthday:'', commune:'',});
    const showSaveButton = ref(false);
    const isSaving = ref(false);
    const editedFields = ref({});
    const errorMessage = ref('');
    const isLoading = ref(true);
    const editableFields = [
      { name: 'username', label: 'Nom d\'utilisateur', path: 'user' },
      { name: 'first_name', label: 'Prénom', path: 'user' },
      { name: 'last_name', label: 'Nom', path: 'user' },
      { name: 'email', label: 'Email', path: 'user' },
      { name: 'birthday', label: 'Date de naissance', type: 'date', placeholder: 'AAAA/MM/JJ', path: 'profile' },
      { name: 'commune', label: 'Commune', path: 'profile' },
      { name: 'address', label: 'Adresse', path: 'profile' },
      { name: 'phone_number', label: 'N° de téléphone', path: 'profile' },
      { name: 'gender', label: 'Genre',type:'gender', path: 'profile' },
    ];

    const getFieldValue = (field) => {
      return field.path === 'user' 
        ? user.value[field.name] || 'Complétez vos informations'
        : profile.value[field.name] || 'Complétez vos informations';
    };

    const handleEditStart = () => {
      showSaveButton.value = true;
    };

    const updateField = (field, value) => {
      editedFields.value[field.name] = {
        value,
        path: field.path
      };
    };
    // Function to fetch user data
    const fetchUserData = async () => {
      try {
        isLoading.value = true; // Start loading
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
          router.push('/signin'); // Redirect to login if no token
          return;
        }

        // Fetch user data from the backend
        const response = await axios.get('http://127.0.0.1:8000/account/profile/', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        // Log the entire API response to debug
        console.log('API Response:', response.data);

        // Update the reactive objects with the response data
        user.value = response.data.user; // Assign user data directly
        profile.value = response.data.profile; // Assign profile data (if it exists)
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // Token is expired or invalid
          localStorage.removeItem('access_token'); // Clear the expired token
          router.push('/signin'); // Redirect to login
        } else {
          console.error('Failed to fetch user data:', error);
          errorMessage.value = 'Failed to fetch user data. Please try again.';
        }
      } finally {
        isLoading.value = false; // Stop loading
      }
    };

    const logout = async () => {
      try {
        const accessToken = localStorage.getItem('access_token');
        const refreshToken = localStorage.getItem('refresh_token');
        
        if (!accessToken || !refreshToken) {
            console.error('No tokens found');
            return;
        }

        const response = await axios.post(
          'http://127.0.0.1:8000/account/logout/',
          { refresh: refreshToken },  // Corps de la requête
          {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
          }
        );

        // Si la déconnexion réussit (statut 2xx)
        if (response.status >= 200 && response.status < 300) {
          // 1. Supprimer les tokens du localStorage
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          
          // 2. Rediriger vers la page de login/accueil
          window.location.href = '/login';  // Ou utiliser un router Vue si disponible
          // this.$router.push('/login');  // Si tu utilises Vue Router
          
          // 3. Optionnel : Afficher un message de succès
          alert('Déconnexion réussie !');
        }
      } catch (error) {
        console.error('Logout failed:', error);
        
        // Gestion des erreurs spécifiques
        if (error.response) {
            // Erreur venue du serveur (4xx, 5xx)
            if (error.response.status === 401) {
                alert('Session expirée. Veuillez vous reconnecter.');
            } else {
                alert(`Erreur serveur: ${error.response.status}`);
            }
        } else {
            alert('Erreur réseau ou serveur indisponible');
        }
        
        // Force la suppression des tokens même en cas d'échec
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
      }
    };

    // Call the function to fetch user data when the component is mounted
    onMounted(() => {
      fetchUserData();
    });

    const saveChanges = async () => {
      isSaving.value = true;
      try {
        const accessToken = localStorage.getItem('access_token');

        if (Object.keys(editedFields.value).length === 0) {
          console.log('Aucune modification à sauvegarder');
          return;
        }
        
        // Préparer les données à envoyer
        const updates = {};
        for (const [field, data] of Object.entries(editedFields.value)) {
          updates[field] = data.value;
        }

        const response = await axios.patch(
          'http://127.0.0.1:8000/account/updateprofile/',
          updates,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        // Mettre à jour le state local
        for (const [field, data] of Object.entries(editedFields.value)) {
          if (data.path === 'user') {
            user.value[field] = data.value;
          } else {
            profile.value[field] = data.value;
          }
        }

        // Réinitialiser
        editedFields.value = {};
        showSaveButton.value = false;
        
        console.log('Modifications enregistrées avec succès');
      } catch (error) {
        console.error('Erreur lors de la sauvegarde:', error);
      } finally {
        isSaving.value = false;
      }
    };

    // Return the reactive objects and function (if needed in the template)
    return {
      user,
      profile,
      errorMessage,
      isLoading,
      fetchUserData,
      router, logout,
      editableFields,
      getFieldValue,
      isSaving, showSaveButton,
      handleEditStart, updateField,
      saveChanges,
      editedFields,
    };
  },
});
</script>
    
<style scoped>
  .center__flex{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  
  .profile__container{
    gap: 0.5rem;
    height: auto;
  }
  
  i{
    font-size: 1rem;
  }
  
  p{
    font-size: 1rem;
  }
  
  .main__header{
    display:flex;
    justify-content: space-between;
    width: 100%;
    padding: 1rem;
  }
  
  .list__info{
    width: 100%;
  }
  
  .main__header .done{
    padding: 0.3rem;
    background: #67d89a;
    border-radius: 1.5rem;
    color: white;
  }
  
  .profile__pic{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  
  .profile__pictures{
    width:100%;
    background:none;
    padding: 3.8rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
  }
  
  .profile__pictures i {
    font-size: 2.5rem;
    color: #6d6d6d;
  }
  
  .profile__pic h3 {
    text-align: left;
  }
  
  .profile__pic span {
    color: #058C42;
  }
  
  .profile__info{
    width: 100%;
  }
  
  .logout{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    width: 100%;
  }
  
  .logout i{
    color :#058C42;
    font-size: 1.5rem;
  }
</style>