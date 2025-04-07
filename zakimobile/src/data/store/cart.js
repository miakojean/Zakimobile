import { defineStore } from "pinia";
import { ref } from "vue";

export const useCartStore = defineStore("cart", () => {
    const items = ref([]);
    const count = ref(0);

    const addToCart = (product) => {
        const existingItem = items.value.find(item => item.name === product.name);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            items.value.push({
                ...product,
                quantity: 1
            });
        }
        count.value += 1;
    };

    const removeItem = (index) => {
        count.value -= items.value[index].quantity;
        items.value.splice(index, 1);
    };

    const updateQuantity = (index, newQuantity) => {
        const diff = newQuantity - items.value[index].quantity;
        items.value[index].quantity = newQuantity;
        count.value += diff;
    };

    return { items, count, addToCart, removeItem, updateQuantity };
});