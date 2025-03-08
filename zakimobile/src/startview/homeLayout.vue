<template>
  <ionPage>
        <div class="main__container">
            <div class="main__picture">
                <img src="../assets/zaki assets/fruit shop-rafiki.svg" alt="">
            </div>

            <div class="main__text">

                <h2>Bienvenu chez Zaki</h2>
                <p>Faites vos courses depuis chez vous</p>
                <secondButton/>
            </div>
        </div>
  </ionPage>
</template>

<script>
import { IonPage } from '@ionic/vue';
import { defineComponent } from 'vue';
import mainButton from '../button/mainButton.vue';
import SecondButton from '../button/secondButton.vue';

export default defineComponent({

    components: {
        IonPage,
        mainButton,
        SecondButton
    }

})
</script>

<style>

    .main__container{
        border: 1px solid gray;
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