<template>
  <ionPage>
        <div class="main__container">
            <div class="main__picture">
                <img src="../assets/zaki assets/fruit shop-rafiki.svg" alt="">
            </div>

            <div class="main__text">

                <h2>Bienvenu chez Zaki</h2>
                <p>Faites vos courses depuis chez vous</p>
                
            </div>
            <secondButton
                label="suivant"
                @click="() =>router.push('/secondstep')"
            />
            <stepper :activeIndex="activeIndex" @update:activeIndex="updateStep"/>
        </div>
  </ionPage>
</template>

<script>
import { ref } from 'vue';
import { IonPage } from '@ionic/vue';
import { defineComponent } from 'vue';
import mainButton from '../button/mainButton.vue';
import SecondButton from '../button/secondButton.vue';
import Stepper from '../components/tools/stepper.vue';
import { useRouter, useRoute } from 'vue-router';

export default defineComponent({

    components: {
        IonPage,
        mainButton,
        SecondButton,
        Stepper
    },

    setup () {

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

        return {
            router,activeIndex, updateStep, goToNextStep
        }
    }

})
</script>

<style>

    .main__container{
        height: 100%;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .main__text{
        display: flex;
        flex-direction: column;
        gap: 1rem;
        align-items: center;
        justify-content: center;
    }

</style>