<template>
  <ionPage>
    <headerLayout2
      title="Mon panier"
      subtitle="Tous mes articles"
    />
    <ionContent>
      <div class="main__container profile__container" v-if="cart.length > 0">
        <ion-list :inset="true" lines="full" class="list__info">
          <!-- Boucle sur les articles du panier -->
          <cartItem 
            v-for="(item, index) in cart" 
            :key="index"
            :item="item"
            @remove="remove(index)"
            @update:modelValue="(newQty) => cart.updateQuantity(index, newQty)"
            @lookprice="voirPanier"
          />
        </ion-list>
        <aboutMoney
          :subtotal= "store.cartTotalPrice"
          :delivery-fee="Number(1000)"
        />
        <nextButton @click="voirPanier"/>
      </div>
      <div class="main__container profile__container" v-else>
        <h3>Votre panier est vide</h3>
        <p>Ajoutez des articles à votre panier pour commencer vos achats.</p>
      </div>
    </ionContent>
  </ionPage>
</template>
  
<script>
import { IonPage, IonContent, IonHeader, IonList } from '@ionic/vue';
import headerLayout2 from '../../components/tools/headerLayout2.vue';
import CartItem from '../../components/tools/cart/cartItem.vue';
import aboutMoney from '../../components/tools/cart/aboutMoney.vue';
import nextButton from '../../button/nextButton.vue';
import itemLabel from '../../tools/itemLabel.vue';
import itemList from '../../tools/itemLabel2.vue';
import { useRouter } from 'vue-router';
import { defineComponent, ref,} from 'vue';
import { useAboutCartStore } from '../../_services/aboutCart';

export default defineComponent({
  components: {
    IonPage, itemLabel, IonList,
    IonContent, itemList, headerLayout2,
    IonHeader, CartItem, aboutMoney, nextButton
  },

  setup() {
    const router = useRouter();

    const store = useAboutCartStore();
    const cart = store.cart;
    const cartItemPrice = store.cartTotalPrice;
    const voirPanier = () => {
      console.log(cartItemPrice);
    };
    const remove = store.removeFromCart; 

    // Reactive error message
    const errorMessage = ref('');

    // Reactive loading state
    const isLoading = ref(true);

    // Return the reactive objects and function (if needed in the template)
    return {
      errorMessage, isLoading, router, voirPanier, cart, remove,
      store, cartItemPrice
    };
  },
});
</script>
  
<style scoped>
.center__flex{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.profile__container{
  gap: 0.5rem;
  height: auto;
}

i{
  font-size: 1rem;
}

p{
  font-size: 1rem;
}

.main__header{
  display:flex;
  justify-content: space-between;
  width: 100%;
  padding: 1rem;
}

.list__info{
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  gap: 1rem;
}

.main__header .done{
  padding: 0.3rem;
  background: #67d89a;
  border-radius: 1.5rem;
  color: white;
}

.profile__pic{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.profile__pictures{
  width:100%;
  background:none;
  padding: 3.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
}

.profile__pictures i {
  font-size: 2.5rem;
  color: #6d6d6d;
}

.profile__pic h3 {
  text-align: left;
}

.profile__pic span {
  color: #058C42;
}

.profile__info{
  width: 100%;
}

.logout{
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  width: 100%;
}

.logout i{
  color :#058C42;
  font-size: 1.5rem;
}
</style>