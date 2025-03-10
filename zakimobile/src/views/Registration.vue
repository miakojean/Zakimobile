<template>
  <ionPage>
        <IonContent>
            <div class="main__container">
                <h2>Inscription</h2>
                <inputfamily
                    placeholder = "Nom de famille"
                    type="text"
                />
                <inputfamily
                    placeholder = "Prénoms"
                    type="text"
                />
                <inputfamily
                    placeholder = "username"
                    type="text"
                />
                <inputfamily
                    placeholder = "email"
                    type="email"
                />
                <inputfamily
                    placeholder = "Mot de passe"
                    type="password"
                />
                <mainButton
                    label = "inscription"
                />
                <div class="divider-container">
                    <div class="divider"></div>
                    <span class="divider-text">ou</span>
                    <div class="divider"></div>
                </div>

                <p @click="() => {router.push('/signin')}" >Je me connecte <span>ici</span></p>
            </div>
        </IonContent>
        <footerLayout/>
  </ionPage>
</template>

<script>
import { IonContent, IonPage } from '@ionic/vue';
import { defineComponent } from 'vue';
import inputfamily from '../tools/inputfamily.vue';
import mainButton from '../button/mainButton.vue';
import footerLayout from '../components/tools/footerLayout.vue';
import { useRouter } from 'vue-router';

export default defineComponent({
    components:{
        IonPage, IonContent,
        inputfamily, mainButton,
        footerLayout,
    },

    setup () {
        const router = useRouter()

        return { router}
    }


})
</script>

<style>

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

</style>