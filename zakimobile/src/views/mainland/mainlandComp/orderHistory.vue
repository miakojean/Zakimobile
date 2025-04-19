<template>
    <ion-content color="light">

        <ion-item-divider color="light">
            <ion-label><h3>Commandes en cours </h3></ion-label>
        </ion-item-divider>

        <ion-list :inset="true">
            <ion-item :button="true">
                <ion-icon color="success" slot="start" :icon="locateOutline" size="small"></ion-icon>
                <ion-label>
                    <h3>Marché</h3>
                    <p>marché gouro adjamé</p>
                </ion-label>
                <ion-label slot="end">
                    <h3>prix</h3>
                    <p>5600</p>
                </ion-label>
            </ion-item>
            
            <ion-item :button="false">
                <ion-icon color="success" slot="start" :icon="locationOutline" size="small"></ion-icon>
                <ion-label>
                    <h3>Mon addresse</h3>
                    <p>Rue de l'aménagement</p>
                </ion-label>
                <ion-label slot="end">
                    <h3>durée</h3>
                    <p>59:00</p>
                </ion-label>
            </ion-item>
        </ion-list>

        <ion-item-divider color="light">
            <ion-label><h3>Commandes effectuées</h3></ion-label>
        </ion-item-divider>

        <ion-list :inset="true">
            <ion-item :button="true">
                <ion-icon color="success" slot="start" :icon="locateOutline" size="small"></ion-icon>
                <ion-label>
                    <h3>Marché</h3>
                    <p>marché gouro adjamé</p>
                </ion-label>
                <ion-label slot="end">
                    <h3>prix</h3>
                    <p>5600</p>
                </ion-label>
            </ion-item>
            
            <ion-item :button="false">
                <ion-icon color="success" slot="start" :icon="locationOutline" size="small"></ion-icon>
                <ion-label>
                    <h3>Mon addresse</h3>
                    <p>Rue de l'aménagement</p>
                </ion-label>
                <ion-label slot="end">
                    <h3>durée</h3>
                    <p>59:00</p>
                </ion-label>
            </ion-item>
        </ion-list>

        <ion-list :inset="true">
            <ion-item :button="true">
                <ion-icon color="success" slot="start" :icon="locateOutline" size="small"></ion-icon>
                <ion-label>
                    <h3>Marché</h3>
                    <p>marché gouro adjamé</p>
                </ion-label>
                <ion-label slot="end">
                    <h3>prix</h3>
                    <p>5600</p>
                </ion-label>
            </ion-item>
            
            <ion-item :button="false">
                <ion-icon color="success" slot="start" :icon="locationOutline" size="small"></ion-icon>
                <ion-label>
                    <h3>Mon addresse</h3>
                    <p>Rue de l'aménagement</p>
                </ion-label>
                <ion-label slot="end">
                    <h3>statuts</h3>
                    <p>59:00</p>
                </ion-label>
            </ion-item>
        </ion-list>

        <ion-list :inset="true">
            <ion-item :button="true">
                <ion-icon color="success" slot="start" :icon="locateOutline" size="small"></ion-icon>
                <ion-label>
                    <h3>Marché</h3>
                    <p>marché gouro adjamé</p>
                </ion-label>
                <ion-label slot="end">
                    <h3>prix</h3>
                    <p>5600</p>
                </ion-label>
            </ion-item>
            
            <ion-item :button="false">
                <ion-icon color="success" slot="start" :icon="locationOutline" size="small"></ion-icon>
                <ion-label>
                    <h3>Mon addresse</h3>
                    <p>Rue de l'aménagement</p>
                </ion-label>
                <ion-label slot="end">
                    <h3>statut</h3>
                    <p>59:00</p>
                </ion-label>
            </ion-item>
        </ion-list>

        <ion-list :inset="true">
            <ion-item :button="true">
                <ion-icon color="success" slot="start" :icon="locateOutline" size="small"></ion-icon>
                <ion-label>
                    <h3>Marché</h3>
                    <p>marché gouro adjamé</p>
                </ion-label>
                <ion-label slot="end">
                    <h3>prix</h3>
                    <p>5600</p>
                </ion-label>
            </ion-item>
            
            <ion-item :button="false">
                <ion-icon color="success" slot="start" :icon="locationOutline" size="small"></ion-icon>
                <ion-label>
                    <h3>Mon addresse</h3>
                    <p>Rue de l'aménagement</p>
                </ion-label>
                <ion-label slot="end">
                    <h3>statut</h3>
                    <p>59:00</p>
                </ion-label>
            </ion-item>
        </ion-list>

        <ion-list :inset="true">
            <ion-item :button="true">
                <ion-icon color="success" slot="start" :icon="locateOutline" size="small"></ion-icon>
                <ion-label>
                    <h3>Marché</h3>
                    <p>marché gouro adjamé</p>
                </ion-label>
                <ion-label slot="end">
                    <h3>prix</h3>
                    <p>5600</p>
                </ion-label>
            </ion-item>
            
            <ion-item :button="false">
                <ion-icon color="success" slot="start" :icon="locationOutline" size="small"></ion-icon>
                <ion-label>
                    <h3>Mon addresse</h3>
                    <p>Rue de l'aménagement</p>
                </ion-label>
                <ion-label slot="end">
                    <h3>statut</h3>
                    <p>59:00</p>
                </ion-label>
            </ion-item>
        </ion-list>

        
    </ion-content>
</template>
  
<script >
import {
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonNote,
    IonTextarea,
    IonToggle,
    IonToolbar,
    IonTitle,
} from '@ionic/vue';

import { locationOutline, locateOutline } from 'ionicons/icons';

import { defineComponent } from 'vue';

export default defineComponent({
    components: {
    IonContent, IonHeader,
    IonInput, IonItem, IonLabel, IonList,
    IonNote, IonTextarea, IonToggle, IonToolbar, IonTitle,
    },

    setup() {
        return {
            locationOutline,locateOutline
        };
    },
});
</script>
  
  <style scoped>
    ion-note {
      display: block;
    }
  </style>