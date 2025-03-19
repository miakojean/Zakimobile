<template>
  <IonPage>
    <headerLayout/>
    <IonContent>
        
    </IonContent>
  </IonPage>
</template>

<script>
import { IonPage, IonContent } from '@ionic/vue';
import HeaderLayout from '../components/tools/headerLayout.vue';
export default defineComponent ({

    components: {
        IonPage,IonContent, HeaderLayout
    }
})
</script>

<style>

</style>