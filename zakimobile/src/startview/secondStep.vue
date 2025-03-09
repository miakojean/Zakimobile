<template>
    <ion-page>
        <div class="main__container">
            <div class="main__picture">
                <img src="../assets/zaki assets/healthy food-amico.svg" alt="fruit">
            </div>
            <div class="main__text">
                <h2>Commandez!!</h2>
                <p>Découvrez vos ingrédients favoris sur notre application</p>
            </div>
           
            <secondButton
                label="suivant"
                @click="goToNextStep"
            />
            <stepper 
                :activeIndex="activeIndex" 
                @update:activeIndex="updateStep"
            />
        </div>
    </ion-page>
  
</template>

<script>
import { ref } from 'vue';
import secondButton from '../button/secondButton.vue';
import { IonPage } from '@ionic/vue';
import { defineComponent } from 'vue';
import Stepper from '../components/tools/stepper.vue';
import { useRouter, useRoute } from 'vue-router';
export default defineComponent({
    components: {IonPage, secondButton, Stepper},

    setup () {

        const router = useRouter();
        const route = useRoute();
        const activeIndex = ref(1);
        // Mettre à jour l'index du step en fonction de la route actuelle
        const updateStep = (index) => {
            activeIndex.value = index;
        };
        const goToNextStep = () => {
            const routes = ['/home', '/secondStep', '/thirdStep'];
            if (activeIndex.value < routes.length - 1) {
                activeIndex.value += 1;
                router.push(routes[activeIndex.value]);
            }
        };


        return {
            router, route, activeIndex, updateStep, goToNextStep
        }
    }


})
</script>

<style>
    
    .main__text{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1rem;
    }

    p{
        text-align: center;
    }
</style>