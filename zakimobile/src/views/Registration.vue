<template>
    <ionPage>
        <IonContent>
            <div class="main__container">
            <h2>Inscription</h2>
            <inputfamily placeholder="Nom de famille" type="text" v-model="first_name" />
            <inputfamily placeholder="Prénoms" type="text" v-model="last_name" />
            <inputfamily placeholder="Username" type="text" v-model="username" />
            <inputfamily placeholder="Email" type="email" v-model="email" />
            <inputfamily placeholder="Mot de passe" type="password" v-model="password" />
            <inputfamily placeholder="Confirmer mot de passe" type="password" v-model="password2" />
            <mainButton label="Inscription" @click="verification" />
            
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
      <footerLayout />
    </ionPage>
</template>
  
  <script>
  import { IonContent, IonPage, IonModal } from '@ionic/vue';
  import { defineComponent, ref } from 'vue';
  import inputfamily from '../tools/inputfamily.vue';
  import mainButton from '../button/mainButton.vue';
  import footerLayout from '../components/tools/footerLayout.vue';
  import { useRouter } from 'vue-router';
  
  export default defineComponent({
    components: {
      IonPage, IonContent, IonModal,
      inputfamily, mainButton, 
      footerLayout,
    },
  
    setup() {
        const router = useRouter();
        const modal = ref(true);
        const newModal = ref(false); // Nouvelle modale
      
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
        
        const verification = () => {
            if (first_name.value === "") {
                newModal.value = true
            }
        }
        
        
        return { 
            router, first_name, last_name, username, email, password,
            password2, errorMessage,
            modal, newModal, openNewModal, verification
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
  