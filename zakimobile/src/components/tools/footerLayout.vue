<template>
  <ion-footer collapse="fade">
    <ion-toolbar class="centered-toolbar">
      <ion-title class="title">provided by CALADRIUS</ion-title>
    </ion-toolbar>
  </ion-footer>
</template>

<script>
import { IonFooter, IonTitle, IonToolbar } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: { IonFooter, IonTitle, IonToolbar },
});
</script>

<style scoped>
/* Centrage du titre */
.centered-toolbar {
  display: flex;
  justify-content: center; /* Centrer horizontalement */
  align-items: center; /* Centrer verticalement */
}

.title {
  text-align: center; /* Centrer le texte */
  font-size: 1rem; /* Ajuster la taille du texte si nécessaire */
  font-weight: 700; /* Rendre le titre plus visible si nécessaire */
  color: #058C42;
}

ion-footer {
  background-color: white; /* Fond bleu pour le footer */
  color: #058C42; /* Texte en blanc */
}
</style>