<template>
    <ion-input
      aria-label="Custom input"
      :placeholder="placeholder"
      class="custom"
      :maxlength="20"
      :type = "type"
    ></ion-input>
</template>
  
<script>
  import { IonInput } from '@ionic/vue';
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    components: { IonInput },
  
    props: {
      placeholder: {
        type: String,
        required: true,
        default: "entrer votre nom d'utilisateur",
      },
      type : {
        type: String,
        required: true,
        default: "text"
      }
    },
  });
</script>
  
<style scoped>
  ion-input.custom {
    width: 90%;
    --background: #f3f3f3;
    --color: #0f0f0f;
    --placeholder-color: #7a7a7a;
    --placeholder-opacity: 0.8;
  
    --padding-bottom: 10px;
    --padding-end: 10px;
    --padding-start: 10px;
    --padding-top: 10px;
  
    --border-radius: 1rem;
    --border-color: #058C42;

    --highlight-color-focused:#058C42;
  }

</style>