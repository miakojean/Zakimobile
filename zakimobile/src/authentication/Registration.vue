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
          <mainButton 
            label = "connexion"
            @click="signup"
            :isloading = isLoading
          />
          
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
      </IonContent>
      <FooterLayout />
    </IonPage>
</template>
  
<script>
  import { IonContent, IonPage, IonModal, IonIcon } from '@ionic/vue';
  import { alertCircleOutline, closeCircleOutline } from 'ionicons/icons';
  import { defineComponent } from 'vue';
  import InputFamily from '../tools/inputfamily.vue';
  import MainButton from '../button/mainButton.vue';
  import FooterLayout from '../components/tools/footerLayout.vue';
  import { useRouter } from 'vue-router';
  import useSignup from '../authentication/registration';

    
  
  export default defineComponent({
    components: {
      IonPage, IonContent, IonModal,
      InputFamily, MainButton, FooterLayout,
      IonModal, IonIcon, alertCircleOutline,
      closeCircleOutline
    },
    setup() {

      const router = useRouter();

      const { first_name, last_name, username, email, password, password2,
              errorMessage, frenchMessage, newModal, isLoading, openNewModal, signup } = useSignup();
      
      return {
      first_name, last_name, username, email, password, password2,
      errorMessage, frenchMessage, newModal, openNewModal, signup,
      alertCircleOutline, closeCircleOutline, router, isLoading
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
  