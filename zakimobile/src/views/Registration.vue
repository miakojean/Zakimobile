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
        </div>
        <!-- Nouvelle modale -->
        <ion-modal 
          :is-open="newModal" 
          @didDismiss="newModal = false"
          :initial-breakpoint="0.50" 
          :breakpoints="[0, 0.25, 0.5, 0.75]"
        >
          <ion-content class="ion-padding">
            <div class="main__container modal">
              <div class="label__contain">
                <h4>Attention</h4>
                <ion-icon :icon="alertCircleOutline" class="icone"></ion-icon>
              </div>
              <p>{{ errorMessage }}</p>
              <ion-icon 
                :icon="closeCircleOutline" 
                class="icone"
                @click="newModal = false"
              >
              </ion-icon>                                     
            </div>
          </ion-content>
        </ion-modal>
      </IonContent>
      <FooterLayout />
    </IonPage>
</template>
  
<script>
  import { IonContent, IonPage, IonModal, IonIcon } from '@ionic/vue';
  import { alertCircleOutline, closeCircleOutline } from 'ionicons/icons';
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
      IonModal, IonIcon, alertCircleOutline,
      closeCircleOutline
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
        const frenchMessage = ref('')

        const openNewModal = () => {
          newModal.value = true;
        };
  
        const signup = async () => {
          if (first_name.value === '') {
            newModal.value = true;
            const messageErreur = 'Remplissez tous les champs';
            errorMessage.value = messageErreur;
            return 
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
              frenchMessage.value = error.response.data
              console.log(frenchMessage);
          }
        };
        return { router, first_name, 
          last_name, username, email, password, 
          password2, signup, errorMessage, frenchMessage, newModal,
          openNewModal, alertCircleOutline, closeCircleOutline
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

  .modal{
    height: auto;
  }

  .icone {
    font-size: 2rem;
    color: #ff4848;
  }

  h4{
    color: #ff4848;
    font-weight: 600;
  }

  .label__contain{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
  }
  
</style>
  