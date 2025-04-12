<template>
  <ion-tabs class="ion-no-border" style="--background: #fff; --color-selected: #000;">
    <ion-router-outlet :animated="false"></ion-router-outlet>
    <ion-tab-bar slot="bottom" class="ion-tab-button">
      
      <ion-tab-button tab="home" href="/home" >
        <ion-icon :icon="homeOutline" />
        <ion-label>Acceuil</ion-label>
      </ion-tab-button>

      <ion-tab-button tab="orders" href="/orders">
        <ion-icon :icon="readerOutline" />
        <ion-label>Commande</ion-label>
      </ion-tab-button>

      <ion-tab-button tab="cart" href="/cart">
        <ion-icon :icon="cartOutline" />
        <ion-label>Panier</ion-label>
      </ion-tab-button>

      <ion-tab-button tab="search" href="/settings">
        <ion-icon :icon="search" />
        <ion-label>Search</ion-label>
      </ion-tab-button>

      <ion-tab-button tab="library" href="/profile">
        <ion-icon :icon="personCircleOutline" />
        <ion-label>Profile</ion-label>
      </ion-tab-button>
    </ion-tab-bar>
  </ion-tabs>
</template>

<script>
  import { IonPage, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonLabel, IonIcon } from '@ionic/vue';

  import { homeOutline,cartOutline, personCircleOutline, readerOutline, search } from 'ionicons/icons';

  export default {
    components: { IonPage, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonLabel, IonIcon },
    data() {
      return {
        search,
        homeOutline,
        cartOutline,
        personCircleOutline,
        readerOutline,
      };
    },
  };
</script>

<style scoped>
  .ion-tab-bar {
    --background: #80fab7;
    --color: gray;
    --color-selected: #3880ff;
  }

  .ion-tab-button {
    --color: #6b6b6b;
    --color-selected: #058C42;
  }

  .ion-no-border{
    --background: #80fab7;
  }
</style>