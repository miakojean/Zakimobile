<template>
  <ionPage>
    <ionContent>
      <div class="main__container profile__container">
        <div class="main__header">
          <i class="ri-arrow-left-line"></i>
          <div class="done">
            <i class="ri-check-fill"></i>
          </div>
        </div>
        <div class="profile__pic">
          <h3>
            Mon compte
          </h3> 
          <div class="profile__pictures">
            <i class="ri-user-line"></i>
          </div>
          <span>Changer ma photo</span>
        </div>
        <div class="profile__info center__flex">
          <div class="input__group">
            <label for="name">Nom</label>
            <p> {{ user.first_name }} </p>
          </div>
          <div class="input__group">
            <label for="name">Prenoms</label>
            <p>{{user.last_name}}</p>
          </div>
          <div class="input__group">
            <label for="email">Email</label>
            <p>{{ user.email }}</p>
          </div>
          <div class="input__group">
            <label for="Genre">Genre</label>
            <div class="male"><i class="ri-men-line"></i></div>
            <div class="female"><i class="ri-women-line"></i></div>
          </div>
          <div class="input__group">
            <label for="Age">Age</label>
            <p>26</p>
          </div>
          <div class="input__group">
            <label for="Age">Lieu d'habitation</label>
            <p>Yopougon</p>
          </div>
        </div>
        <div class="logout">
          <i class="ri-logout-box-line"></i>
          <p>Déconnexion</p>
        </div>
      </div>
    </ionContent>
  </ionPage>
</template>
  
<script>
import { IonPage, IonContent } from '@ionic/vue';
import { defineComponent, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

export default defineComponent({
  components: {
    IonPage,
    IonContent,
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
  const profile = ref({});

  // Reactive error message
  const errorMessage = ref('');

  // Function to fetch user data
  const fetchUserData = async () => {
    try {
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        router.push('/connexion'); // Redirect to login if no token
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
      user.value = response.data; // Assign user data directly
      profile.value = response.data.profile; // Assign profile data (if it exists)

      // Log the data to the console
      console.log('User Data:', user.value);
      console.log('Profile Data:', profile.value);
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      errorMessage.value = 'Failed to fetch user data. Please try again.';
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
    fetchUserData,
  };
}
});
</script>
  
<style scooped>
.center__flex{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.profile__container{
  gap: 0.5rem;
}

i{
  font-size: 2rem;
}

p{
  font-size: 1.2rem;
}

.main__header{
  display:flex;
  justify-content: space-between;
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
  gap: 1rem;
}

.profile__pictures{
  width:100%;
  background:#f1efef;
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
  gap: 0.5rem;
}

.input__group{
  width: 100%;
  display: flex;
  justify-content: left;
  align-items: center;
  gap: 1rem;
}

.male{
  border: 1px solid #058C42;
  background: #058C42;
  padding: 0.5rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #f1efef;
}

.female{
  border: 1px solid #e0e0e0;
  background: #aaaaaa;
  padding: 0.5rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}

.logout{
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  width: 100%;
}

.logout i{
  color :#058C42
}
</style>