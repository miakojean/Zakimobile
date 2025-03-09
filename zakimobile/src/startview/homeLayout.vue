<template>
  <ionPage>
        <div class="main__container">
            <div class="main__picture">
                <img src="../assets/zaki assets/fruit shop-rafiki.svg" alt="">
            </div>

            <div class="main__text">

                <h2>Bienvenu chez Zaki</h2>
                <p>Faites vos courses depuis chez vous</p>
                <secondButton
                label="suivant"
                @click="() =>router.push('/secondstep')"
                />
            </div>

            <stepper/>
        </div>
  </ionPage>
</template>

<script>
import { IonPage } from '@ionic/vue';
import { defineComponent } from 'vue';
import mainButton from '../button/mainButton.vue';
import SecondButton from '../button/secondButton.vue';
import Stepper from '../components/tools/stepper.vue';
import { useRouter } from 'vue-router';

export default defineComponent({

    components: {
        IonPage,
        mainButton,
        SecondButton,
        Stepper
    },

    setup () {

        const router = useRouter();

        return {
            router
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