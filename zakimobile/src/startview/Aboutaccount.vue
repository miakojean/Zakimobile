<template>
    <ionPage>
        <div class="main__container">
            <!-- Transition for images -->

            <img
                src="../assets/zaki assets/fruit shop-rafiki.svg"
                alt=""
                key="img-0"
            /> 
    
            <!-- Transition for text -->

            <div class="main__text">
                <h2><span class="logo">Zaki</span></h2>
            </div>

    
            <!-- Bouton pour avancer dans les étapes -->
            <secondButton2 label="connexion"/>
            <mainButton label = "inscription"/>
            
        </div>

        <FooterLayout/>
    </ionPage>
</template>
  
<script>
  import { ref } from 'vue';
  import { IonPage } from '@ionic/vue';
  import { defineComponent } from 'vue';
  import secondButton2 from '../button/secondButton2.vue';
  import mainButton from '../button/mainButton.vue'
  import stepper from '../components/tools/stepper.vue';
  import FooterLayout from '../components/tools/footerLayout.vue';
  
  export default defineComponent({
    components: {
      IonPage,
      secondButton2,
      mainButton,
      stepper,
      FooterLayout,
    },
  
    setup() {
      
  
      return {
        
      };
    },
  });
</script>
  
<style scoped>
  .main__container {
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    flex: 1;
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