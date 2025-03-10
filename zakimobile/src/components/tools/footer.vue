<template>
    <ion-footer>
      <div class="footer__container">
        <span>© 2021 Zaki Mobile</span>
        <span>Version 1.0.0</span>
      </div>
    </ion-footer>
</template>
  
<script>
  import { IonFooter } from '@ionic/vue';
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    components: { IonFooter },
  });
</script>
  
<style scoped>
  .footer__container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background-color: #f3f3f3;
    color: #058C42;
    font-size: 1rem;
    font-weight: 600;
    height: 30px;
  }
  
  .footer__container span {
    color: #058C42;
  }
</style>