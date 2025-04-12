import {defineStore} from "pinia"
import {ref, computed} from "vue"

export const useAuthStore = defineStore('aboutAuth',()=> {
    
    // State (données reactives)
    const firstname = ref('')
    const lastname = ref('')
    const username = ref('')
    const email = ref('')
    const password = ref('')

    //Getters (propriétés calculées)
    
    // Actions (méthodes)
    function login( username, email, password) {
        if(!username && !email && !password){
            return console.error("Remplissez tous les champs");
        }
    }

    return{
        firstname, lastname, username, email, password,
        login
    }
})