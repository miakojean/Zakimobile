<template>
<ion-page>
    <!-- Barre d'en-tête principale -->
    <ion-header>
    <ion-toolbar color="primary">
        <ion-title>Mon Application</ion-title>
    </ion-toolbar>
    </ion-header>

    <!-- Contenu principal avec onglets -->
    <ion-content>
    <ion-tabs>
        <!-- Onglet Accueil -->
        <ion-tab tab="home">
        <home-tab />
        </ion-tab>

        <!-- Onglet Messages -->
        <ion-tab tab="messages">
        <messages-tab />
        </ion-tab>

        <!-- Onglet Profil -->
        <ion-tab tab="profile">
        <profile-tab />
        </ion-tab>

        <!-- Barre d'onglets en bas -->
        <ion-tab-bar slot="bottom">
        <ion-tab-button tab="home">
            <ion-icon :icon="home" />
            <ion-label>Accueil</ion-label>
        </ion-tab-button>
        
        <ion-tab-button tab="messages">
            <ion-icon :icon="mail" />
            <ion-label>Messages</ion-label>
            <ion-badge v-if="unreadMessages" color="danger">{{ unreadMessages }}</ion-badge>
        </ion-tab-button>
        
        <ion-tab-button tab="profile">
            <ion-icon :icon="person" />
            <ion-label>Profil</ion-label>
        </ion-tab-button>
        </ion-tab-bar>
    </ion-tabs>
    </ion-content>
</ion-page>
</template>

<script>
import { 
IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
IonTabs, IonTab, IonTabBar, IonTabButton, IonIcon, IonLabel, IonBadge
} from '@ionic/vue';
import { home, mail, person } from 'ionicons/icons';
import HomeTab from '@/components/HomeTab.vue';
import MessagesTab from '@/components/MessagesTab.vue';
import ProfileTab from '@/components/ProfileTab.vue';

export default {
name: 'HomePage',
components: {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
    IonTabs, IonTab, IonTabBar, IonTabButton, IonIcon, IonLabel, IonBadge,
    HomeTab,
    MessagesTab,
    ProfileTab
},
data() {
    return {
    home,
    mail,
    person,
    unreadMessages: 3 // Exemple de données
    };
}
};
</script>
  
<style scoped>
/* Style minimal pour la page */
ion-tab-bar {
--background: #ffffff;
--color: #757575;
--color-selected: #3880ff;
}

ion-tab-button {
--padding-start: 0;
--padding-end: 0;
--padding-top: 4px;
--padding-bottom: 4px;
}

ion-badge {
margin-left: 4px;
}
</style>