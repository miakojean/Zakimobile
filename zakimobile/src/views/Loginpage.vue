<template>
  <ionPage>
    <div class="main__container">
      <img
        src="../assets/zaki assets/fruit shop-rafiki.svg" alt="" key="img-0"
      /> 
      <div class="main__text">
        <h2><span class="logo">Zaki</span></h2>
      </div>
      <inputfamily
        type = "text"
        placeholder = "nom d'utilisateur"
        v-model="username"
      />
      <inputfamily
        placeholder = "mot de passe"
        type = "password"
        v-model="password"
      />
      <mainButton label = "connexion"
        @click="login"    
      />
      <p v-if="attempt === 1">Mot de passe <span>oublié?</span></p>
      <div class="divider-container">
        <div class="divider"></div>
        <span class="divider-text">ou</span>
        <div class="divider"></div>
      </div>
      <p @click = "router.push('/signup')">Pas de compte? Je crée mon compte <span>ici</span></p>
    </div>
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
              <p style="text-align: center;">{{ errorMessage }}</p>
              <ion-icon 
                :icon="closeCircleOutline" 
                class="icone"
                @click="newModal = false"
              >
              </ion-icon>                                     
            </div>
          </ion-content>
        </ion-modal>
    <FooterLayout/>
  </ionPage>

</template>
  
<script>

import { IonPage, IonContent } from '@ionic/vue';
import { alertCircleOutline, closeCircleOutline } from 'ionicons/icons';
import { defineComponent, ref } from 'vue';
import mainButton from '../button/mainButton.vue'
import FooterLayout from '../components/tools/footerLayout.vue';
import inputfamily from '../tools/inputfamily.vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
  
  export default defineComponent({
    components: {
      IonPage, IonContent, mainButton, FooterLayout, inputfamily, alertCircleOutline,
      closeCircleOutline
    },

    setup() {
      const username = ref('');
      const password = ref('');
      const router = useRouter();
      const newModal = ref(false);
      const errorMessage = ref('');
      const attempt = ref(0)
      
      // function to handle user login
      const login = async () => {
        if (!username.value || !password.value) {
          newModal.value = true;
          errorMessage.value = "Remplissez tous les champs"
          return ;
        }
        try {
          const response = await axios.post('http://127.0.0.1:8000/account/login/', {
            username: username.value,
            password: password.value,
          });
          const { access, refresh } = response.data;
          localStorage.setItem('access_token', access);
          localStorage.setItem('refresh_token', refresh);
          console.log('Login successful!', access);

          // Redirection seulement si la connexion est réussie
          router.push('/profile');
        } 

        catch (error) {
          console.error('Login failed:', error.response?.data);
          newModal.value = true;
          errorMessage.value = error.response?.data.error;
          attempt.value = 1
        }
      };

      return {
        username, password, login, router, newModal, errorMessage, alertCircleOutline,
        closeCircleOutline, attempt
      };
    },
  });
</script>
  
<style scoped>
.main__container {
  height: 100%; display: flex; flex-direction: column; gap: 1rem; flex: 1;
}

.main__text {
  widows: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
}

.main__text h2 {
  text-align: center;
}

.main__text p {
  text-align: center;
}

.divider-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%;
  gap: 10px; /* Espacement entre la ligne et le texte */
}

.divider {
  flex: 1; /* Permet d'étendre la ligne sur toute la largeur disponible */
  height: 1px; /* Épaisseur de la ligne */
  background-color: #058C42; /* Couleur de la ligne */
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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