<script setup>
import VBurger from '@/components/VBurger.vue';
</script>

<template>
  <div class="app-container relative h-screen bg-primary text-2xl text-white">
    <v-burger />
    <div class="content">
      <router-view />
    </div>
  </div>
</template>
