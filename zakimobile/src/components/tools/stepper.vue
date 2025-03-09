<template>
  <div class="container">
    <span
      :class="{ active: activeIndex === 0 }"
      @click="handleClick(0)"
    ></span>
    <span
      :class="{ active: activeIndex === 1 }"
      @click="handleClick(1)"
    ></span>
    <span
      :class="{ active: activeIndex === 2 }"
      @click="handleClick(2)"
    ></span>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    activeIndex: {
      type: Number,
      required: true,
    },
  },

  emits: ['click'],

  setup(props, { emit }) {
    const handleClick = (index) => {
      emit('click', index); // Emit the clicked index to the parent
    };

    return {
      handleClick,
    };
  },
});
</script>

<style scoped>
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
  transition: width 0.3s ease-in-out;
}
</style>