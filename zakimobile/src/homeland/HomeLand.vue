<template>
  <ionPage>
    <ionHeader>
      <div class="header__container">
        <div class="name">
          <span>Hello</span>
          <p>John Doe</p>
        </div>
        <div class="item__notifs">
          <i class="ri-shopping-cart-2-line"></i>
          <div class="cart"><p>1</p></div>
        </div>
      </div>
    </ionHeader>
    <ionContent>
      <div class="main__container articles__details">
        <div class="article__pictures">
          <img class="product__pictures" src="../data/Articles/bananedouce.jpg" alt="">
        </div>
        <div class="title">
          <h3>Banane douce</h3>
          <p>Fruits</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Laboriosam nostrum natus magni itaque voluptates velit 
            molestiae eius, temporibus exercitationem corporis libero,
            magnam sequi ipsa odio!
          </p>
        </div>
        <div class="weight__price">
          <div class="up__down">
            <i class="ri-indeterminate-circle-line" @click="decrement" ></i>
            <p> {{ amount }}  kg</p>
            <i class="ri-add-circle-line" @click="increment"></i>
          </div>
          <span>$6.00</span>
        </div>
        <div class="delivery__info">
          
        </div>
        <div class="add__cart">
          <mainButton
            label = "Commander"
            @click="voirlechiffre"
          />
          <i class="ri-heart-line" :class="{ loved: isLoved }" @click="toggleLoved"></i>
        </div>
      </div>
    </ionContent>
  </ionPage>
</template>

<script>
import {IonPage, IonContent} from '@ionic/vue'
import { defineComponent, ref } from 'vue';
import MainButton from '../button/mainButton.vue';

export default defineComponent ({
  components:{
    IonPage, IonContent,
    MainButton
  },
  setup() {
    const amount = ref(1)
    const increment = () => {
      if (amount.value >= 1) {
        return amount.value ++
      }
    };
    const decrement = () => {
      if (amount.value > 1) {
        return amount.value --
      } else if (amount.value = 1) {
        return amount.value = 1
      } else return amount.value = 1
    };

    const isLoved = ref(false); // Initialement, le cœur n'est pas aimé

    // Fonction pour basculer l'état "aimé"
    const toggleLoved = () => {
      isLoved.value = !isLoved.value;
    };


    return {
      amount,
      increment,
      decrement,
      isLoved,
      toggleLoved
    }
  } 
})
</script>

<style scoped>

.header__container{
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
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

.title{
  display: flex;
  flex-direction: column;
  justify-content: start;
  width: 100%;
}

.title h3 {
  color: #058C42;
}

.weight__price{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.weight__price span{
  font-size: 1rem;
  font-weight: 700;
  color: #058C42;
}

.up__down{
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 30%;
  font-size: 1rem;
}

.up__down i {
  font-weight: 500;
  color: #058C42;
}

.add__cart{
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.add__cart i {
  font-size: 2rem;
  color: #b8b8b8;
}

.loved{
  color: #b41f1f;
}
</style>