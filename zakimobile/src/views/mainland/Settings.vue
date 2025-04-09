<template>
  <ionPage>
    <ionHeader>
      <div class="main__header">
        <i class="ri-arrow-left-line"></i>
        <div class="done" style="display: none;">
          <i class="ri-check-fill"></i>
        </div>
      </div>
    </ionHeader>
    <ionContent>
      <div class="main__container profile__container">
        <div class="profile__pic">
          <h3>
            Mon compte
          </h3> 
          <div class="profile__pictures">
            <img 
              v-if="profile.profile_picture" 
              :src="'http://127.0.0.1:8000/account' + profile.profile_picture" 
              alt="Profile picture"
              class="profile-image"
            >
            <i v-else class="ri-user-line"></i>
          </div>
          <span>Changer ma photo</span>
        </div>
          <ion-list :inset="true" lines="full" class="list__info">
            <itemLabel label="Nom" :valeur="user.first_name"/>
            <itemLabel label="Prenoms" :valeur="user.last_name"/>
            <itemLabel label="Email" :valeur="user.email"/>
            <itemLabel label="Username" :valeur="user.username"/>
            <itemLabel label="Date de naissance" :valeur="profile.birthday"/>
            <itemLabel label="commune" :valeur="profile.commune"/>
            <itemLabel label="Adresse" :valeur="profile.address"/>
            <itemLabel label="N° de téléphone" :valeur="profile.phone_number"/>
            <itemLabel label="Genre" :valeur="profile.gender"/>
          </ion-list>
        <div class="logout" @click="router.push('/signin')">
          <i class="ri-logout-box-line" @click="voirInformation"></i>
          <p>Déconnexion</p>
        </div>
      </div>
    </ionContent>
  </ionPage>
</template>
  
<script>
import { IonPage, IonContent, IonHeader, IonList } from '@ionic/vue';
import { defineComponent, ref, onMounted } from 'vue';
import itemLabel from '../../tools/itemLabel.vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

export default defineComponent({
  components: {
    IonPage,
    IonContent,
    IonHeader, itemLabel, IonList,
  },

  setup() {
    const router = useRouter();

    // Reactive user object
    const user = ref({
      username: '',
      first_name: '',
      last_name: '',
      email: '',
    });

    // Reactive profile object
    const profile = ref ({
      gender:'',
      phone_number:'',
      address: '',
      birthday:'',
      commune:'',
    });

    // Reactive error message
    const errorMessage = ref('');

    // Reactive loading state
    const isLoading = ref(true);

    // Function to fetch user data
    const fetchUserData = async () => {
      try {
        isLoading.value = true; // Start loading
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
          router.push('/signin'); // Redirect to login if no token
          return;
        }

        // Fetch user data from the backend
        const response = await axios.get('http://127.0.0.1:8000/account/profile/', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        // Log the entire API response to debug
        console.log('API Response:', response.data);

        // Update the reactive objects with the response data
        user.value = response.data.user; // Assign user data directly
        profile.value = response.data.profile; // Assign profile data (if it exists)
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // Token is expired or invalid
          localStorage.removeItem('access_token'); // Clear the expired token
          router.push('/connexion'); // Redirect to login
        } else {
          console.error('Failed to fetch user data:', error);
          errorMessage.value = 'Failed to fetch user data. Please try again.';
        }
      } finally {
        isLoading.value = false; // Stop loading
      }
    };

    // Call the function to fetch user data when the component is mounted
    onMounted(() => {
      fetchUserData();
    });

    // Return the reactive objects and function (if needed in the template)
    return {
      user,
      profile,
      errorMessage,
      isLoading,
      fetchUserData,
      router
    };
  },
});
</script>
  
<style scoped>
.center__flex{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.profile__container{
  gap: 0.5rem;
  height: auto;
}

i{
  font-size: 1rem;
}

p{
  font-size: 1rem;
}

.main__header{
  display:flex;
  justify-content: space-between;
  width: 100%;
  padding: 1rem;
}

.list__info{
  width: 100%;
}

.main__header .done{
  padding: 0.3rem;
  background: #67d89a;
  border-radius: 1.5rem;
  color: white;
}

.profile__pic{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.profile__pictures{
  width:100%;
  background:none;
  padding: 3.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
}

.profile__pictures i {
  font-size: 2.5rem;
  color: #6d6d6d;
}

.profile__pic h3 {
  text-align: left;
}

.profile__pic span {
  color: #058C42;
}

.profile__info{
  width: 100%;
}

.logout{
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  width: 100%;
}

.logout i{
  color :#058C42;
  font-size: 1.5rem;
}
</style>