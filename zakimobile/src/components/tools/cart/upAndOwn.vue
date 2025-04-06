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
import { defineComponent } from 'vue';
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
  emits: ['increment', 'decrement'],
  setup(props, { emit }) {

    const increaseQuantity = () => {
      emit('increment');
    };
    const decreaseQuantity = () => {
      if (props.itemQuantity > 1) {
        emit('decrement');
      }
    };

    return {
      addCircleOutline, removeCircleOutline, itemQuantity: props.itemQuantity, increaseQuantity, decreaseQuantity
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