<template>
    <IonPage>
      <headerLayout :userName = "user.username"/>
      <resarchBox/>
      <IonContent>
        <suggestionLists/>
        <div class="articles__container">
          <div class="about__articles"  
            v-for="(fruit, index) in fruits"  
            :key="index"
            >
            <img class="articles__pictures" :src=" fruit.image " :alt="fruit.name">
            <div class="info">
              <p>{{ fruit.name }}</p>
              <span>1 {{ fruit.metrics }}</span>
            </div>
            <div class="add__products">
              <span style="margin-left: 1rem; font-weight: 600;">{{ fruit.prix }} FCFA</span>
              <div class="add__logo">
                <IonIcon class="add__products" :icon="addCircleOutline" @click="voirPanier(index)"></IonIcon>
              </div>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
</template>
  
<script>
  import { defineComponent, ref, onMounted} from 'vue'; // Import defineComponent
  import { IonPage, IonContent, IonIcon, IonFooter, } from '@ionic/vue';
  import {addCircleOutline} from 'ionicons/icons';
  import HeaderLayout from '../../components/tools/headerLayout.vue';
  import Fruits from '../../data/Articles';
  import MainButton from '../../button/mainButton.vue';
  import resarchBox from '../../components/tools/resarchBox.vue';
  import suggestionLists from '../../components/tools/suggestionLists.vue';
  import { useRouter } from 'vue-router';
  import NavigationFooter from '../../components/tools/navigationFooter.vue';
  import axios from 'axios';
  import { useAboutCartStore } from '../../_services/aboutCart';
  
  export default defineComponent({
    components: {
      IonPage, IonFooter, IonContent,
      IonIcon,
      HeaderLayout,
      MainButton,
      resarchBox,
      suggestionLists,
      NavigationFooter
    },
    setup() {
      const router = useRouter()
      const fruits = ref(Fruits); // Use ref to make it reactive
      const store = useAboutCartStore();
      const voirPanier = (index) => {
        store.cartTotalPrice
        store.addToCart(fruits.value[index]); // Add the first fruit to the cart as an example
        console.log(store.cartTotalPrice)
      }
  
      const goToArticleDetails = (slug) => {
        router.push({ name: 'articleDetails', params: { slug: slug } });
      };
  
      const user = ref({
        username: '',
        first_name: '',
        last_name: '',
        email: '',
      });
  
      const fetchUserData = async () => {
        try {
          // Fetch user data from the backend
          const accessToken = localStorage.getItem('access_token');
          if (!accessToken) {
            router.push('/signin'); // Redirect to login if no token
            return;
          }
          const response = await axios.get('http://127.0.0.1:8000/account/profile/', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          // Update the reactive objects with the response data
          console.log(response.data)
          user.value = response.data.user; // Assign user data directly
        } catch (error) {
          if (error.response && error.response.status === 401) {
            // Token is expired or invalid
            localStorage.removeItem('access_token'); // Clear the expired token
            router.push('/signin'); // Redirect to login
          } else {
            console.error('Failed to fetch user data:', error);
          }
        }
    };

    onMounted(() => {
      fetchUserData();
    });

    return {
      fruits, router, user, fetchUserData, addCircleOutline,
      voirPanier
    };
  }, // on garde cette version
});
</script>
  
<style>
  
  .about__articles{
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0;
    border: 1px solid #E0E0E0;
    /*box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.2), 0 6px 8px 0 rgba(0, 0, 0, 0.19);*/
  }
  
  .about__articles span {
    color: #058C42;
    font-weight: 400;
    text-align: start;
  }
  .info{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
  }
  
  .info p{
    font-weight: 400;
    color: #058C42;
  }
  
  .info span {
    font-weight: 400;
    color: #616161;
    font-size: 0.9rem;
  }
  
  .add__products{
    width: 100%;
    color: #616161;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .add__logo{
    padding: 0.5rem;
    background: #058C42;
    border-radius: 1rem 0 1rem 0 ;
    width: 50px;
    display: flex;
    flex-direction: column ;
    align-items: center;
    justify-content: center;
  }
  
  .add__products ion-icon {
    font-size: 24px; /* Adjust size as needed */
    color: #f3f3f3;  /* Ensure the color is visible */
  }
</style>