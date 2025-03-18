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
          <p>1</p>
        </div>
      </div>
    </ionHeader>
    <ionContent>
      <div class="main__container articles__details">
        <div class="article__pictures">

        </div>
        <div class="title">
          <h3>Banane douce</h3>
          <p>Fruits</p>
        </div>
        <div class="description">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Laboriosam nostrum natus magni itaque voluptates velit 
            molestiae eius, temporibus exercitationem corporis libero,
            magnam sequi ipsa odio!
          </p>
        </div>
        <div class="weight__price">
          <p>1kg</p>
          <span>$6.00</span>
        </div>
        <div class="delivery__info">

        </div>
        <div class="add__like">

        </div>
      </div>
    </ionContent>
  </ionPage>
</template>

<script>
import {IonPage, IonContent} from '@ionic/vue'
import { defineComponent } from 'vue';

export default defineComponent ({
    components:{
      IonPage, IonContent
    }

    
})
</script>

<style>

</style>