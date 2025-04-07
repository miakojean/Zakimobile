<template>
  <ion-list class="full-width-list" :inset="true" style="width: 100%;">
    <ion-item>
      <ion-label><p>Sous-total</p></ion-label>
      <ion-label slot="end"><p>{{ subtotal }} FCFA</p></ion-label>
    </ion-item>
    <ion-item>
      <ion-label><p>Frais de livraison</p></ion-label>
      <ion-label slot="end"><p>{{ deliveryFee }} FCFA</p></ion-label>
    </ion-item>
    <ion-item>
      <ion-toggle v-model="discountApplied" @ionChange="toggleDiscount">
        <ion-label><p>Code de réduction</p></ion-label>
      </ion-toggle>
      <ion-input 
        v-if="discountApplied" 
        v-model="discountCodeInput" 
        placeholder="Mon code ici"
        @ionChange="applyDiscount">
      </ion-input>
    </ion-item>
    <ion-item>
      <ion-label><p>Total</p></ion-label>
      <ion-label slot="end"><p>{{ calculatedTotal }} FCFA</p></ion-label>
    </ion-item>
  </ion-list>
</template>

<script>
import { IonItem, IonList, IonLabel, IonInput, IonToggle } from '@ionic/vue';
import { defineComponent, computed, ref } from 'vue';

export default defineComponent({
  components: {
    IonItem,
    IonList,
    IonLabel,
    IonInput,
    IonToggle
  },
  props: {
    subtotal: {
      type: Number,
      default: 0
    },
    deliveryFee: {
      type: Number,
      default: 1000
    }
  },
  setup(props) {
    const discountApplied = ref(false);
    const discountCodeInput = ref('');
    const discountAmount = ref(0);

    const toggleDiscount = () => {
      if (!discountApplied.value) {
        discountAmount.value = 0;
      }
    };

    const applyDiscount = () => {
      // Ici vous pourriez ajouter une logique pour valider le code
      // et calculer le montant de la réduction
      // Pour l'exemple, on applique une réduction fixe de 10% si un code est saisi
      discountAmount.value = discountCodeInput.value ? props.subtotal * 0.1 : 0;
    };

    const calculatedTotal = computed(() => {
      return props.subtotal + props.deliveryFee - discountAmount.value;
    });

    return {
      discountApplied,
      discountCodeInput,
      calculatedTotal,
      toggleDiscount,
      applyDiscount
    };
  }
});
</script>

<style scoped>
p {
  color: #292929;
}
</style>