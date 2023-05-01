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
    class="flex-center px-2 py-1 rounded leading-5 md:leading-9 shadow-lg select-none hover:bg-gradient-to-b"
  >
    <slot />
  </button>
</template>
