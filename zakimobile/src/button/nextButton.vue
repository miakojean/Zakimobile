<template>
    <ion-button class="purchase__button">
        <ion-label slot="start">Commander</ion-label>
        <ion-icon :icon="arrowForward" />
    </ion-button>
</template>

<script>
import { IonButton, IonLabel, IonIcon } from '@ionic/vue';
import { defineComponent } from 'vue';
import { arrowForward } from 'ionicons/icons';

export default defineComponent({
    components: { IonButton, IonLabel, IonIcon },
    setup() {
        return { arrowForward };
    }
});
</script>

<style scoped>
.purchase__button {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    gap: 1rem;
}

.command-group {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

/* Styles Ionic par défaut (ajustés) */
ion-button {
    --background: #058C42;
    --color: white;
    --border-radius: 1rem;
    --box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.25);
    text-transform: none;
    height: auto;
    padding: 0;
    width: 100%;
}

ion-label {
    margin: 0; /* Supprime les marges par défaut */
    font-size: 1rem;
    font-weight: 600;
    width: auto;
}
</style>