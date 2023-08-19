<template>
  <div class="placeholder">
    <slot></slot>
  </div>
</template>

<script setup>
</script>

<style scoped>
.placeholder {
  width: 2rem;
  height: 2rem;

  display: flex;
  justify-content: center;
  align-items: center;

  user-select: none;

  border-bottom: 0.5rem solid cadetblue;
}

.space {
  opacity: 0;
}
</style>