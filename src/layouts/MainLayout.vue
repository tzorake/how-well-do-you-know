<script setup>
import VBurger from '@/components/VBurger.vue';
</script>

<template>
  <div class="app-container relative">
    <v-burger />
    <div class="content px-3">
      <router-view />
    </div>
  </div>
</template>
