<script setup>
const props = defineProps({
  visible: {
    type: Boolean,
    default: true
  }
})
const emit = defineEmits(['onClose'])
const closeModal = () => {
  emit('onClose')
}
</script>

<template>
  <div
    v-if="visible"
    class="absolute h-screen w-full py-5 grid grid-rows-[auto_1fr_auto] gap-10 text-center bg-primary-dark"
  >
    <p class="underline" @click="closeModal">Закрыть</p>
    <slot class="h-4/6" />
    <p class="text-lg md:text-4xl">Created by ANTONINIK / TZORAKE</p>
  </div>
</template>
