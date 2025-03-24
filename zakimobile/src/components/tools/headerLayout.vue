<template>
  <ionHeader>
    <div class="header__container">
      <div class="name">
        <span>Hello</span>
        <p>John Doe</p>
      </div>
      <div class="notifications__family">
        <div class="items__notifs">
          <ion-icon name="notifications-outline"></ion-icon>
          <ion-badge color="danger">{{notif}}</ion-badge>
        </div>
        <div class="items__notifs">
          <ion-icon name="cart-outline"></ion-icon>
          <ion-badge color="danger">{{ articles }}</ion-badge>
        </div>
      </div>
    </div>
  </ionHeader>
</template>

<script>
import { IonHeader, IonIcon } from '@ionic/vue';
import { defineComponent, ref } from 'vue';

export default defineComponent ({

  props: {
    notif: {
      type: Number,
      default: null
    },
    articles: {
      type: Number,
      default: 0,
    }
  },

  components: {
    IonHeader,
    IonIcon
  },
  
});
</script>

<style>

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


.notifications__family{
  display: flex;
  gap: 1rem;
}

.item__notifs{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem;
}

.cart p{
  color: white;
}

.items__notifs i {
  font-size: 1.5rem;
  color: #058C42;
}

.items__notifs{
  position: relative;
}


ion-icon {
  font-size: 1.5rem; 
  color: #058C42;
}

ion-badge {
  position: absolute;
  top: -70%;
  left: -20%;
}
</style>