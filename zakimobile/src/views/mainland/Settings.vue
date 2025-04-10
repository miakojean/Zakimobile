<template>
  <ion-Page>
    <ion-Content class="ion-padding">
      <div class="head__container">
        <div class="pic__frame">
          <img src="../../assets//Articles/pomme.png" alt="pomme">
        </div>
        <div class="head__text">
          <ion-Label class="head__label"><h3>Fugana Kwaki</h3></ion-Label>
          <p>Fugnanakwaki@gmail.com</p> 
        </div>
      </div>
      <editProfileButton/>
      <ion-list :inset="true" class="list__container">
        <ion-item :button="true">
          <ion-icon color="danger" slot="start" :icon="listCircle" size="large"></ion-icon>
          <ion-label><p>Notifications et sons</p></ion-label>
          <ion-note slot="end">6</ion-note>
        </ion-item>
        <ion-item :button="true">
          <ion-icon color="tertiary" slot="start" :icon="listCircle" size="large"></ion-icon>
          <ion-label><p>Langue</p></ion-label>
          <ion-note slot="end">15</ion-note>
        </ion-item>
        <ion-item :button="true">
          <ion-icon color="success" slot="start" :icon="listCircle" size="large"></ion-icon>
          <ion-label><p>Thème</p></ion-label>
          <ion-note slot="end">3</ion-note>
        </ion-item>
        <ion-item :button="true">
          <ion-icon color="warning" slot="start" :icon="listCircle" size="large"></ion-icon>
          <ion-label><p>Reminders</p></ion-label>
          <ion-note slot="end">8</ion-note>
        </ion-item>
    </ion-list>
    </ion-Content>
  </ion-Page>
</template>

<script>
import { defineComponent } from 'vue';
import { IonPage, IonContent, IonLabel, IonList } from '@ionic/vue';
import { chevronForward, listCircle } from 'ionicons/icons';
import EditProfileButton from '../../button/editProfileButton.vue';
export default defineComponent ({
  components: {
    IonPage, IonContent, IonLabel, IonList, EditProfileButton
  },
  setup() {
      return { chevronForward, listCircle };
    },
})
</script>

<style scoped>
.ion-padding{
  padding: 0;
  border: 1px solid #000;
}

h3 {
  font-size: 1rem;
  font-weight: 600;
  color: #8b8b8b;
}

p{
  font-size: 0.9rem;
  font-weight: 500;
  color: #696969;
}

.head__container{
  border: 1px solid #000;
  display: flex;
  justify-content: left;
  align-items: center;
  gap: 1rem;
  width: 100%;
}

img {
  width: 50px;
  height: 50px;
  border: 1px solid #bebebe;
  border-radius: 50%;
}

.list__container {
  border: 1px solid #000;
}
</style>