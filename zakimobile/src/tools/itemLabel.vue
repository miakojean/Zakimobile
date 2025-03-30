<template>
  <ion-item>
    <ion-label>
      <h3>John</h3>
      <p>Nom</p>
    </ion-label>
  </ion-item>
</template>

<script >
import { IonIcon, IonItem, IonLabel } from '@ionic/vue';
import { informationCircle, star } from 'ionicons/icons';
import { defineComponent } from 'vue';

export default defineComponent({
components: { IonIcon, IonItem, IonLabel },
setup() {
    return { informationCircle, star };
},
});
</script>

<style scoped>
ion-item {
    width: 100%;
    --background: #fff;
    --color: #666666;

    --border-color: #fff;
    --border-style: none;
    --border-width: 2px;

    --border-radius: 20px;

    --ripple-color: purple;

    --detail-icon-color: white;
    --detail-icon-opacity: 1;
    --detail-icon-font-size: 20px;
}

h3{
    font-size: 1.5rem;
    font-weight: 700;
    color: #333;
}

p{
    font-size: 1rem;
    font-weight: 400;
    color:  #666666;
}
</style>