<template>
    <ion-button>
        {{label}} 
        <i class="ri-arrow-right-line"></i>
    </ion-button>
</template>
  
<script>
import { IonButton } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
    components: { IonButton },

    props:{
        label:{
            type: String,
            required: true,
            default: 'suivant'
        }
    }
});
</script>
  
<style scoped>
    ion-button {
        width: 90%;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
      --background: #f3f3f3;
      --background-hover: #f3f3f3;
      --background-activated: #f3f3f3;
      --background-focused: #f3f3f3;
  
      --color: #058C42;
      font-size: 1rem;
      font-weight: 600;
  
      --border-radius: 16px;
      --border-color: #058C42;
      --border-style: solid;
      --border-width: 1px;
  
      --box-shadow: 0 2px 6px 0 rgb(0, 0, 0, 0.25);
  
      --ripple-color: deeppink;
  
      --padding-top: 10px;
      --padding-bottom: 10px;

      text-transform: none;

    }
</style>