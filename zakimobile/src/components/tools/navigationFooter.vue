<template>
    <ion-footer>
        <ion-toolbar>
        <ion-tab-bar color="light">
            <div class="footer__main">
                <ion-tab-button tab="1">
                    <div class="btn__class">
                        <img class="home__icon" src="../../data/Icones/home-outline.svg" alt="My Icon" />
                        <ion-label class="custom-label">Accueil</ion-label>
                        <ion-badge color="danger"></ion-badge>
                    </div>
                </ion-tab-button>   
                <ion-tab-button tab="2">
                    <div class="btn__class">
                        <img class="home__icon" src="../../data/Icones/time-outline.svg" alt="My Icon" />
                        <ion-label class="custom-label">Historique</ion-label>
                        <ion-badge color="danger"></ion-badge>
                    </div>
                </ion-tab-button>  
                <ion-tab-button tab="3">
                    <div class="btn__class">
                        <img class="home__icon" src="../../data/Icones/settings-outline.svg" alt="My Icon" />
                        <ion-label class="custom-label">Paramètres</ion-label>
                        <ion-badge color="danger"></ion-badge>
                    </div>
                </ion-tab-button>  
                <ion-tab-button tab="4">
                    <div class="btn__class">
                        <img class="home__icon" src="../../data/Icones/person-outline.svg" alt="My Icon" />
                        <ion-label class="custom-label">Profile</ion-label>
                        <ion-badge color="danger"></ion-badge>
                    </div>
                </ion-tab-button>
            </div>
        </ion-tab-bar>
        </ion-toolbar>
    </ion-footer>
</template>
  
<script >
import { IonFooter, IonHeader, IonTitle, IonToolbar } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
    components: { IonFooter, IonHeader, IonTitle, IonToolbar },
});
</script>

<style scoped>
.footer__main{
    display: flex;
}

.custom-label{
    font-size: 0.6rem;
}

.btn__class{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.home__icon {
    height: 1.5rem;
    height: 1.5rem;
}

ion-toolbar {
    --background: white;
    --color: #058C42;

    --border-color: white;
    --border-width: 0;
    --border-style: double;

    --min-height: 80px;
    --padding-top: 20px;
    --padding-bottom: 20px;
  }
</style>