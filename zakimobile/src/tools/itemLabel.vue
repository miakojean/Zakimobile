<template>
  <ion-item>
    <ion-label>
      <template v-if="!isEditing">
        <h3 :class="{ 'italicGray': valeur === 'Complétez vos informations' }">
          <span v-if="type !== 'gender'">{{ valeur || 'Complétez vos informations' }}</span>
          <span v-else class="gender-display">
            <span v-if="valeur === 'Homme'" class="gender-icon male">
              <ion-icon :icon="maleOutline"></ion-icon> M
            </span>
            <span v-else-if="valeur === 'Femme'" class="gender-icon female">
              <ion-icon :icon="femaleOutline"></ion-icon> F
            </span>
            <h3 v-else class="italicGray">
              Non spécifié
            </h3>
          </span>
        </h3>
      </template>
      
      <ion-input v-else
                 v-model="localValue"
                 :type="type"
                 :placeholder="placeholder"
                 @keyup.enter="handleValidate">
      </ion-input>

      <div v-if="isEditing && type === 'gender'" class="gender-options">
        <ion-radio-group v-model="localValue">
          <ion-item lines="none">
            <ion-radio value="Homme" class="gender-option">
              <ion-icon :icon="maleOutline"></ion-icon> Masculin
            </ion-radio>
          </ion-item>
          <ion-item lines="none">
            <ion-radio value="Femme" class="gender-option">
              <ion-icon :icon="femaleOutline"></ion-icon> Féminin
            </ion-radio>
          </ion-item>
        </ion-radio-group>
      </div>
      
      <p>{{ label }}</p>
    </ion-label>
    
    <div class="action-icons">
      <IonIcon v-if="showChevron && !isEditing"
               :icon="chevronForwardCircleOutline"
               class="edit-icon"
               @click="startEditing">
      </IonIcon>
      
      <template v-if="isEditing">
        <IonIcon :icon="closeCircleOutline"
                 class="action-icon cancel-icon"
                 @click="cancelEdit">
        </IonIcon>
        <IonIcon v-if="localValue.trim()"
                 :icon="checkmarkCircleOutline"
                 class="action-icon validate-icon"
                 @click="handleValidate">
        </IonIcon>
      </template>
    </div>
  </ion-item>
</template>

<script>
import { 
  IonItem, 
  IonLabel, 
  IonIcon, 
  IonInput,
  IonRadio,
  IonRadioGroup
} from '@ionic/vue';
import { 
  chevronForwardCircleOutline, 
  closeCircleOutline, 
  checkmarkCircleOutline,
  maleOutline,
  femaleOutline,
  personOutline
} from 'ionicons/icons';
import { ref, computed, watch } from 'vue';

export default {
  props: {
    label: String,
    valeur: String,
    placeholder: String,
    type: {
      type: String,
      default: 'text'
    }
  },
  components: {
    IonItem,
    IonLabel,
    IonIcon,
    IonInput,
    IonRadio,
    IonRadioGroup
  },
  setup(props, { emit }) {
    const isEditing = ref(false);
    const localValue = ref(props.valeur || '');
    
    const showChevron = computed(() => 
      !props.valeur || props.valeur === 'Complétez vos informations'
    );

    const canValidate = computed(() => {
      // Pour le genre, on peut valider même si vide (pour permettre de ne pas choisir)
      if (props.type === 'gender') return true;
      return localValue.value.trim();
    });

    const startEditing = () => {
      isEditing.value = true;
      localValue.value = props.valeur === 'Complétez vos informations' 
        ? '' 
        : props.valeur;
      emit('edit-start');
    };

    const handleValidate = () => {
      if (canValidate.value) {
        isEditing.value = false;
        // Pour le genre, on envoie la valeur même si vide
        const valueToEmit = props.type === 'gender' 
          ? localValue.value 
          : localValue.value.trim();
        emit('update:valeur', valueToEmit);
        emit('validate');
      }
    };

    const cancelEdit = () => {
      isEditing.value = false;
      localValue.value = props.valeur;
    };

    watch(() => props.valeur, (newVal) => {
      localValue.value = newVal;
    });

    return {
      isEditing,
      localValue,
      showChevron,
      canValidate,
      startEditing,
      handleValidate,
      cancelEdit,
      chevronForwardCircleOutline, 
      closeCircleOutline,
      checkmarkCircleOutline,
      maleOutline,
      femaleOutline,
      personOutline
    };
  }
};
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
  width: 100%;
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

.gender-icon i {
  font-size: 16px;
}

.italicGray {
  font-style: italic;
  color: #999;
}

.action-icons {
  display: flex;
  gap: 8px;
}

.edit-icon {
  color: var(--ion-color-medium);
  font-size: 24px;
  cursor: pointer;
}

.cancel-icon {
  color: var(--ion-color-danger);
  font-size: 24px;
  cursor: pointer;
}

.edit-icon:hover, .cancel-icon:hover {
  transform: scale(1.1);
  transition: transform 0.2s ease;
}

ion-input {
  border: 1px solid var(--ion-color-light);
  border-radius: 8px;
  padding: 8px;
  margin-top: 4px;
  width: 100%;
}

.action-icons {
  display: flex;
  gap: 8px;
  align-items: center;
}

.action-icon {
  font-size: 24px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.edit-icon {
  color: var(--ion-color-medium);
}

.cancel-icon {
  color: var(--ion-color-danger);
}

.validate-icon {
  color: var(--ion-color-success);
}

.action-icon:hover {
  transform: scale(1.1);
}

/* Ajoutez ces styles aux styles existants */
.gender-display {
  display: flex;
  align-items: center;
  gap: 8px;
}

.gender-icon {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-radius: 20px;
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
  background-color: #eee;
  color: #999;
}

.gender-options {
  margin-top: 8px;
  width: 100%;
}

.gender-option {
  display: flex;
  align-items: center;
  gap: 8px;
}

ion-radio::part(container) {
  width: 20px;
  height: 20px;
  margin-right: 8px;
}

ion-radio::part(mark) {
  background: none;
  transition: none;
  transform: none;
  border-radius: 0;
  width: 100%;
  height: 100%;
}

ion-radio.radio-checked::part(container) {
  background: var(--ion-color-primary);
  border-color: transparent;
}

ion-radio.radio-checked::part(mark) {
  width: 6px;
  height: 10px;
  border-width: 0px 2px 2px 0px;
  border-style: solid;
  border-color: #fff;
  transform: rotate(45deg);
}
</style>