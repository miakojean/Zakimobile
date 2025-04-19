<template>
    <ionHeader>
        <div class="header__container">
          <div class="name">
            <IonIcon 
            class="notification-icon" 
            :icon="arrowBackOutline"
            aria-hidden="true"
            ></IonIcon>
          </div>
          <div class="layout__title">
            <ion-label class="title"><h4 class="title">{{ title }}</h4></ion-label>
            <ion-label><p class="subtitle">{{ subtitle }}</p></ion-label> 
          </div>
        </div>
    </ionHeader>
</template>

<script>
import { IonHeader, IonIcon, IonLabel } from '@ionic/vue';
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { arrowBackOutline } from 'ionicons/icons';
export default defineComponent ({

  components: {
    IonHeader, arrowBackOutline, IonIcon, IonLabel
  },
  
  props: {
    title: {
      type: String,
      default: 'Historique de commandes'
    },
    subtitle: {
      type: String,
      default: 'Toutes mes commandes'
    }
  },

  setup() {
    const router = useRouter()
    return {
      router, arrowBackOutline
    }
  }

})
</script>

<style scoped>

.header__container{
  padding: 1rem;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 4rem;
  height: auto;
}

.layout__title{
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  
}

.title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #000000;
  width: 100%;
}

.subtitle {
  font-size: 1rem;
  font-weight: 500;
  color: #636363;
  width: 100%;
}
.item__notifs i {
  font-size: 1.5rem;
  color: #058C42;
}

</style>