<template>
  <ionPage>
    <headerLayout2 />
    <ionContent>
      <div class="main__container articles__details">
        <div class="article__pictures">
          <img
            class="product__pictures"
            :src="articleDetails ? articleDetails.image : ''"
            :alt="articleDetails ? articleDetails.name : ''"
          />
        </div>
        <div class="title">
          <h3>{{ articleDetails ? articleDetails.name : 'Loading...' }}</h3>
          <p>Fruits</p>
          <p> {{ articleDetails ? articleDetails.description : '' }} </p>
        </div>
        <div class="weight__price">
          <div class="up__down">
            <p> {{ amount }} kg</p> 
          </div>
          <span>$6.00</span>
        </div>
        <div class="delivery__info">
          <i class="ri-truck-line"></i>
          <p>Livré en moins d'une heure</p>
        </div>
        <div class="add__cart">
          <mainButton label="Commander" />
        </div>
      </div>
    </ionContent>
  </ionPage>
</template>

<script>
import { IonPage, IonContent } from '@ionic/vue';
import { defineComponent, ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router'; // Import useRoute
import MainButton from '../button/mainButton.vue';
import headerLayout2 from '../components/tools/headerLayout2.vue';
import Fruits from '../data/Articles';

export default defineComponent({
  components: {
    IonPage,
    IonContent,
    MainButton,
    headerLayout2,
  },
  setup() {
    const route = useRoute(); // Use useRoute to get the route object
    const amount = ref(1);
    const isLoved = ref(false);
    const articleSlug = ref(route.params.slug);
    const articleDetails = ref(null);

    const increment = () => {
      amount.value++;
    };

    const decrement = () => {
      if (amount.value > 1) {
        amount.value--;
      }
    };

    const iLike = () => {
      isLoved.value = !isLoved.value;
    };

    // Find the article based on the slug
    onMounted(() => {
      articleDetails.value = Fruits.find(
        (article) => article.name.toLowerCase().replace(/\s+/g, '-') === articleSlug.value
      );
    });

    const price = ref(6); // Example price
    const total = computed(() => {
      return amount.value * price.value;
    });

    return {
      amount,
      articleSlug,
      increment,
      articleDetails,
      decrement,
      isLoved,
      iLike,
      price,
      total,
    };
  },
});
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

.delivery__info{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: #ebebeb;
  border-radius: 1rem;
}

.delivery__info i{
  font-size: 2rem;
  color: #6b6b6b;
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
}

.ri-heart-line{
  color: #adadad;
}

.ri-heart-fill {
  color: #ff3a3a;
}
</style>