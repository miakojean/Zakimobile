<template>
  <ionPage>
        <div class="main__container">
            <div class="main__picture">
                <img src="../assets/zaki assets/fruit shop-rafiki.svg" alt="">
            </div>

            <div class="main__text">

            </div>
        </div>
  </ionPage>
</template>

<script>
import { IonPage } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({

    components: {
        IonPage,
    }

})
</script>

<style>

    .main__container{
        border: 1px solid gray;
        height: 100%;
        display: flex;
        flex-direction: column;
    }

</style>