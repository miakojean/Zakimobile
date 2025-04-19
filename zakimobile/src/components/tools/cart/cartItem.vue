<template>
    <ion-item class="cart__item">
        <img :src="item.image" :alt="item.name" class="cart__image" />
        <div class="item__group">
            <div class="items__infos">
                <ion-label><p>{{ item.name }}</p></ion-label>
                <ion-label @click="emitPrice"><p>{{ item.price }} FCFA</p></ion-label>
            </div>
            <div class="items__infos">
                <ion-label class="main" @click="$emit('remove')">
                    <ion-icon :icon="trashOutline" class="delete-icon" ></ion-icon>
                </ion-label>
                <ion-label class="main">
                    <ion-icon :icon="removeCircleOutline" class="up_and_down__icon" @click="decreaseQuantity"></ion-icon>
                    <p>{{ item.quantity }}</p>
                    <ion-icon :icon="addCircleOutline" class="up_and_down__icon" @click="increaseQuantity"></ion-icon>
                </ion-label>
            </div>
        </div>
    </ion-item>
</template> 
  
<script>
import { IonItem, IonLabel, IonIcon } from '@ionic/vue';
import { closeOutline, addCircleOutline, removeCircleOutline, trashOutline } from 'ionicons/icons';
import { defineComponent } from 'vue';

export default defineComponent({
    components: { IonItem, IonLabel, IonIcon},
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
        return { 
            closeOutline, emitPrice, addCircleOutline, trashOutline,
            removeCircleOutline, increaseQuantity, decreaseQuantity, 
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
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-content: space-between;
    /*border: 1px solid #e0e0e0;*/
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
    justify-content: center;
    align-items: center;
    gap: 1.2rem;
    width: 100%;
}

.del{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    border: 1px solid #e0e0e0;
}

.delete-icon {
  font-size: 1.3rem;
  color: #e21515;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s;
  width: 100%;
}

.up_and_down__icon {
  font-size: 1.3rem;
  color: #058C42;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s;
  width: 100%;
}

.delete-icon:hover {
  opacity: 1;
}

.main{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    font-size: 1rem;
}
</style>