<template>
    <ionPage>
        <ionContent>
            <div class="notifications-container">
                <div class="success">
                    <div class="flex">
                    <div class="flex-shrink-0">
                        
                        <svg class="succes-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                        </svg>
                    </div>
                    <div class="success-prompt-wrap">
                        <p class="success-prompt-heading">Commande passée !</p>
                        
                        <div class="success-prompt-prompt">
                        <p> Commande N° AAA 1234567890 </p>
                        <p> Prix Total: {{ price }} </p>
                        <p> + 200 FCFA (commission Zaki)</p>
                        </div>
                        <div class="success-button-container">
                            <span class="success-button-main" @click="seeOrder"> Info sur ma commande </span>
                            <span class="success-button-secondary" @click="closeModal"> Fermer </span>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </ionContent>
    </ionPage>
</template>

<script>
import { defineComponent } from 'vue';
import { IonContent, IonPage } from '@ionic/vue';
export default defineComponent({
    name: 'DoneTools',
    components: {
        IonPage, IonContent
    },
    props: {
        price: {
            type: Number,
            required: false,
        },
        orderNumber: {
            type: String,
            required: false,
        },
    },
    emits: ['close', 'seeOrder'],
    setup(props, { emit }) { // On destructure le contexte pour avoir accès à emit
        const seeOrder = () => {
            emit('seeOrder'); // Émission de l'événement
        };

        const closeModal = () => {
            emit('close'); // Émission de l'événement
        };

        return {
            seeOrder,
            closeModal
        };
    },
})
</script>

<style scoped>
/* From Uiverse.io by kennyotsu */ 
.notifications-container {
  width: 100%;
  height: auto;
  font-size: 0.875rem;
  line-height: 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
}

.flex {
  display: flex;
}

.flex-shrink-0 {
  flex-shrink: 0;
}

.success {
  padding: 1rem;
  border-radius: 0.375rem;
  background-color: rgb(240 253 244);
}

.succes-svg {
  color: rgb(74 222 128);
  width: 1.25rem;
  height: 1.25rem;
}

.success-prompt-wrap {
  margin-left: 0.75rem;
}

.success-prompt-heading {
  font-weight: bold;
  color: rgb(22 101 52);
}

.success-prompt-prompt {
  margin-top: 0.5rem;
  color: rgb(21 128 61);
}

.success-button-container {
  display: flex;
  margin-top: 0.875rem;
  margin-bottom: -0.375rem;
  margin-left: -0.5rem;
  margin-right: -0.5rem;
}

.success-button-main {
  padding-top: 0.375rem;
  padding-bottom: 0.375rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  background-color: #ECFDF5;
  color: rgb(22 101 52);
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: bold;
  border-radius: 0.375rem;
  border: none
}

.success-button-main:hover {
  background-color: #D1FAE5;
}

.success-button-secondary {
  padding-top: 0.375rem;
  padding-bottom: 0.375rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  margin-left: 0.75rem;
  background-color: #ECFDF5;
  color: #065F46;
  font-size: 0.875rem;
  line-height: 1.25rem;
  border-radius: 0.375rem;
  border: none;
}

</style>