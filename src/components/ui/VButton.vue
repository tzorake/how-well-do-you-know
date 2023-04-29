<script setup>
  const props = defineProps({
  color: {
    type: String,
    default: '',
    validator(value) {
      return ['success', 'help', 'warn', 'error'].includes(value)
    }
  }
})
</script>

<template>
  <button class="v-btn" :class="`bg-${color}`">
    <slot />
  </button>
</template>
