<script setup lang="ts">
import { IonButton } from "@ionic/vue";
</script>

<template>
  <ion-button expand="full" class="letter ion-no-margin" color="warning">
    <slot></slot>
  </ion-button>
</template>

<style scoped>
.letter {
  transition: opacity 0.1s ease-out;
}

ion-button::part(native) {
  aspect-ratio: 1 / 1;
  font-weight: 600;
  border-radius: 4px;
  box-shadow: 1px 1px 0 1px var(--ion-color-warning-shade);
  font-size: 1rem;
}
</style>
