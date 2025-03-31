<template>
  <ion-item>
    <ion-label>
      <h3 v-if="label !== 'Genre'">{{ valeur }}</h3>
      <div v-else class="gender-display">
        <h3>{{ valeur }}</h3>
        <div :class="['gender-icon', genderClass]">
          <i :class="genderIcon"></i>
        </div>
      </div>
      <p>{{ label }}</p>
    </ion-label>
  </ion-item>
</template>

<script>
import { IonItem, IonLabel } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: { IonItem, IonLabel },
  props: {
    label: {
      type: String,
      required: true,
      default: 'Label'
    },
    valeur: {
      type: String,
      required: true,
      default: 'Valeur du label'
    }
  },
  computed: {
    genderClass() {
      return this.valeur === 'Homme' ? 'male' : 'female';
    },
    genderIcon() {
      return this.valeur === 'Homme' ? 'ri-men-line' : 'ri-women-line';
    }
  }
});
</script>

<style scoped>
ion-item {
  width: 100%;
  --background: #fff;
  --color: #666666;
  
  /* Modifications pour les lignes */
  --border-width: 0 0 1px 0;
  --border-style: solid;
  --border-color: rgba(0, 0, 0, 0.12);
  
  --border-radius: 0;
  --ripple-color: purple;
  --padding-start: 0;
  --inner-padding-end: 0;
}

h3 {
  font-size: 1rem;
  font-weight: 700;
  color: #333;
}

p {
  font-size: 0.8rem;
  font-weight: 400;
  color: #666666;
  margin-top: 4px;
}

.gender-display {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.gender-icon {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.gender-icon.male {
  background-color: #d4e6ff;
  color: #2a7bf6;
}

.gender-icon.female {
  background-color: #ffd4e5;
  color: #f62a7b;
}

.gender-icon i {
  font-size: 16px;
}
</style>