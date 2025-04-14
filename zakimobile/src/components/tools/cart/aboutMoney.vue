<template>
  <ion-list class="full-width-list" :inset="true" style="width: 100%;">
    <ion-item>
      <ion-label><p>Sous-total</p></ion-label>
      <ion-label slot="end"><p>{{ subtotal }} FCFA</p></ion-label>
    </ion-item>
    <ion-item>
      <ion-label><p>Frais de livraison</p></ion-label>
      <ion-label slot="end"><p>1000 FCFA</p></ion-label>
    </ion-item>
    <ion-item>
      <ion-toggle>
        <ion-label><p>Code de réduction</p></ion-label>
        <ion-input label="Mon code ici"></ion-input>
      </ion-toggle>
      </ion-item>
    <ion-item>
      <ion-label><p>Total</p></ion-label>
      <ion-label slot="end"><p>5000 FCFA</p></ion-label>
    </ion-item>
  </ion-list>
</template>
  
<script>
  import { IonItem, IonList, IonLabel, } from '@ionic/vue';
  import { defineComponent } from 'vue';
  import { chevronForward, listCircle } from 'ionicons/icons';
  
  export default defineComponent({
    components: { 
      IonItem,
      IonList,
      IonLabel
    },
    props: {
      subtotal: {
        type: Number,
        default: 0
      },
      deliveryFee: {
        type: Number,
        default: 0
      },
      discountCode: {
        type: String,
        default: ''
      },
      total: {
        type: Number,
        default: 0
      }
    },
    setup() {
      return { 
        chevronForward, 
        listCircle 
      };
    }
  });
</script>
  
<style scoped>
p{
  color: #292929;
}
</style>