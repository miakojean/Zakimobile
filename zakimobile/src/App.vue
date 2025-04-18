<template>
  <ion-app>
    <ion-router-outlet 
      :animated="false" 
      :key="$route.fullPath"
      :swipe-gesture="false" 
      />
  </ion-app>
</template>

<script>
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import '@ionic/vue/css/core.css'; // Assure-toi d'importer les styles de base d'Ionic
export default {
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet
  },
  setup() {
    return {};
  }
};
</script>

<style>

</style>