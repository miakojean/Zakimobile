import { defineStore } from "pinia";
import { ref } from "vue";

export const useCartStore = defineStore("cart", () => {
    const items = ref([]);
    const count = ref(0);

    const addToCart = (product) => {
        console.log("Produit reçu pour ajout au panier:", product); // [1] Log du produit reçu
        
        const existingItem = items.value.find(item => item.name === product.name);
        
        if (existingItem) {
            console.log(`Produit existant trouvé (${product.name}), quantité avant:`, existingItem.quantity); // [2]
            existingItem.quantity += 1;
            console.log("Quantité après incrémentation:", existingItem.quantity); // [3]
        } else {
            console.log("Nouveau produit détecté, ajout au panier"); // [4]
            items.value.push({
                ...product,
                quantity: 1
            });
        }
        
        count.value += 1;
        console.log("État actuel du panier:", JSON.parse(JSON.stringify(items.value))); // [5]
        console.log("Nombre total d'articles:", count.value); // [6]
    };

    return { items, count, addToCart };
});