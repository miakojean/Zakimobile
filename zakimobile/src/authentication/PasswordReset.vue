<template>
  <ionPage>
    
    <!-- The second step which consist in verification of token -->

    <div class="main__container" v-if="step === 1">

      <div class="main__text">
        <h2><span class="logo">Zaki</span></h2>
      </div>

      <h4>Récupération de mot de passe</h4>

      <inputfamily type = "text" placeholder = "coller le token reçu" v-model="token"/>

      <nextButton @click="verifyToken"/>

      <div class="divider-container">
        <div class="divider"></div>
        <span class="divider-text">ou</span>
        <div class="divider"></div>
      </div>

      <p @click = "router.push('/signup')">Pas de compte? Je crée mon compte <span>ici</span></p>
    </div>
    
    <div class="main__container" v-if="step === 2">

      <div class="main__text">
        <h2><span class="logo">Zaki</span></h2>
      </div>

      <h4>Récupération de mot de passe</h4>

      <inputfamily type = "password" placeholder = "Entrer le nouveau mot de passe" v-model="password"/>
      <inputfamily type = "password" placeholder = "Confirmer le nouveau mot de passe" v-model="confirmPassword"/>

      <mainButton label="modifier" @click="changePassword"/>
      <p v-if="attempt >= 1">Mot de passe <span>oublié?</span></p>

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
  
  import { IonPage, IonContent, IonModal } from '@ionic/vue';
  import { alertCircleOutline, closeCircleOutline } from 'ionicons/icons';
  import { defineComponent, ref } from 'vue';
  import mainButton from '../button/mainButton.vue';
  import nextButton from '../button/nextButton.vue';
  import FooterLayout from '../components/tools/footerLayout.vue';
  import inputfamily from '../tools/inputfamily.vue';
  import { useRouter } from 'vue-router';
  import axios from 'axios';
    
    export default defineComponent({
      components: {
        IonPage, IonContent, IonModal, mainButton, nextButton, FooterLayout, inputfamily, alertCircleOutline,
        closeCircleOutline
      },
  
      setup() {
        const email = ref('');
        const router = useRouter();
        const newModal = ref(false);
        const errorMessage = ref('');
        const attempt = ref(0);
        const succesMessage = ref('');
        const token = ref('')
        const step = ref(1)

        const password = ref('')
        const confirmPassword = ref('')

        const savedEmail = localStorage.getItem('resetEmail');

        const voirStorage = () => {
          console.log(savedEmail)
        }
        
        // function to verify if the token is valid
        const verifyToken = async () => {
          if (!token.value) {
            newModal.value = true;
            errorMessage.value = "Remplissez tous les champs"
            return ;
          }
          try {
              const response = await axios.post('http://localhost:8000/account/password/verify-token/', {
                email: savedEmail,
                token: token.value
              });

              if (response.data.valid) {
                // Token valide, rediriger vers la page de réinitialisation du mot de passe
                step.value = 2;
              } else {
                  errorMessage.value = "Token invalide ou expiré";
              }
          } catch (error) {
              console.error('Erreur lors de la vérification du token:', error.response?.data);
              errorMessage.value = error.response?.data.error || "Une erreur est survenue";
          }
        };

        const changePassword = async () => {
          if(password.value != confirmPassword.value) {
            newModal.value = true;
            errorMessage.value = "Les deux mots de passes ne correspondent pas";
            return
          } else if (!password.value || !confirmPassword.value) {
            newModal.value =  true;
            errorMessage.value = "Remplissez tous les champs"
            return ;
          }
          try {
            const response = await axios.post(`http://127.0.0.1:8000/account/password/reset/confirm/${token.value}/`,{
              new_password: password.value,
              confirm_password: confirmPassword.value,
            });
            router.push('/signin')
          } catch(error) {
            newModal.value = true;
            errorMessage.value = error.response?.data.error;
          }
        }
  
        return {
          email, verifyToken, router, newModal, errorMessage, alertCircleOutline,
          closeCircleOutline, attempt, succesMessage, step, token, savedEmail, changePassword,
          password, confirmPassword
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
    color: #8f8f8f;
    font-weight: 600;
  }
  
  .label__contain{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
  }
</style>