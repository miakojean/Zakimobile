<template>
  <ion-page>
    <ion-content>
      <div class="main-content">
        <div class="head__container">
          <div class="pic__frame">
            <img 
              :src="'http://127.0.0.1:8000/account' + profile.profile_picture" 
              alt="Profile picture"
              class="profile-image"
            >
          </div>
          <div class="head__text">
            <ion-Label class="head__label"><h3>{{ user.first_name }} {{ user.last_name }}</h3></ion-Label>
            <p>{{ user.email }}</p> 
          </div>
        </div>
        <editProfileButton @click="()=>{router.push('/profile')}"/>

        <ion-item-divider>
          <ion-label><h3 class="diviseur">Paramètres généraux</h3></ion-label>
        </ion-item-divider>

        <ion-list :inset="true" class="list__container">
          <ion-item :button="true">
            <ion-icon color="danger" slot="start" :icon="notificationsCircle" size="medium"></ion-icon>
            <ion-label><p>Notifications et sons</p></ion-label>
            <ion-note slot="end">6</ion-note>
          </ion-item>
          <ion-item :button="true">
            <ion-icon color="tertiary" slot="start" :icon="mailOutline" size="medium"></ion-icon>
            <ion-label><p>Newsletter</p></ion-label>
            <ion-note slot="end">15</ion-note>
          </ion-item>
          <ion-item :button="true">
            <ion-icon color="success" slot="start" :icon="moonOutline" size="medium"></ion-icon>
            <ion-label><p>Thème</p></ion-label>
            <ion-note slot="end">3</ion-note>
          </ion-item>
          <ion-item :button="true">
            <ion-icon color="warning" slot="start" :icon="notificationsCircle" size="medium"></ion-icon>
            <ion-label><p>Alertes de prix</p></ion-label>
            <ion-note slot="end">8</ion-note>
          </ion-item>
        </ion-list>

        <ion-item-divider>
          <ion-label><h3 class="diviseur">Politiques et mentions légales</h3></ion-label>
        </ion-item-divider>

        <ion-list :inset="true" class="list__container">
          <ion-item :button="true">
            <ion-icon color="danger" slot="start" :icon="shieldCheckmarkOutline" size="medium"></ion-icon>
            <ion-label><p>Politique de confidentialité</p></ion-label>
          </ion-item>
          <ion-item :button="true">
            <ion-icon color="tertiary" slot="start" :icon="libraryOutline" size="medium"></ion-icon>
            <ion-label><p>Conditions générales d'utilisation</p></ion-label>
          </ion-item>
          <ion-item :button="true">
            <ion-icon color="success" slot="start" :icon="helpOutline" size="medium"></ion-icon>
            <ion-label><p>Aide</p></ion-label>
          </ion-item>
          <ion-item :button="true">
            <ion-icon color="warning" slot="start" :icon="peopleOutline" size="medium"></ion-icon>
            <ion-label @click="voirInfo"><p>Qui sommes nous?</p></ion-label>
          </ion-item>
        </ion-list>
        
        <ion-item-divider>
          <ion-label><h3 class="diviseur">Deconnexion</h3></ion-label>
        </ion-item-divider>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent, ref, computed } from 'vue';
import { IonPage, IonContent, IonLabel, IonList, IonItemDivider, } from '@ionic/vue';
import { chevronForward, listCircle, personOutline, moonOutline,
  notificationsCircle, mailOutline, readerOutline, shieldCheckmarkOutline,
  libraryOutline, helpOutline, peopleOutline
} from 'ionicons/icons';
import EditProfileButton from '../../button/editProfileButton.vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../../_services/authStore.js';
import { storeToRefs } from 'pinia';

export default defineComponent ({
  components: {
    IonPage, IonContent, IonLabel, IonList, EditProfileButton, IonItemDivider,
  },
  setup() {

    const userStore = useUserStore()
    const { state } = storeToRefs(userStore);
    const router = useRouter()
    
    // Accès réactif aux données
    const user = computed(() => state.value.user);
    const profile = computed(() => state.value.profile);
    
    const voirInfo = () => {
      console.log(user)
    }

    return { chevronForward, listCircle, personOutline, notificationsCircle, mailOutline, moonOutline, 
      readerOutline, libraryOutline, helpOutline, shieldCheckmarkOutline, peopleOutline,
      voirInfo, router, userStore, state, user, profile
    }
  },
})
</script>

<style scoped>
.main-content {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.head__container {
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
}

.head__text {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.list__container {
  width: 100%;
  margin: 0;
}

img {
  width: 50px;
  height: 50px;
  border: 1px solid #bebebe;
  border-radius: 50%;
  object-fit: cover;
}

h3 {
  font-size: 1rem;
  font-weight: 600;
  color: #8b8b8b;
  margin: 0;
}

p {
  font-size: 0.9rem;
  font-weight: 400;
  color: #696969;
  margin: 0;
}

ion-item-divider {
--background: none;
--color: #494949;

--padding-top: 0px;
--padding-bottom: 0px;
--padding-start: 20px;
--padding-end: 20px;
}

</style>