<script setup>
import VBurger from '@/components/VBurger.vue';
</script>

<template>
  <div class="app-container relative h-screen bg-primary font-mono text-2xl md:text-5xl text-white">
    <v-burger />
    <div class="content">
      <router-view />
    </div>
  </div>
</template>
