import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useAboutCartStore = defineStore('aboutCart', () => {
    // State (données réactives)
    const cart = ref([]);
    const cartItem = ref(0);
    const cartTotal = ref(0);
    const cartTotalItems = ref(0);
    const cartTotalPrice = ref(0);
    const cartTotalDiscount = ref(0);

    // Getters (propriétés calculées)
    const cartItemCount = computed(() => cart.value.length);

    // Actions (méthodes)
    function addToCart(index) {
        cart.value.push(index);
    }

    function removeFromCart(index) {
        cart.value.splice(index, 1);
    }

    function clearCart() {
        cart.value = [];
    }

    // On garde cette version

    return { 
        cart,
        cartItem,
        cartTotal,
        cartTotalItems,
        cartTotalPrice,
        cartTotalDiscount,
        cartItemCount,
        addToCart,
        clearCart,
        removeFromCart
    };
});