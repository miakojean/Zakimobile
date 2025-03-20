<template>
  <IonPage>
    <headerLayout/>
    <IonContent>
      <resarchBox/>
      <suggestionLists/>
      <div class="articles__container">
        <div class="about__articles">
          <img class="articles__pictures" src="../data/Articles/bananedouce.jpg" alt="banane douce">
          <div class="info">
            <p>Banane douce</p>
            <span>1 Kg</span>
          </div>
          <span>$ 12.00</span>
        </div>
        <div class="about__articles">
          <img class="articles__pictures" src="../data/Articles/bananedouce.jpg" alt="banane douce">
          <div class="info">
            <p>Banane douce</p>
            <span>1 Kg</span>
          </div>
          <span>$ 12.00</span>
        </div>
        <div class="about__articles">
          <img class="articles__pictures" src="../data/Articles/bananedouce.jpg" alt="banane douce">
          <div class="info">
            <p>Banane douce</p>
            <span>1 Kg</span>
          </div>
          <span>$ 12.00</span>
        </div>
      </div>
    </IonContent>
  </IonPage>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'; // Import defineComponent
import { IonPage, IonContent } from '@ionic/vue';
import HeaderLayout from '../components/tools/headerLayout.vue';
import Fruits from '../data/Articles';
import MainButton from '../button/mainButton.vue';
import resarchBox from '../components/tools/resarchBox.vue';
import suggestionLists from '../components/tools/suggestionLists.vue';

export default defineComponent({
  components: {
    IonPage,
    IonContent,
    HeaderLayout,
    MainButton,
    resarchBox,
    suggestionLists
  },
  setup() {
    const fruits = ref(Fruits); // Use ref to make it reactive

    const voirTableau = () => {
      console.log(fruits.value); // Access the value of ref using .value
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
  border: 1px solid gray;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

</style>