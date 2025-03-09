<template>
  <div class="container">
    <span :class="{ active: localActiveIndex === 0 }" @click="navigateTo(0, '/home')"></span>
    <span :class="{ active: localActiveIndex === 1 }" @click="navigateTo(1, '/secondStep')"></span>
    <span :class="{ active: localActiveIndex === 2 }" @click="navigateTo(2, '/thirdStep')"></span>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

export default {
    props: {
        activeIndex: Number // L'index du parent
    },
    setup(props, { emit }) {
        const router = useRouter();
        const route = useRoute();
        const localActiveIndex = ref(props.activeIndex); // Copier la valeur de la prop

        // Observer la route pour mettre à jour localActiveIndex
        watch(route, () => {
            if (route.path === '/home') localActiveIndex.value = 0;
            else if (route.path === '/secondStep') localActiveIndex.value = 1;
            else if (route.path === '/thirdStep') localActiveIndex.value = 2;
            emit('update:activeIndex', localActiveIndex.value);
        });

        const navigateTo = (index, path) => {
            localActiveIndex.value = index;
            emit('update:activeIndex', index);
            router.push(path);
        };

        return { navigateTo, localActiveIndex };
    }
};

</script>

<style>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}

.container span {
  width: 10px;
  height: 5px;
  background: #058C42;
  border-radius: 1rem;
  transition: width 0.3s ease-in-out;
  cursor: pointer;
}

.container span.active {
  width: 30px;
}
</style>
