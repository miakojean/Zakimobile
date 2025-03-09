<template>
    <ion-page>
        <div class="main__container">
            <div class="main__picture">
                <img src="../assets/zaki assets/healthy food-amico.svg" alt="fruit">
            </div>
            <div class="main__text">
                <h2>Commandez!!</h2>
                <p>Découvrez vos ingrédients favoris sur notre application</p>
                <secondButton
                    label="suivant"
                />
            </div>
            <stepper/>
        </div>
    </ion-page>
  
</template>

<script>
import secondButton from '../button/secondButton.vue';
import { IonPage } from '@ionic/vue';
import { defineComponent } from 'vue';
import Stepper from '../components/tools/stepper.vue';
export default defineComponent({
    components: {IonPage, secondButton, Stepper},

})
</script>

<style>
    .main__container{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
        gap: 1rem;
    }

    img{
        background-size: cover ;
        width: 300px;
        height: 300px;
    }

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