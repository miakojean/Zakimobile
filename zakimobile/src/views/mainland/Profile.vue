<template>
    <ionPage>
      <ionContent>
        <div class="main__container profile__container">
          <div class="profile__pic">
            <h3>Mon compte</h3> 
            <div class="profile__pictures" @click="triggerFileInput">
              <img 
                :src="profile.profile_picture ? 'http://127.0.0.1:8000/account' + profile.profile_picture : defaultProfilePic" 
                alt="Profile picture"
                class="profile-image"
              >
              <input 
                type="file" 
                ref="fileInput"
                accept="image/*"
                @change="handleFileChange"
                style="display: none"
              >
            </div>
            <span @click="triggerFileInput">Changer ma photo</span>
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
          <div class="logout" @click="handleLogout">
            <i class="ri-logout-box-line"></i>
            <p>Déconnexion</p>
          </div>
        </div>
      </ionContent> 
    </ionPage>
</template>
    
<script>
import { IonPage, IonContent, IonHeader, IonList } from '@ionic/vue';
import { camera } from 'ionicons/icons';
import { defineComponent, ref, onMounted } from 'vue';
import headerLayout2 from '../../components/tools/headerLayout.vue';
import itemLabel from '../../tools/itemLabel.vue';
import itemList from '../../tools/itemLabel2.vue';
import { useRouter } from 'vue-router';
import {logout} from '../../_services/authServices.js'
import { fetchUserProfile } from '../../_services/userInformation.js';
import axios from 'axios';
  
export default defineComponent({
  components: {
    IonPage, IonContent, IonHeader, itemLabel, IonList, itemList, headerLayout2, camera
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
    const fileInput = ref(null);
    const defaultProfilePic = ref('https://ionicframework.com/docs/img/demos/avatar.svg');
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

    const triggerFileInput = () => {
      fileInput.value?.click();
    };

    const handleFileChange = async (event) => {
      console.log("Fichier sélectionné", event.target.files);
      const file = event.target.files[0];
      if (!file) return;

      try {
        const formData = new FormData();
        formData.append('profile_picture', file);

        const accessToken = localStorage.getItem('access_token');
        const response = await axios.patch(
          'http://127.0.0.1:8000/account/updateprofile/',
          formData,
          {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'multipart/form-data'
            }
          }
        );

        // Mettre à jour l'image affichée
        if (response.data.profile_picture) {
          profile.value.profile_picture = response.data.profile_picture;
        }
      } catch (error) {
        console.error('Erreur lors du changement de photo:', error);
      }
    };
    // Function to fetch user data
    const fetchUserData = async () => {
      try {
        isLoading.value = true;
        errorMessage.value = '';

        // Utilisation du service userInformation
        const result = await fetchUserProfile();

        if (result.success) {
          user.value = result.user;
          profile.value = result.profile || {}; // Garantit un objet même si null
          
          // Debug
          console.log('User data loaded:', {
            user: user.value,
            profile: profile.value
          });
        } else {
          errorMessage.value = result.error;
          
          // Gestion spécifique des erreurs d'authentification
          if (result.shouldLogout) {
            localStorage.removeItem('access_token');
            router.push('/signin');
          }
        }
      } catch (error) {
        console.error('Unexpected error:', error);
        errorMessage.value = 'Une erreur inattendue est survenue';
      } finally {
        isLoading.value = false;
      }
    };

    // Dans ton composant
    const handleLogout = async () => {
      const result = await logout();
      
      if (result.success) {
        // Redirection
        router.push('/login');
        
        // Optionnel : Message toast
        showToast({
          message: result.message,
          color: 'success'
        });
      } else {
        showToast({
          message: result.error || 'Erreur lors de la déconnexion',
          color: 'danger'
        });
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
      router, handleLogout,
      editableFields,
      getFieldValue,
      isSaving, showSaveButton,
      handleEditStart, updateField,
      saveChanges,
      editedFields,
      triggerFileInput,
      handleFileChange,
      camera,
      defaultProfilePic,
      fileInput,
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