<template>
  <div class="main">
    <IonIcon class="add__products" :icon="removeCircleOutline" @click="decreaseQuantity"></IonIcon>
    {{ itemQuantity }}
    <IonIcon class="add__products" :icon="addCircleOutline" @click="increaseQuantity"></IonIcon>
  </div>
</template>

<script>
import { addCircleOutline, removeCircleOutline } from 'ionicons/icons';
import { IonIcon } from '@ionic/vue';
import { defineComponent, ref } from 'vue';
export default defineComponent ({
  
  components: {
    IonIcon
  },
  props: {
    itemQuantity: {
      type: Number,
      default: 1
    }
  },
  setup(){

    const itemQuantity = ref(1);
    const increaseQuantity = () => {
      itemQuantity.value++;
    };
    const decreaseQuantity = () => {
      if (itemQuantity.value > 1) {
        itemQuantity.value--;
      }
    };

    return {
      addCircleOutline, removeCircleOutline, itemQuantity, increaseQuantity, decreaseQuantity
    }
  }
})
</script>

<style>
  .main{
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    border: 1px solid #E0E0E0;
    border-radius:1rem;
    padding: 0.1rem;
    font-size: 1rem;
  }
  .add__products{
    font-size: 1.3rem;
  }
</style>