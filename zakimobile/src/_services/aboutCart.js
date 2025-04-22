import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";
import axios from "axios";
import { refreshToken } from "./authServices";

export const useAboutCartStore = defineStore('aboutCart', () => {
    // State (données réactives)
    const cart = ref([]);
    const cartItem = ref(0);
    const cartTotalItems = ref(0);
    const cartTotalDiscount = ref(0);
    const cartItemPrice = ref([]);
    const cartModal = ref(false);
    const responseData = ref({});

    // Charger le panier depuis localStorage au démarrage
    function loadCartFromLocalStorage() {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            cart.value = JSON.parse(savedCart);
        }
    }

    // Appeler cette fonction au démarrage du store
    loadCartFromLocalStorage();

    // Sauvegarder le panier dans localStorage à chaque modification
    function saveCartToLocalStorage() {
        localStorage.setItem('cart', JSON.stringify(cart.value));
    }

    // Observer les changements du panier et sauvegarder automatiquement
    watch(
        () => cart.value,
        (newCart) => {
            saveCartToLocalStorage();
        },
        { deep: true } // Surveille les changements profonds (modifications dans les objets du tableau)
    );

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
        localStorage.removeItem('cart')
    }

    async function createOrder() {
        // Préparation des données de la commande
        const orderProducts = cart.value.map(item => ({
            product_name: item.name,
            quantity: item.quantity
        }));
    
        const requestData = {
            order_products: orderProducts,
            total_price: cartTotalPrice.value,
            total_items: cartItemCount.value,
            total_discount: cartTotalDiscount.value
        };
    
        try {
            const response = await api.post('/order/orders/', requestData);
    
            console.log('Commande créée avec succès:', response.data);
            responseData.value = response.data;
            clearCart();
            cartModal.value = true;
            return response.data;
    
        } catch (error) {
            // L'intercepteur aura déjà tenté de rafraîchir le token si l'erreur 401 était due à l'expiration.
            // Ici, vous gérez les autres types d'erreurs (réseau, 400, 500, etc.)
            console.error('Erreur lors de la commande:', error.response?.data);
            throw error;
        }
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
        cartModal,
        responseData,
        addToCart,
        clearCart,
        removeFromCart, lookAtPrice, createOrder
    };
});