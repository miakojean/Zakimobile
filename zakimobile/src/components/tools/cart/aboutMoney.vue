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
      <ion-toggle @ionChange="applyDiscount">
        <ion-label><p>Code de réduction</p></ion-label>
        <ion-input 
          label="Mon code ici" 
          v-model="discountCodeInput"
          :disabled="!discountApplied"
        ></ion-input>
      </ion-toggle>
    </ion-item>
    <ion-item v-if="discountApplied">
      <ion-label><p>Réduction appliquée</p></ion-label>
      <ion-label slot="end"><p>-{{ discountAmount }} FCFA</p></ion-label>
    </ion-item>
    <ion-item>
      <ion-label><p>Total</p></ion-label>
      <ion-label slot="end"><p>{{ total }} FCFA</p></ion-label>
    </ion-item>
  </ion-list>
</template>

<script>
import { IonItem, IonList, IonLabel, IonToggle, IonInput } from '@ionic/vue';
import { defineComponent, computed, ref } from 'vue';

export default defineComponent({
  components: { 
    IonItem,
    IonList,
    IonLabel,
    IonToggle,
    IonInput
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
    const discountCodeInput = ref('');
    const discountApplied = ref(false);
    const discountAmount = ref(0);

    // Codes de réduction valides (à adapter)
    const validDiscountCodes = {
      'SOLDES10': 0.1,  // 10% de réduction
      'SOLDES20': 0.2   // 20% de réduction
    };

    const applyDiscount = (event) => {
      discountApplied.value = event.detail.checked;
      
      if (discountApplied.value && validDiscountCodes[discountCodeInput.value]) {
        const discountRate = validDiscountCodes[discountCodeInput.value];
        discountAmount.value = Math.floor(props.subtotal * discountRate);
      } else {
        discountAmount.value = 0;
      }
    };

    const total = computed(() => {
      let calculatedTotal = props.subtotal + props.deliveryFee;
      
      if (discountApplied.value) {
        calculatedTotal -= discountAmount.value;
      }
      
      return Math.max(0, calculatedTotal); // Empêche les totaux négatifs
    });

    return { 
      discountCodeInput,
      discountApplied,
      discountAmount,
      total,
      applyDiscount
    };
  }
});
</script>

<style scoped>
p {
  color: #292929;
}
.discount-applied {
  color: green;
}
</style>