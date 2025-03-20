<template>
    <ionHeader>
        <div class="header__container">
            <div class="name">
              <i class="fa-solid fa-arrow-left-long" @click="()=>{router.push('/HomePage')}"></i>
            </div> 
            <div class="item__notifs">
                <i class="ri-shopping-cart-2-line"></i>
                <div class="cart"><p>0</p></div>
            </div>
        </div>
    </ionHeader>
</template>

<script>
import { IonHeader } from '@ionic/vue';
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
export default defineComponent ({

    components: {
      IonHeader,
    },
    setup() {
      const router = useRouter()
      return {
        router
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