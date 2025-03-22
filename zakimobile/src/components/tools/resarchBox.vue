<template>
  <div>
    <!-- Barre de recherche -->
    <ion-searchbar
      showCancelButton="focus"
      class="custom"
      placeholder="Trouver mon produit"
      @ionInput="handleInput"
      v-model="query"
    ></ion-searchbar>

    <!-- Résultats filtrés -->
    <div v-if="query.trim().length > 0" class="result__box">
      <ul v-if="filteredFruits.length > 0">
        <li v-for="(fruit, index) in filteredFruits" :key="index">
          {{ fruit.name }}
        </li>
      </ul>
      <p v-else>Aucun résultat trouvé</p>
    </div>

    <!-- Bouton pour afficher la recherche -->
    <mainButton @click="() => { console.log(query) }"/>
  </div>
</template>

<script>
import { IonSearchbar } from '@ionic/vue';
import { defineComponent, ref, computed } from 'vue';
import Fruits from '../../data/Articles';
import mainButton from '../../button/mainButton.vue';

export default defineComponent({
  components: { IonSearchbar, mainButton },

  setup() {
    const fruits = ref(Fruits);  // Liste complète des fruits
    const query = ref('');  // Texte de recherche

    // Fonction de filtrage en temps réel
    const filteredFruits = computed(() => {
      if (!query.value.trim()) return fruits.value;  // Si la recherche est vide, afficher tout
      return fruits.value.filter(fruit =>
        fruit.name.toLowerCase().includes(query.value.toLowerCase())
      );
    });

    return { query, filteredFruits };
  },
});
</script>

<style scoped>
  .result__box {
    margin-top: 10px;
  }

  .result__box ul {
    list-style: none;
    padding: 0;
  }

  .result__box li {
    padding: 10px;
    border-bottom: 1px solid #ddd;
  }

  ion-searchbar.custom {
    --background: #f3f3f3;
    --color: #292929;
    --placeholder-color: #c9c9c9;
    --icon-color: #058C42;
    --clear-button-color: #058C42;
    --border-radius: 1rem;
  }
</style>
