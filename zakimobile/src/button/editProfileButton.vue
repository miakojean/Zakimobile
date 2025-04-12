<template>
    <ion-item :button="true">
        <ion-icon  slot="start" :icon="personCircle" size="medium"></ion-icon>
        <ion-label><p>Modifier le profile</p></ion-label>   
    </ion-item>
</template>
  
<script>
import { IonButton, IonIcon, IonLabel, IonNote } from '@ionic/vue';
import { defineComponent } from 'vue';
import { arrowForwardOutline, listCircle, personOutline, personCircle } from 'ionicons/icons';

export default defineComponent({
    components: { IonButton, IonIcon,arrowForwardOutline, IonLabel, IonNote },

    props:{
        label:{
            type: String,
            required: true,
            default: 'Modifier le profil'
        }
    },

    emits: ['next-step'],

    setup(props, {emit}){

        const emitNextStep = () => {
            emit('next-step');
        }
        return {
            emitNextStep, arrowForwardOutline, listCircle, personOutline,
            personCircle
        };
    },
});
</script>
  
<style scoped>
ion-button {
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    --background: #f3f3f3;
    --background-hover: #f3f3f3;
    --background-activated: #f3f3f3;
    --background-focused: #f3f3f3;

    --color: #058C42;
    font-size: 0.8rem;
    font-weight: 600;

    --border-radius: 16px;
    --border-color: #058C42;
    --border-style: solid;
    --border-width: 0px;

    --box-shadow: 0 2px 6px 0 rgb(0, 0, 0, 0.25);

    --ripple-color: #f3f3f3;

    --padding-top: 5px;
    --padding-bottom: 5px;

    text-transform: none;

}

ion-icon {
  color: #058C42; /* Votre couleur verte */
  /* Ou utiliser les variables Ionic */
  --ion-color-base: #058C42;
  --ion-color-contrast: white; /* Couleur du contraste si nécessaire */
}
</style>