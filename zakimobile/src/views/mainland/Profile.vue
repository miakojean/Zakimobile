<template>
    <ionPage>
      <headerLayout2 @click="() => {router.push('/settings')}" />
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
            <i class="ri-logout-box-line" @click="voirInformation"></i>
            <p>Déconnexion</p>
          </div>
        </div>
      </ionContent>
    </ionPage>
</template>
    
<script>
import { IonPage, IonContent, IonHeader, IonList } from '@ionic/vue';
import { defineComponent, ref, onMounted } from 'vue';
import headerLayout2 from '../../components/tools/headerLayout2.vue';
import itemLabel from '../../tools/itemLabel.vue';
import { useRouter } from 'vue-router';
import itemLabel2 from '../../tools/itemLabel2.vue';
import { useUserStore } from '../../_services/authStore.js';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import axios from 'axios';


export default defineComponent({
  components: {
    IonPage,
    IonContent,
    IonHeader, itemLabel, IonList, headerLayout2, itemLabel2,
  },

  setup() {
    const router = useRouter();
    const userStore = useUserStore();
    const editedFields = ref({});
    const showSaveButton = ref(false);
    const isSaving = ref(false);
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
    // Utilisez storeToRefs pour conserver la réactivité
    const { state } = storeToRefs(userStore);
    
    // Chargez les données au montage du composant
    onMounted(async () => {
      if (!state.value.user.username) { // Si les données ne sont pas déjà chargées
        await userStore.fetchUser();
      }
    });

    // Accès réactif aux données
    const user = computed(() => state.value.user);
    const profile = computed(() => state.value.profile);

    const logout = () => {
      userStore.logout();
      router.push('/signin');
    };

    const voirInformation = () => {
      console.log('User:', user.value);
      console.log('Profile:', profile.value);
    };

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

    return {
      router, user, profile, logout, voirInformation, 
      editableFields, getFieldValue, handleEditStart, updateField,
      saveChanges, isSaving, showSaveButton, editedFields,
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