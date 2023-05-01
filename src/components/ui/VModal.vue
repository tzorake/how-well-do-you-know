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
    class="absolute h-screen w-full grid grid-rows-[auto_,1fr_,auto] gap-10 text-center bg-primary-dark"
  >
    <p class="underline mt-2" @click="closeModal">Закрыть</p>
    <slot />
    <p class="mb-2">Created by ANTONINIK / TZORAKE</p>
  </div>
</template>
