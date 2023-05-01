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
    class="flex-center px-3 py-2 rounded shadow-sm leading-6 md:leading-9 select-none hover:bg-gradient-to-b"
  >
    <slot />
  </button>
</template>
