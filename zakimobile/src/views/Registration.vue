<template>
  <ionPage>
        <IonContent>
            <div class="main__container">
                <h2>Inscription</h2>
                <inputfamily
                    placeholder = "Nom de famille"
                    type="text"
                    v-model="firstname"
                />
                <inputfamily
                    placeholder = "Prénoms"
                    type="text"
                    v-model="lastname"
                />
                <inputfamily
                    placeholder = "username"
                    type="text"
                    v-model="username"
                />
                <inputfamily
                    placeholder = "email"
                    type="email"
                    v-model="email"
                />

                <p v-if="emailError" style="color: red">{{ emailError }}</p>

                <inputfamily
                    placeholder = "Mot de passe"
                    type="password"
                    v-model="password"

                    
                />
                <mainButton
                    label = "inscription"
                    @click="verification"
                />
                <div class="divider-container">
                    <div class="divider"></div>
                    <span class="divider-text">ou</span>
                    <div class="divider"></div>
                </div> 

                <p @click="() => router.push('/signin')" >Je me connecte <span>ici</span></p>
            </div>
        </IonContent>
        <footerLayout/>
  </ionPage>
</template>

<script>
import { IonContent, IonPage } from '@ionic/vue';
import { defineComponent , ref } from 'vue';
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

        // About the registration
        const firstname = ref('')
        const lastname = ref('')
        const username = ref('')
        const email = ref('')
        const password = ref('')

        const user = ref({})

        const verification = () => {
            if (!validator.isEmail(email.value)) {
                emailError.value = 'Adresse e-mail invalide.';
            } else {
                emailError.value = ''; // Efface l'erreur si l'e-mail est valide
                // Continuez avec d'autres validations ou la logique de soumission
                console.log('Email valide');
            }
        };
        
        return { router , firstname, 
            lastname, username, 
            email, password, verification
        }
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