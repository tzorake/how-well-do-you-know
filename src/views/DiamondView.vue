<script setup lang="ts">
import BackLayout from "@/layouts/BackLayout.vue";
import { IonButton, IonIcon } from "@ionic/vue";
import { diamondOutline } from "ionicons/icons";
</script>

<template>
  <back-layout title="Алмазы">
    <ion-button
      class="diamond-button"
      expand="block"
      fill="clear"
      color="light"
    >
      <div class="diamond-button__inner">
        <ion-icon
          class="diamond-button__icon"
          size="large"
          :icon="diamondOutline"
        />
        <strong>+500</strong>
        <span>Посмотреть видео</span>
      </div>
    </ion-button>
    <ion-button
      class="diamond-button"
      expand="block"
      fill="clear"
      color="light"
    >
      <div class="diamond-button__inner">
        <ion-icon
          class="diamond-button__icon"
          size="large"
          :icon="diamondOutline"
        />
        <strong>+1000</strong>
        <span>Поделиться в Вконтакте</span>
      </div>
    </ion-button>
    <ion-button class="diamond-button" expand="full" fill="clear" color="light">
      <div class="diamond-button__inner">
        <ion-icon
          class="diamond-button__icon"
          size="large"
          :icon="diamondOutline"
        />
        <strong>+1000</strong>
        <span>Поделиться в Одноклассники</span>
      </div>
    </ion-button>
    <ion-button
      class="diamond-button"
      expand="block"
      fill="clear"
      color="light"
    >
      <div class="diamond-button__inner">
        <ion-icon
          class="diamond-button__icon"
          size="large"
          :icon="diamondOutline"
        />
        <strong>+1000</strong>
        <span slot="end">Поделиться в Telegram</span>
      </div>
    </ion-button>
  </back-layout>
</template>

<style scoped>
.diamond-button {
  border-bottom: 1px solid var(--ion-color-medium);
  margin: 0;
}

.diamond-button__inner {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 1rem 0;
  font-size: 0.9rem;
}

@media screen and (max-width: 375px) {
  .diamond-button__icon {
    display: none;
  }
}
</style>
