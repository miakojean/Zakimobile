<template>
  <IonPage>
    <headerLayout/>
    <IonContent>
      <resarchBox/>
      <suggestionLists/>
      <div class="articles__container">
        <div class="about__articles"  v-for="(fruit, index) in fruits" :key="index">
          <img class="articles__pictures" :src=" fruit.image " :alt="fruit.name">
          <div class="info">
            <p>{{ fruit.name }}</p>
            <span>1 {{ fruit.metrics }}</span>
          </div>
          <span>{{ fruit.prix }} FCFA</span>
          <div class="add__products">
            <div class="add__logo">
              <ion-icon name="add-circle-outline"></ion-icon>
            </div>
          </div>
        </div>
      </div>
    </IonContent>
  </IonPage>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'; // Import defineComponent
import { IonPage, IonContent, IonIcon } from '@ionic/vue';
import { addCircleOutline } from 'ionicons/icons';
import HeaderLayout from '../components/tools/headerLayout.vue';
import Fruits from '../data/Articles';
import MainButton from '../button/mainButton.vue';
import resarchBox from '../components/tools/resarchBox.vue';
import suggestionLists from '../components/tools/suggestionLists.vue';

export default defineComponent({
  components: {
    IonPage,
    IonContent,
    IonIcon,
    HeaderLayout,
    MainButton,
    resarchBox,
    suggestionLists,
    addCircleOutline
  },
  setup() {
    const fruits = ref(Fruits); // Use ref to make it reactive

    const voirTableau = () => {
      console.log(fruits.value[0]); // Access the value of ref using .value
    };

    // Use onMounted inside setup
    onMounted(() => {
      voirTableau();
    });

    return {
      fruits,
      voirTableau,
    };
  },
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
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.2), 0 6px 8px 0 rgba(0, 0, 0, 0.19);
}

.about__articles span {
  color: #058C42;
  font-weight: 600;
  text-align: start;
}
.info{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.2rem;
}

.info p{
  font-weight: 600;
  color: #058C42;
}

.info span {
  font-weight: 600;
  color: #616161;
  font-size: 0.9rem;
}

.add__products{
  width: 100%;
  color: #616161;
  display: flex;
  justify-content: end;

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