<template>
    <ion-item class="cart__item" lines="full">
      <ion-list class="full-width-list" :inset="true">
        <ion-item class="ion-text-wrap">
            <div class="items__infos">
                <ion-label>Sous-total</ion-label>
                <ion-label>300 FCFA</ion-label>
            </div>
        </ion-item>
        <ion-item>
            <div class="items__infos">
                <ion-label>Frais de livraison</ion-label>
                <ion-label>300 FCFA</ion-label>
            </div>
        </ion-item>
        <ion-item>
            <div class="items__infos">
                <ion-label>Code de réduction</ion-label>
                <ion-label>300 FCFA</ion-label>
            </div>
        </ion-item>
      </ion-list>
    </ion-item>
</template>
  
<script>
  import { 
    IonItem, 
    IonList, 
    IonLabel 
  } from '@ionic/vue';
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    components: { 
      IonItem,
      IonList,
      IonLabel
    }
  });
</script>
  
<style scoped>
.cart__item {
--inner-padding-end: 0;
--padding-start: 0;
width: 100%;
}

.full-width-list {
width: 100%;
margin: 0;
}

.items__infos{
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    width: 100%;
}

ion-item {
--inner-border-width: 0;
--padding-start: 0;
}
</style>