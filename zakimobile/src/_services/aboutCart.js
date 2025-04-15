import { defineStore } from "pinia";
import { ref, computed } from "vue";
import axios from "axios";

export const useAboutCartStore = defineStore('aboutCart', () => {
    // State (données réactives)
    const cart = ref([]);
    const cartItem = ref(0);
    const cartTotalItems = ref(0);
    const cartTotalDiscount = ref(0);
    const cartItemPrice = ref([])

    // Getters (propriétés calculées)
    const cartItemCount = computed(() => cart.value.length);
    const cartTotalPrice = computed(() => {
        return cart.value.reduce((total, item) => {
          const price = Number(item.price) || 0;
          const quantity = Number(item.quantity) || 1; // Par défaut 1 si non spécifié
          return total + (price * quantity);
        }, 0);
    });
      
    
    // Actions (méthodes)
    function addToCart(index) {
        if (cart.value.includes(index)){
            return;
        } else cart.value.push(index) ;
    }

    function removeFromCart(index) {
        cart.value.splice(index, 1);
    }

    function lookAtPrice() {
        console.log(cartTotal)
    }

    function clearCart() {
        cart.value = [];
    }

    // On garde cette version

    return { 
        cart,
        cartItem,
        cartTotalItems,
        cartItemPrice,
        cartTotalDiscount,
        cartItemCount,
        cartTotalPrice,
        addToCart,
        clearCart,
        removeFromCart, lookAtPrice
    };
});