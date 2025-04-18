<template>
  <ion-item>
    <ion-label>
      <h3 v-if="label !== 'Genre'">{{ valeur }}</h3>
      <div v-else class="gender-display">
        <h3>{{ valeur || 'Compléter vos informations' }}</h3>
        <div :class="['gender-icon', genderClass]">
          <i :class="genderIcon" :aria-label="valeur === 'Homme' ? 'Homme' : (valeur === 'Femme' ? 'Femme' : 'Genre non spécifié')"></i>
        </div>
      </div>
      <p>{{ label }}</p>
    </ion-label>
    <IonIcon
      v-if="valeur && valeur.trim() === 'Completez vos informations'"
      :icon="chevronForwardCircleOutline"
      class="delete-icon"
    ></IonIcon>
  </ion-item>
</template>

<script>
import { IonItem, IonLabel, IonItemOptions, IonItemOption, IonIcon, } from '@ionic/vue';
import { chevronForwardCircleOutline } from 'ionicons/icons';
import { defineComponent } from 'vue';

export default defineComponent({
  components: { IonItem, IonLabel, IonItemOptions, IonItemOption,  IonIcon,},
  props: {
    label: {
      type: String,
      required: true,
      default: 'Label'
    },
    valeur: {
      type: String,
      required: false, // rendu optionnel
      default: '' // Valeur par défaut à chaîne vide
    }
  },
  computed: {
    genderClass() {
      if (this.valeur === 'Homme') {
        return 'male';
      } else if (this.valeur === 'Femme') {
        return 'female';
      } else {
        return 'unknown'; // Ajoute une classe pour le cas par défaut
      }
    },
    genderIcon() {
      if (this.valeur === 'Homme') {
        return 'ri-men-line';
      } else if (this.valeur === 'Femme') {
        return 'ri-women-line';
      } else {
        return ''; // Retire l'icône si le genre n'est pas spécifié
      }
    }
  },
  setup() {
    return {
      chevronForwardCircleOutline
    };
  },
});
</script>

<style scoped>
ion-item {
  width: 100%;
  --background: #fff;
  --color: #666666;
  --border-width: 0 0 1px 0;
  --border-style: solid;
  --border-color: rgba(0, 0, 0, 0.12);
  --border-radius: 0;
  --ripple-color: var(--ion-color-primary, purple); /* Utilise une variable CSS Ionic */
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

.gender-icon.unknown {
  /* Style pour le cas où le genre n'est pas spécifié */
  background-color: #eee;
  color: #999;
}

gender-icon i {
  font-size: 16px;
}
</style>