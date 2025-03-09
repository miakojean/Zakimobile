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
    </div>
   </ion-page>
</template>

<script>
import mainButton from '../button/mainButton.vue';
import { IonPage } from '@ionic/vue';
import { defineComponent } from 'vue';
export default defineComponent({
    components: {IonPage, mainButton},

})
</script>

<style>

</style>