<template>
  <IonHeader>
    <div class="header__container">
      <div class="name">
        <span>Hello</span>
        <p>{{ user.username }}</p>
      </div>
      <div class="notifications" aria-label="Notifications">
        <IonIcon 
          class="notification-icon" 
          :icon="notificationsOutline"
          aria-hidden="true"
        ></IonIcon>
        <ion-badge 
          color="danger"
          aria-live="polite"
        >47</ion-badge>
      </div>
    </div>
  </IonHeader>
</template>

<script>
import { IonHeader, IonIcon } from '@ionic/vue';
import { notificationsOutline } from 'ionicons/icons'; // Ou notifications
import { defineComponent, computed } from 'vue';
import { useUserStore } from '../../_services/authStore.js';
import { storeToRefs } from 'pinia';

export default defineComponent ({

  components: {
    IonHeader,
    IonIcon
  },

  setup(){
    const userStore = useUserStore()
    const { state } = storeToRefs(userStore);
    const user = computed(() => state.value.user);
    
    return { notificationsOutline, userStore, state, user }; // Renomme si nécessaire
  }
  
});
</script>

<style scoped>

.header__container{
  padding: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: auto;
}

.name span {
  font-family: 1.5rem;
  font-weight: 400;
}

.name p {
  font-family: 1.5rem;
  font-weight: 600;
  color: #058C42;
}

.notification-icon {
  font-size: 1.5rem;
  color: #058C42;
}

.notifications {
  position: relative;
  display: inline-block;
}

.dot-badge {
  --background: #ff6d00; /* Orange personnalisé */
  --color: transparent; /* Cache le texte */
  
  position: absolute;
  top: -2px;
  right: -2px;
  width: 12px;
  height: 12px;
  padding: 0;
  min-width: auto;
  font-size: 0;
}
ion-badge {
  position: absolute;
  top: -18px;
  right: -2px;
  font-size: 0.7em;
  min-width: 18px;
  height: 18px;
  line-height: 18px;
}

ion-icon {
  font-size: 1.5rem; 
  color: #058C42;
}

</style>