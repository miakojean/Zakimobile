<template>
    <ionHeader>
        <div class="header__container">
          <div class="name">
            <IonIcon :icon="arrowBack"></IonIcon>
          </div> 
        </div>
    </ionHeader>
</template>

<script>
import { IonHeader } from '@ionic/vue';
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { arrowBack } from 'ionicons/icons';
export default defineComponent ({

    components: {
      IonHeader, arrowBack
    },
    setup() {
      const router = useRouter()
      return {
        router, arrowBack, arrowBack
      }
    }

})
</script>

<style>

.header__container{
  padding: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: auto;
}

.item__notifs{
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
}

.item__notifs .cart{
  position: absolute;
  top: -10%;
  left: 30%;
  background: #ff5e5e;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  height: 25px;
  border-radius: 50%;
}

.cart p{
  color: white;
}

.item__notifs i {
  font-size: 1.5rem;
  color: #058C42;
}

</style>