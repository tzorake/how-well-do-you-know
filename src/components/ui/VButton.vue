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
  <button
    :class="`bg-${color} from-${color} via-${color}-light to-${color}`"
    class="px-3 py-1 rounded shadow-sm select-none hover:bg-gradient-to-b"
  >
    <slot />
  </button>
</template>
