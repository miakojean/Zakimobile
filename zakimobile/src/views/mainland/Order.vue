<template>
    <ionPage>
      <div class="main__container">
  
        <img
          src="../assets/zaki assets/fruit shop-rafiki.svg"
          alt=""
        /> 
  
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
  
  </style>