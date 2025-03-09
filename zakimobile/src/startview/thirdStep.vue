<template>
   <ion-page>
    <div class="main__container">
        <div class="main__picture">
            <img src="../assets/zaki assets/Agreement-bro.svg" alt="partenaire">
        </div>
        <div class="main__text">
            <h2>Commencer</h2>
            <p>Facilitez vous la vie en nous confiant vos courses</p>
            <mainButton/>
        </div>
    <stepper :activeIndex="activeIndex" @update:activeIndex="updateStep"/>
    </div>
   </ion-page>
</template>

<script>
import { ref } from 'vue';
import mainButton from '../button/mainButton.vue';
import { IonPage } from '@ionic/vue';
import { defineComponent } from 'vue';
import Stepper from '../components/tools/stepper.vue';
import { useRouter, useRoute } from 'vue-router';
export default defineComponent({
    components: {IonPage, mainButton, Stepper},
    setup(){
        const router = useRouter();
        const route = useRoute();
        const activeIndex = ref(0);
        // Mettre à jour l'index du step en fonction de la route actuelle
        const updateStep = (index) => {
            activeIndex.value = index;
        };
        const goToNextStep = () => {
            if (activeIndex.value === 0) router.push('/secondStep');
            else if (activeIndex.value === 1) router.push('/thirdStep');
        };

        return{
            router, activeIndex, updateStep, goToNextStep
        }
    }

})
</script>

<style>

</style>