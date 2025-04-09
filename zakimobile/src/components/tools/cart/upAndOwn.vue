<template>
  <div class="main">
    <IonIcon class="add__products" :icon="removeCircleOutline" @click="decreaseQuantity"></IonIcon>
    {{ modelValue }}
    <IonIcon class="add__products" :icon="addCircleOutline" @click="increaseQuantity"></IonIcon>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { addCircleOutline, removeCircleOutline } from 'ionicons/icons';
import { IonIcon } from '@ionic/vue';

export default defineComponent({
  components: { IonIcon },
  props: {
    modelValue: {
      type: Number,
      default: 1
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const increaseQuantity = () => {
      emit('update:modelValue', props.modelValue + 1);
    };

    const decreaseQuantity = () => {
      if (props.modelValue > 1) {
        emit('update:modelValue', props.modelValue - 1);
      }
    };

    return {
      addCircleOutline,
      removeCircleOutline,
      increaseQuantity,
      decreaseQuantity
    };
  }
});
</script>

<style>
.main {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  border: 1px solid #E0E0E0;
  border-radius: 1rem;
  padding: 0.1rem;
  font-size: 1rem;
}

.add__products {
  font-size: 1.3rem;
}
</style>