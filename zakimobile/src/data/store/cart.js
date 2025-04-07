import { defineStore } from "pinia";
import { ref, watch, computed } from "vue";

export const useCartStore = defineStore("cart", () => {
    // Structure du panier
    const state = ref({
        items: [],       // Tableau des produits distincts
        totalQuantity: 0 // Somme de toutes les quantités
    });

    // Initialisation depuis localStorage
    const initFromLocalStorage = () => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            const parsed = JSON.parse(savedCart);
            state.value = {
                items: parsed.items || [],
                totalQuantity: parsed.items?.reduce((sum, item) => sum + item.quantity, 0) || 0
            };
        }
    };

    // Initialiser
    initFromLocalStorage();

    // Computed properties
    const uniqueItemsCount = computed(() => state.value.items.length);
    const totalItemsCount = computed(() => state.value.totalQuantity);
    const subtotal = computed(() => 
        state.value.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    );

    // Sauvegarde automatique
    watch(state, (newState) => {
        localStorage.setItem('cart', JSON.stringify({
            items: newState.items
            // On ne sauvegarde pas totalQuantity car recalculé à l'initialisation
        }));
    }, { deep: true });

    // Méthodes
    const addToCart = (product) => {
        const existingIndex = state.value.items.findIndex(item => item.id === product.id);
        
        if (existingIndex >= 0) {
            state.value.items[existingIndex].quantity += 1;
        } else {
            state.value.items.push({
                ...product,
                quantity: 1
            });
        }
        state.value.totalQuantity += 1;
    };

    const removeItem = (itemId) => {
        const index = state.value.items.findIndex(item => item.id === itemId);
        if (index >= 0) {
            state.value.totalQuantity -= state.value.items[index].quantity;
            state.value.items.splice(index, 1);
        }
    };

    const updateQuantity = (itemId, newQuantity) => {
        const index = state.value.items.findIndex(item => item.id === itemId);
        if (index < 0) return;

        const item = state.value.items[index];
        const quantityDiff = newQuantity - item.quantity;
        
        item.quantity = Math.max(1, newQuantity); // Minimum 1
        state.value.totalQuantity += quantityDiff;
    };

    const clearCart = () => {
        state.value = { items: [], totalQuantity: 0 };
    };

    return {
        cartItems: computed(() => state.value.items),
        uniqueItemsCount,
        totalItemsCount,
        subtotal,
        addToCart,
        removeItem,
        updateQuantity,
        clearCart
    };
});