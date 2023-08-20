<script setup lang="ts">
import { IonButton } from "@ionic/vue";
</script>

<template>
  <ion-button expand="full" class="ion-no-margin" color="warning">
    <slot></slot>
  </ion-button>
</template>

<style scoped>
ion-button::part(native) {
  aspect-ratio: 1 / 1;
}
</style>
