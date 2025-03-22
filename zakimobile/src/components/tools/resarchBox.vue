<template>
  <div>
    <ion-searchbar
      showCancelButton="focus"
      class="custom"
      placeholder="Trouver mon produit"
      @ionInput="handleInput"
      v-model="query"
    ></ion-searchbar>
    <div class="result__box">
      <ul v-for="(fruit, index) in fruits" 
      :key="index">
        <li>{{ fruit.name }}</li>
      </ul>
    </div>
    <mainButton @click="() => { console.log(query) }"/>
  </div>
</template>

<script>
import { IonButton, IonSearchbar } from '@ionic/vue';
import { defineComponent, ref } from 'vue';
import Fruits from '../../data/Articles';
import mainButton from '../../button/mainButton.vue';

export default defineComponent({
  components: { IonSearchbar, mainButton },

  setup() {
    const fruits = ref(Fruits);
    const query = ref('')
    const results = ref([])
    return { fruits };
  },
});
</script>
  
<style scoped>
  .modal-container {
    position: fixed; /* Fixe la position pour couvrir toute la fenêtre */
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000; /* Assure que la modale est au-dessus des autres éléments */
  }
  
  /* Scoped components require higher specificity to customize */
  ion-searchbar.custom {
    --background: #f3f3f3;
    --color: #292929;
    --placeholder-color: #c9c9c9;
    --icon-color: #058C42;
    --clear-button-color: #058C42;
    --box-shadow: none;
    --border-radius: 1rem;
  }
  
  ion-searchbar.ios.custom {
    --cancel-button-color: #058C42;
  }
  
  ion-searchbar.md.custom {
    --cancel-button-color: #058C42;
  }
</style>