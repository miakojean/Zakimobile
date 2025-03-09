<template>
    <div class="container">
      <span :class="{ active: activeIndex === 0 }" @click="setActive(0)"></span>
      <span :class="{ active: activeIndex === 1 }" @click="setActive(1)"></span>
      <span :class="{ active: activeIndex === 2 }" @click="setActive(2)"></span>
    </div>
</template>
  
<script>
  import { ref } from 'vue';
  
  export default {
    setup() {
      const activeIndex = ref(null);
  
      const setActive = (index) => {
        activeIndex.value = index;
      };
  
      return { activeIndex, setActive };
    },
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
  