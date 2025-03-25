<template>
    <ion-button>{{ label }}</ion-button>
</template>
  
<script>
import { IonButton } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
    components: { IonButton },

    props: {
        label: {
            type: String,
            required: true,
            default: "commencer"
        }
    }
});
</script>
  
<style scoped>
    ion-button {
        width: 90%;
      --background: #058C42;
      --background-hover: #058C42;
      --background-activated: #058C42;
      --background-focused: #058C42;
  
      --color: white;
      font-size: 1rem;
      font-weight: 600;
  
      --border-radius: 16px;
      --border-color: none;
      --border-style: none;
      --border-width: none;
  
      --box-shadow: 0 2px 6px 0 rgb(0, 0, 0, 0.25);
  
      --ripple-color: deeppink;
  
      --padding-top: 10px;
      --padding-bottom: 10px;

      text-transform: none;
    }
</style>