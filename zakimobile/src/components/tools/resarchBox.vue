<template>
    <ion-searchbar 
        showCancelButton="focus" 
        class="custom"
        placeholder = "Trouver mon produits"
    >
    </ion-searchbar>
</template>
  
<script>
import { IonSearchbar } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
    components: { IonSearchbar },
});
</script>
  
<style scoped>
/* Scoped components require higher specificity to customize */
ion-searchbar.custom {
    --background: #f3f3f3;
    --color: #292929;
    --placeholder-color: #c9c9c9;
    --icon-color: #058C42;
    --clear-button-color: #058C42;
    --box-shadow: none;

    --border-radius: 1rem;
}

ion-searchbar.ios.custom {
    --cancel-button-color: #058C42;
}

ion-searchbar.md.custom {
    --cancel-button-color: #058C42;
}
</style>