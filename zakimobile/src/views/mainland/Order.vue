<template>
  <ionPage>
    <HeaderLayout2/>
    <ion-content>
      
      <orderHistory/>
      

    </ion-content>

  </ionPage>
</template>
  
<script>
import { IonPage, IonContent, IonLabel, IonList, IonItemDivider, } from '@ionic/vue';
import { defineComponent } from 'vue';
import secondButton2 from '../../button/secondButton2.vue';
import mainButton from '../../button/mainButton.vue'
import stepper from '../../components/tools/stepper.vue';
import FooterLayout from '../../components/tools/footerLayout.vue';
import HeaderLayout2 from '../../components/tools/headerLayout2.vue';
import orderHistory from './mainlandComp/orderHistory.vue';
  
  export default defineComponent({
    components: {
      IonPage, IonContent, IonLabel, IonList, IonItemDivider,
      secondButton2,
      mainButton,
      stepper,
      FooterLayout,
      HeaderLayout2,
      orderHistory,
    },
  
    setup() {
      
  
      return {
        
      };
    },
  });
</script>
  
<style scoped>
.main__container {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
}

.main__text {
  widows: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
}

.main__text h2 {
  text-align: center;
}

.main__text p {
  text-align: center;
}

.list__container {
  width: 100%;
  margin: 0;
}

.list__container p{
  font-size: 0.9rem;
  font-weight: 400;
  color: #696969;
  margin: 0;
}

</style>