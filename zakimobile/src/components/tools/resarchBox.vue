<template>
  <div>
    <ion-searchbar
      showCancelButton="focus"
      class="custom"
      placeholder="Trouver mon produit"
      @ionInput="handleInput"
    ></ion-searchbar>
    <ion-list v-if="query">
      <ion-item v-for="(fruit, index) in filteredFruits" :key="index">
        <ion-label> {{ fruit.name }} </ion-label>
      </ion-item>
    </ion-list>
  </div>
</template>

  
<script>
import { IonItem, IonList, IonSearchbar } from '@ionic/vue';
import { defineComponent, ref, computed } from 'vue';
import Fruits from '../../data/Articles';

export default defineComponent({
  components: { IonSearchbar, IonList, IonItem },

  setup() {
    const fruits = ref(Fruits);
    const query = ref(''); // query est maintenant une string et non un boolean.
    const filteredFruits = computed(() => {
      if (!query.value) {
        return []; // retourne un tableau vide si query est vide.
      }
      return fruits.value.filter((fruit) =>
        fruit.name.toLowerCase().includes(query.value.toLowerCase())
      );
    });

    const handleInput = (event) => {
      query.value = event.detail.value;
    };

    return { filteredFruits, handleInput, query };
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