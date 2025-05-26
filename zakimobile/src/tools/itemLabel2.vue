<template>
    <ion-item class="info-item">
      <ion-label>
        <!-- Cas général -->
        <div v-if="label !== 'Genre'" class="content-wrapper">
          <h3 :class="{ 'empty-field': !value }">
            {{ displayValue }}
          </h3>
          <p>{{ label }}</p>
        </div>
  
        <!-- Cas spécifique pour le genre -->
        <div v-else class="gender-wrapper">
          <h3 :class="{ 'empty-field': !value }">
            {{ displayValue }}
          </h3>
          <div v-if="value" :class="['gender-icon', genderClass]">
            <ion-icon :icon="genderIcon"></ion-icon>
          </div>
          <p>{{ label }}</p>
        </div>
      </ion-label>
  
      <!-- Bouton d'édition (optionnel) -->
      <ion-button 
        v-if="editable && !value" 
        fill="clear"
        @click="$emit('edit-requested')"
      >
        <ion-icon slot="icon-only" :icon="addCircleOutline"></ion-icon>
      </ion-button>
    </ion-item>
  </template>
  
  <script>
  import { 
    IonItem, 
    IonLabel, 
    IonButton,
    IonIcon
  } from '@ionic/vue';
  import { 
    maleOutline, 
    femaleOutline,
    addCircleOutline
  } from 'ionicons/icons';
  
  export default {
    name: 'SmartInfoItem',
    components: { IonItem, IonLabel, IonButton, IonIcon },
    props: {
      label: {
        type: String,
        required: true
      },
      value: {
        type: [String, Number, Date],
        default: null
      },
      editable: {
        type: Boolean,
        default: true
      }
    },
    setup() {
      return {
        addCircleOutline,
        maleOutline,
        femaleOutline
      }
    },
    computed: {
      displayValue() {
        return this.value || 'Compléter vos informations';
      },
      genderClass() {
        return this.value === 'Homme' ? 'male' : 'female';
      },
      genderIcon() {
        return this.value === 'Homme' ? maleOutline : femaleOutline;
      }
    }
  };
  </script>
  
  <style scoped>
  .info-item {
    --inner-padding-end: 8px;
    --padding-start: 0;
  }
  
  .empty-field {
    color: var(--ion-color-medium);
    font-style: italic;
  }
  
  .content-wrapper, .gender-wrapper {
    display: flex;
    flex-direction: column;
  }
  
  .gender-wrapper {
    position: relative;
    padding-right: 40px; /* Espace pour l'icône */
  }
  
  .gender-icon {
    position: absolute;
    right: 0;
    top: 0;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .male {
    background-color: #d4e6ff;
    color: #2a7bf6;
  }
  
  .female {
    background-color: #ffd4e5;
    color: #f62a7b;
  }
  
  h3 {
    font-size: 1rem;
    font-weight: 500;
    margin: 0;
  }
  
  p {
    font-size: 0.75rem;
    color: var(--ion-color-medium);
    margin: 4px 0 0;
  }
</style>