<template>
    <ionPage>
      <headerLayout2 @click="() => {router.push('/settings')}" />
      <ionContent>
        <div class="main__container profile__container">
          <div class="profile__pic">
            <h3>
              Mon compte
            </h3> 
            <div class="profile__pictures">
              <img 
                :src="'http://127.0.0.1:8000/account' + profile.profile_picture" 
                alt="Profile picture"
                class="profile-image"
              >
            </div>
            <span>Changer ma photo</span>
          </div>
            <ion-list :inset="true" lines="full" class="list__info">
              <itemLabel label="Nom" :valeur="user.first_name || 'Completez vos informations' "/>
              <itemLabel label="Prenoms" :valeur="user.last_name || 'Completez vos informations'  "/>
              <itemLabel label="Email" :valeur="user.email || 'Completez vos informations'  "/>
              <itemLabel label="Username" :valeur="user.username || 'Completez vos informations'  "/>
              <itemLabel 
                label="Date de naissance" 
                :valeur="profile.birthday || 'Completez vos informations'"
              />
              <itemLabel label="commune" :valeur="profile.commune || 'Completez vos informations' "/>
              <itemLabel label="Adresse" :valeur="profile.address || 'Completez vos informations' "/>
              <itemLabel label="N° de téléphone" :valeur="profile.phone_number || 'Completez vos informations' "/>
              <itemLabel label="Genre" :valeur="profile.gender"/>
            </ion-list>
          <div class="logout" @click="logout">
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
import headerLayout2 from '../../components/tools/headerLayout2.vue';
import itemLabel from '../../tools/itemLabel.vue';
import { useRouter } from 'vue-router';
import itemLabel2 from '../../tools/itemLabel2.vue';
import { useUserStore } from '../../_services/authStore.js';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';


export default defineComponent({
  components: {
    IonPage,
    IonContent,
    IonHeader, itemLabel, IonList, headerLayout2, itemLabel2,
  },

  setup() {
    const router = useRouter();
    const userStore = useUserStore();
    
    // Utilisez storeToRefs pour conserver la réactivité
    const { state } = storeToRefs(userStore);
    
    // Chargez les données au montage du composant
    onMounted(async () => {
      if (!state.value.user.username) { // Si les données ne sont pas déjà chargées
        await userStore.fetchUser();
      }
    });

    // Accès réactif aux données
    const user = computed(() => state.value.user);
    const profile = computed(() => state.value.profile);

    const logout = () => {
      userStore.logout();
      router.push('/signin');
    };

    const voirInformation = () => {
      console.log('User:', user.value);
      console.log('Profile:', profile.value);
    };

    return {
      router,
      user,
      profile,
      logout,
      voirInformation
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