<template>
    <ion-segment value="buttons" :scrollable="true">
      <ion-segment-button value="fruits">
        <ion-label>Fruits</ion-label>
      </ion-segment-button>
      <ion-segment-button value="Céréales">
        <ion-label>Céréales</ion-label>
      </ion-segment-button>
      <ion-segment-button value="Tubercules">
        <ion-label>Tubercules</ion-label>
      </ion-segment-button>
      <ion-segment-button value="Légumes">
        <ion-label>Légumes</ion-label>
      </ion-segment-button>
      <ion-segment-button value="Légumineuses">
        <ion-label>Légumineuses</ion-label>
      </ion-segment-button>
    </ion-segment>
</template>
  
<script>
import { IonLabel, IonSegment, IonSegmentButton } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
    components: { IonLabel, IonSegment, IonSegmentButton },
});
</script>

<style scoped>
*{
    text-transform: none;
    font-family: 'inter';
}

ion-segment {
    overflow-x: auto; /* Ajoute une barre de défilement horizontale si le contenu dépasse */
    white-space: nowrap; /* Empêche les boutons de passer à la ligne */
}

ion-segment::-webkit-scrollbar {
    display: none; /* Masque la barre de défilement pour les navigateurs WebKit (Chrome, Safari) */
}

ion-segment-button {
    --indicator-color: none;
    --background-checked:  none;
    --background-focused: #fafafa;
    --color-checked: #058C42;
}
</style>