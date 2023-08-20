<script setup lang="ts">
import { IonButton } from "@ionic/vue";
</script>

<template>
  <ion-button color="warning">
    <slot></slot>
  </ion-button>
</template>

<style scoped>
ion-button::part(native) {
  height: 30%;
}
</style>
