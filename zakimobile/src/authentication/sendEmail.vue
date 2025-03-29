<template>
<ionPage>
    <div class="main__container" >

        <!-- the first step -->

        <img
            src="../assets/zaki svg/undraw_forgot-password_odai.png" alt="" 
        /> 

        <div class="main__text">
            <h2><span class="logo">Zaki</span></h2>
        </div>

        <h4>Récupération de mot de passe</h4>

        <inputfamily type = "email" placeholder = "Entrer votre email" v-model="email"/>

        <mainButton label = "recevoir mon code" @click="sendEmail" />

        <div class="divider-container">
            <div class="divider"></div>
            <span class="divider-text">ou</span>
            <div class="divider"></div>
        </div>

        <p @click = "router.push('/signup')">Pas de compte? Je crée mon compte <span>ici</span></p>
    </div>
    
    <!-- The second step which consist in verification of token -->

    <ion-modal 
    :is-open="newModal" 
    @didDismiss="newModal = false"
    :initial-breakpoint="0.50" 
    :breakpoints="[0, 0.25, 0.5, 0.75]"
    >
    <ion-content class="ion-padding">
        <div class="main__container modal">
        <div class="label__contain">
            <h4>Attention</h4>
            <ion-icon :icon="alertCircleOutline" class="icone"></ion-icon>
        </div>
        <p style="text-align: center;">{{ errorMessage }}</p>
        <ion-icon 
            :icon="closeCircleOutline" 
            class="icone"
            @click="newModal = false"
        >
        </ion-icon>                                     
        </div>
    </ion-content>
    </ion-modal>
<FooterLayout/>
</ionPage>

</template>
    
<script>

import { IonPage, IonContent, IonModal } from '@ionic/vue';
import { alertCircleOutline, closeCircleOutline } from 'ionicons/icons';
import { defineComponent, ref } from 'vue';
import mainButton from '../button/mainButton.vue';
import nextButton from '../button/nextButton.vue';
import FooterLayout from '../components/tools/footerLayout.vue';
import inputfamily from '../tools/inputfamily.vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
    
    export default defineComponent({
    components: {
        IonPage, IonContent, IonModal, mainButton, nextButton, FooterLayout, inputfamily, alertCircleOutline,
        closeCircleOutline
    },

    setup() {
        const email = ref('');
        const router = useRouter();
        const newModal = ref(false);
        const errorMessage = ref('');
        const succesMessage = ref('');
        
        // function to handle user login
        const sendEmail = async () => {
        if (!email.value) {
            newModal.value = true;
            errorMessage.value = "Remplissez tous les champs"
            return ;
        }
        try {
            const response = await axios.post('http://127.0.0.1:8000/account/password/reset/', {
            email: email.value
            });
            const { access} = response.data;
            succesMessage.value = 'Email envoyé avec succès, veuillez consulter votre boîte email';
            console.log('Email envoyé!', access);
            localStorage.setItem('resetEmail', email.value);
            router.push('/resetpassword');
        } 

        catch (error) {
            console.error('Login failed:', error.response?.data);
            newModal.value = true;
            errorMessage.value = error.response?.data.error;
        }
        };

        return {
        email, sendEmail, router, newModal, errorMessage, alertCircleOutline,
        closeCircleOutline,  succesMessage,
        };
    },
    });
</script>
    
<style scoped>
.main__container {
    height: 100%; display: flex; flex-direction: column; gap: 1rem; flex: 1;
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

.divider-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 90%;
    gap: 10px; /* Espacement entre la ligne et le texte */
}

.divider {
    flex: 1; /* Permet d'étendre la ligne sur toute la largeur disponible */
    height: 1px; /* Épaisseur de la ligne */
    background-color: #058C42; /* Couleur de la ligne */
}

.divider-text {
    font-size: 1rem;
    font-weight: 400;
    color: #333;
}

p span {
    font-size: 1rem;
    font-weight: 700;
    color: #058C42;
}

.modal{
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.icone {
    font-size: 2rem;
    color: #ff4848;
}

h4{
    color: #8f8f8f;
    font-weight: 600;
}

.label__contain{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
}
</style>