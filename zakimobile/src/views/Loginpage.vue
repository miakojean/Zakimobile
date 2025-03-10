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

            <inputfamily
                type = "text"
            />
            <inputfamily
                placeholder = "mot de passe"
                type = "password"
            />
    
            <!-- Bouton pour avancer dans les étapes -->
            <mainButton label = "connexion"/>

            <div class="divider-container">
                <div class="divider"></div>
                <span class="divider-text">ou</span>
                <div class="divider"></div>
            </div>

            <p>Pas de compte? Je crée mon compte <span>ici</span></p>
            
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
  import inputfamily from '../tools/inputfamily.vue';
  
  export default defineComponent({
    components: {
      IonPage,
      secondButton2,
      mainButton,
      stepper,
      FooterLayout,
      inputfamily
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
</style>