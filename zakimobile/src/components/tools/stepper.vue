<template>
  <div class="container">
    <span :class="{ active: activeIndex === 0 }" @click="navigateTo(0, '/home')"></span>
    <span :class="{ active: activeIndex === 1 }" @click="navigateTo(1, '/secondStep')"></span>
    <span :class="{ active: activeIndex === 2 }" @click="navigateTo(2, '/thirdStep')"></span>
  </div>
</template>

<script>
import { watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

export default {
props: {
  activeIndex: Number // L'état actif vient du parent
},
setup(props, { emit }) {
  const router = useRouter();
  const route = useRoute();

  // Mettre à jour `activeIndex` en fonction de la route actuelle
  watch(route, () => {
    if (route.path === '/home') emit('update:activeIndex', 0);
    else if (route.path === '/secondStep') emit('update:activeIndex', 1);
    else if (route.path === '/thirdStep') emit('update:activeIndex', 2);
  });

  const navigateTo = (index, path) => {
    emit('update:activeIndex', index);
    router.push(path);
  };

  return { navigateTo };
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
