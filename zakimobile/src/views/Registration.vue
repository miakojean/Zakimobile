<template>
    <IonPage>
      <IonContent>
        <div class="main__container">
          <h2>Inscription</h2>
          <InputFamily placeholder="Nom de famille" type="text" v-model="first_name" />
          <InputFamily placeholder="Prénoms" type="text" v-model="last_name" />
          <InputFamily placeholder="Username" type="text" v-model="username" />
          <InputFamily placeholder="Email" type="email" v-model="email" />
          <InputFamily placeholder="Mot de passe" type="password" v-model="password" />
          <InputFamily placeholder="Confirmer mot de passe" type="password" v-model="password2" />
          <MainButton label="Inscription" @click="signup" />
          
          <div class="divider-container">
            <div class="divider"></div>
            <span class="divider-text">ou</span>
            <div class="divider"></div>
          </div>
          <p @click="() => router.push('/signin')"> Je me connecte <span>ici</span></p>
          <!-- Bouton pour déclencher une nouvelle modale -->
          <mainButton label="Ouvrir Modale" @click="openNewModal" />
        </div>
        <!-- Nouvelle modale -->
        <ion-modal :is-open="newModal">
        <ion-content class="ion-padding">
            <h2>Nouvelle modale déclenchée</h2>
            <p>Ceci est une autre modale pour test.</p>
            <mainButton label="Fermer" @click="newModal = false" />
        </ion-content>
        </ion-modal>
      </IonContent>
      <FooterLayout />
    </IonPage>
</template>
  
<script>
  import { IonContent, IonPage, IonModal } from '@ionic/vue';
  import { defineComponent, ref } from 'vue';
  import InputFamily from '../tools/inputfamily.vue';
  import MainButton from '../button/mainButton.vue';
  import FooterLayout from '../components/tools/footerLayout.vue';
  import { useRouter } from 'vue-router';
  import axios from 'axios';
  
  export default defineComponent({
    components: {
      IonPage, IonContent, IonModal,
      InputFamily, MainButton, FooterLayout,
      IonModal,
    },
  
    setup() {
        const router = useRouter();
        const newModal = ref(false); // Nouvelle modale
        // Changed to match API field names
        const first_name = ref('');
        const last_name = ref('');
        const username = ref('');
        const email = ref('');
        const password = ref('');
        const password2 = ref('')
        const errorMessage = ref('');

        const openNewModal = () => {
            newModal.value = true;
        };
  
        const signup = async () => {
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
                errorMessage.value = error.response?.data?.detail || 
                                    Object.values(error.response?.data || {})[0]?.[0] || 
                                    'Erreur lors de l\'inscription';
            }
        };
        return { router, first_name, 
          last_name, username, email, password, 
          password2, signup, errorMessage, newModal,
          openNewModal
        };
    }
  });
</script>
  
<style>
  .divider-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 90%;
    gap: 10px;
  }
  
  .divider {
    flex: 1;
    height: 1px;
    background-color: #058C42;
  }
  
  .divider-text {
    font-size: 1rem;
    font-weight: 400;
    color: #333;
  }
  
  p span {
    font-size: 1rem;
    font-weight: 700;
    color: #058C42;
  }
</style>
  