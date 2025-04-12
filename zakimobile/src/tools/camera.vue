<template>
<ion-page>
    <ion-header>
    <ion-toolbar color="primary">
        <ion-title>Test Appareil Photo</ion-title>
    </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
    <div class="preview-container">
        <img v-if="photo" :src="photo.webPath" alt="Photo preview" class="preview-image" />
        <div v-else class="placeholder">
        <ion-icon :icon="cameraOutline" size="large"></ion-icon>
        <p>Aucune photo sélectionnée</p>
        </div>
    </div>

    <ion-button expand="block" @click="takePhoto" class="action-button">
        <ion-icon slot="start" :icon="camera"></ion-icon>
        Prendre une photo
    </ion-button>

    <ion-button expand="block" @click="pickFromGallery" color="medium" class="action-button">
        <ion-icon slot="start" :icon="image"></ion-icon>
        Choisir depuis la galerie
    </ion-button>

    <ion-button v-if="photo" expand="block" @click="clearPhoto" color="danger" class="action-button">
        <ion-icon slot="start" :icon="trash"></ion-icon>
        Effacer la photo
    </ion-button>
    </ion-content>
</ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { 
IonPage, IonHeader, IonToolbar, IonTitle, 
IonContent, IonButton, IonIcon 
} from '@ionic/vue';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { camera, image, trash, cameraOutline } from 'ionicons/icons';

const photo = ref<any>(null);

const takePhoto = async () => {
try {
    const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: false,
    resultType: CameraResultType.Uri,
    source: CameraSource.Camera,
    promptLabelPhoto: 'Choisir depuis la galerie',
    promptLabelPicture: 'Prendre une photo',
    promptLabelHeader: 'Sélection photo'
    });
    
    photo.value = image;
} catch (error) {
    console.error('Erreur appareil photo:', error);
}
};

const pickFromGallery = async () => {
try {
    const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: false,
    resultType: CameraResultType.Uri,
    source: CameraSource.Photos
    });
    
    photo.value = image;
} catch (error) {
    console.error('Erreur galerie:', error);
}
};

const clearPhoto = () => {
photo.value = null;
};
</script>

<style scoped>
.preview-container {
display: flex;
justify-content: center;
align-items: center;
height: 300px;
margin: 20px 0;
border: 2px dashed var(--ion-color-medium);
border-radius: 8px;
background-color: var(--ion-color-light);
overflow: hidden;
}

.preview-image {
width: 100%;
height: 100%;
object-fit: contain;
}

.placeholder {
display: flex;
flex-direction: column;
align-items: center;
color: var(--ion-color-medium);
}

.action-button {
margin-top: 15px;
}

ion-icon {
font-size: 1.2em;
}
</style>