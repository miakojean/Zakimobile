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
        <ion-badge color="danger">{{ uniqueItemsCount }}</ion-badge>
        <ion-label>Panier</ion-label>
      </ion-tab-button>

      <ion-tab-button tab="search" href="/search">
        <ion-icon :icon="search" />
        <ion-label>Search</ion-label>
      </ion-tab-button>

      <ion-tab-button tab="settings" href="/settings">
        <ion-icon :icon="cogOutline" />
        <ion-label>Paramètres</ion-label>
      </ion-tab-button>
    </ion-tab-bar>
  </ion-tabs>
</template>

<script>
import { IonPage, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonLabel, IonIcon } from '@ionic/vue';
import { homeOutline,cartOutline, personCircleOutline, readerOutline, search, cogOutline } from 'ionicons/icons';
import { defineComponent,} from 'vue';
import { useCartStore } from '../../data/store/cart'; // Chemin à ajuster
import { storeToRefs } from 'pinia';
const cartStore = useCartStore();
const { uniqueItemsCount } = storeToRefs(cartStore);


export default defineComponent({
  name: 'NavigationFooter',
  components: { IonPage, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonLabel, IonIcon },

  setup() {

    const cartStore = useCartStore();
    const { count } = storeToRefs(cartStore); // Pour garder la réactivité

    return {
      homeOutline,
      cartOutline,
      personCircleOutline,
      readerOutline,
      search,
      cogOutline,
      count,
      cartStore,
      uniqueItemsCount,
      itemNumber: count // Connecte le compteur du store à ton template
    };
  },
});
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