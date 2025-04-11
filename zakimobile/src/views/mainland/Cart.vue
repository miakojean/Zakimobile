<template>
  <ionPage>
    <headerLayout2/>
    <ionContent>
      <div class="main__container profile__container">
        <ion-list :inset="true" lines="full" class="list__info">
          <!-- Boucle sur les articles du panier -->
          <cartItem 
            v-for="(item, index) in cart.cartItems" 
            :key="index"
            :item="item"
            @remove="cart.removeItem(index)"
            @update:modelValue="(newQty) => cart.updateQuantity(index, newQty)"
          />
        </ion-list>
        <aboutMoney
          :subtotal="Number(total)" 
          :delivery-fee="Number(1000)"
        />
        <nextButton @click="voirPanier"/>
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
import { defineComponent, ref, onMounted, computed } from 'vue';
import axios from 'axios';
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
    const voirPanier = () => {
      console.log(cart);
    };

    // Reactive user object
    const user = ref({
      username: '',
      first_name: '',
      last_name: '',
      email: '',
    });

    // Reactive profile object
    const profile = ref ({
      gender:'',
      phone_number:'',
      address: '',
      birthday:'',
      commune:'',
    });

    // Reactive error message
    const errorMessage = ref('');

    // Reactive loading state
    const isLoading = ref(true);

    // Function to fetch user data
    const fetchUserData = async () => {
      try {
        isLoading.value = true; // Start loading
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
          router.push('/signin'); // Redirect to login if no token
          return;
        }

        // Fetch user data from the backend
        const response = await axios.get('http://127.0.0.1:8000/account/profile/', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        // Log the entire API response to debug
        console.log('API Response:', response.data);

        // Update the reactive objects with the response data
        user.value = response.data.user; // Assign user data directly
        profile.value = response.data.profile; // Assign profile data (if it exists)
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // Token is expired or invalid
          localStorage.removeItem('access_token'); // Clear the expired token
          router.push('/connexion'); // Redirect to login
        } else {
          console.error('Failed to fetch user data:', error);
          errorMessage.value = 'Failed to fetch user data. Please try again.';
        }
      } finally {
        isLoading.value = false; // Stop loading
      }
    };

    // Call the function to fetch user data when the component is mounted
    onMounted(() => {
      fetchUserData();
    });

    // Return the reactive objects and function (if needed in the template)
    return {
      user, profile, errorMessage, isLoading,
      fetchUserData, router, voirPanier, cart
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