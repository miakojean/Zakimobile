<template>
    <ion-button><ion-icon :icon="arrowForward"></ion-icon></ion-button>
</template>
  
<script>
import { IonButton,  } from '@ionic/vue';
import { defineComponent } from 'vue';
import { alertCircleOutline, closeCircleOutline, arrowForward } from 'ionicons/icons';

export default defineComponent({
    components: { IonButton, alertCircleOutline, closeCircleOutline, arrowForward},

    props: {
        label: {
            type: String,
            required: true,
            default: "commencer"
        }
    },

    setup () {
        return {
            alertCircleOutline, closeCircleOutline, arrowForward
        }
    }
});
</script>
  
<style scoped>
ion-button {
    width: 15%;
    height: 1rem;
    --background: #058C42;
    --background-hover: #058C42;
    --background-activated: #058C42;
    --background-focused: #058C42;

    --color: white;
    font-size: 1rem;
    font-weight: 600;

    --border-radius: 50%;
    --border-color: none;
    --border-style: none;
    --border-width: none;

    --box-shadow: 0 2px 6px 0 rgb(0, 0, 0, 0.25);

    --ripple-color: deeppink;

    --padding-top: 16px;
    --padding-bottom: 16px;

    text-transform: none;
    --transition: none;
}
</style>