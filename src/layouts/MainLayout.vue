<script setup>
import VBurger from '@/components/VBurger.vue';
</script>

<template>
  <div class="app-container">
    <v-burger />
    <div class="content">
      <router-view />
    </div>
  </div>
</template>
