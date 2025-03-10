<template>
    <ionPage>
      <IonContent>
        <div class="main__container">
          <!-- Transition for images -->

          <img
            v-if="activeIndex === 0"
            src="../assets/zaki assets/fruit shop-rafiki.svg"
            alt=""
            key="img-0"
          />  

          <img
            v-if="activeIndex === 1"
            src="../assets/zaki assets/healthy food-amico.svg"
            alt="fruit"
            key="img-1"
          />

          <img
            v-if="activeIndex === 2"
            src="../assets/zaki assets/Agreement-bro.svg"
            alt="partenaire"
            key="img-2"
          />
  
          <!-- Transition for text -->

          <div class="main__text" v-if="activeIndex === 0" key="text-0">
            <h2>Bienvenue chez <span class="logo">Zaki</span></h2>
            <p>Faites vos courses tranquillement depuis chez vous</p>
          </div>
          <div class="main__text" v-else-if="activeIndex === 1" key="text-1">
            <h2>Commandez!!</h2>
            <p>Découvrez vos ingrédients favoris sur notre application</p>
          </div>
          <div class="main__text" v-else-if="activeIndex === 2" key="text-2">
            <h2>Commencer</h2>
            <p>Facilitez vous la vie en nous confiant vos courses</p>
          </div>

  
          <!-- Bouton pour avancer dans les étapes -->
          <secondButton label="Suivant" @next-step="handleNextStep" v-if = "activeIndex <= 1" />
          <mainButton 
            v-else @click="() => {router.push('/signin')}"
            label = "commencer"
          />
          <!-- Stepper reçoit activeIndex en prop pour suivre l'état -->
          <stepper :activeIndex="activeIndex" @click="handleEvent" />

          
        </div>

        
      </IonContent>
      <FooterLayout/>
    </ionPage>
</template>
  
<script>
  import { IonContent, IonPage } from '@ionic/vue';
  import { defineComponent, ref } from 'vue';
  import secondButton from '../button/secondButton.vue';
  import mainButton from '../button/mainButton.vue'
  import stepper from '../components/tools/stepper.vue';
  import FooterLayout from '../components/tools/footerLayout.vue';
  import { useRouter} from 'vue-router';
  
  export default defineComponent({
    components: {
      IonPage,
      IonContent,
      secondButton,
      mainButton,
      stepper,
      FooterLayout,
    },
  
    setup() {
      const router = useRouter();
      const activeIndex = ref(0);
      const message = ref('');
  
      const handleEvent = (data) => {
        activeIndex.value = data; // Update activeIndex based on stepper click
        message.value = data; // Update message
        console.log('Donnée reçue:', data);
      };
  
      const handleNextStep = () => {
        activeIndex.value++;
        if (activeIndex.value > 2) {
          activeIndex.value = 0;
        }
      };
  
      return {
        activeIndex,
        handleEvent,
        message,
        handleNextStep,
        router,
      };
    },
  });
</script>
  
<style scoped>
  
  .main__text {
    width: 100%;
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
  
  /* Transition styles */
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease;
  }
  
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>