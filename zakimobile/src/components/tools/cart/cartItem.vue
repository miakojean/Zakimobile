<template>
    <ion-item class="cart__item">
        <img :src="item.image" :alt="item.name" class="cart__image" />
        <div class="item__group">
            <div class="items__infos">
                <ion-label><p>{{ item.name }}</p></ion-label>
                <ion-label @click="emitPrice"><p>{{ item.price }} FCFA</p></ion-label>
            </div>
            <div class="items__infos">
                <IonIcon 
                    :icon="closeOutline" 
                    class="delete-icon"
                    @click="$emit('remove')"
                ></IonIcon>
                <div class="main">
                    <IonIcon class="add__products" :icon="removeCircleOutline" @click="decreaseQuantity"></IonIcon>
                    {{ item.quantity }}
                    <IonIcon class="add__products" :icon="addCircleOutline" @click="increaseQuantity"></IonIcon>
                </div>
            </div>
        </div>
    </ion-item>
</template> 
  
<script>
import { IonItem, IonLabel, IonIcon } from '@ionic/vue';
import { closeOutline, addCircleOutline, removeCircleOutline } from 'ionicons/icons';
import { defineComponent } from 'vue';
import upAndOwn from './upAndOwn.vue';

export default defineComponent({
    components: { IonItem, IonLabel, IonIcon, upAndOwn },
    props: {
        item: {
            type: Object,
            required: true
        }
    },
    emits: ['remove', 'lookprice'],
    setup(props, { emit }) {
        const emitPrice = () => {
            emit('lookprice', props.item.price);  // Émet le prix vers le parent
        };
        
        const increaseQuantity = () => {
            if (!props.item.quantity || typeof props.item.quantity !== 'number') {
                props.item.quantity = 1;
            }
            props.item.quantity += 1;
            emit('quantity-change', props.item); // Optionnel: émettre un événement
        };

        const decreaseQuantity = () => {
            if (!props.item.quantity || typeof props.item.quantity !== 'number') {
                props.item.quantity = 1;
            }
            if (props.item.quantity > 1) {
                props.item.quantity -= 1;
                emit('quantity-change', props.item); // Optionnel: émettre un événement
            }
        };
        return { closeOutline, emitPrice, addCircleOutline, removeCircleOutline
            ,increaseQuantity, decreaseQuantity, 
        }
    }
});
</script>
  
<style scoped>
ion-item {
    --padding-start: 0;
}

p{
    color: #525252;
}

.cart__item{
    display: flex;

}

.item__group{
    width: 100%;
    display: flex;
    justify-content: space-between;
}

.cart__image {
    width: 75px;
    height: 75px;
    border-radius: 1rem;
    margin-right: 10px;
}

.items__infos{
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    width: 40%;
}

.delete-icon {
  font-size: 1.1rem; /* Taille augmentée */
  width: 1.1rem;
  height: 1.1rem;
  --ionicon-stroke-width: 48px; /* Épaisseur du trait */
  color: #ff2929; /* Test visuel */
  width: 100%;
}
</style>