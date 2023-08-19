<template>
  <span class="letter">
    <slot></slot>
  </span>
</template>

<script setup>
// import { defineProps } from 'vue';

// const props = defineProps({
//   disabled: {
//     type: Boolean,
//     default: false,
//   }
// });

</script>

<style scoped>
.letter {
  width: 2rem;
  height: 2rem;

  display: flex;
  justify-content: center;
  align-items: center;

  user-select: none;

  background-color: rgba(255, 69, 0, 0.25);
}
</style>