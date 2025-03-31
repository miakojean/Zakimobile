<template>
    
    <ion-list :inset="true">
    <ion-item>
        <ion-input label="First Name"></ion-input>
    </ion-item>
    <ion-item>
        <ion-input label="Last Name"></ion-input>
    </ion-item>
    <ion-item>
        <ion-toggle>
        <ion-label>Allow Notifications</ion-label>
        <ion-note color="medium">Unsubscribe at any time</ion-note>
        </ion-toggle>
    </ion-item>
    <itemLabel/>
    <itemLabel/>
    </ion-list>
</template>
  
<script lang="ts">
import {
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonNote,
    IonTextarea,
    IonToggle,
    IonToolbar,
    IonTitle,
} from '@ionic/vue';
import { defineComponent } from 'vue';
import itemLabel from './itemLabel.vue';

export default defineComponent({
    components: {
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonNote,
    IonTextarea,
    IonToggle,
    IonToolbar,
    IonTitle,
    itemLabel
    },
});
</script>
  
<style scoped>
ion-note {
    display: block;
}
</style>