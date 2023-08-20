<script setup lang="ts">
import {
  IonPage,
  IonContent,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonHeader,
  IonToolbar,
} from "@ionic/vue";

defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <IonTitle>{{ title }}</IonTitle>
      </ion-toolbar>
    </ion-header>
    <ion-content><slot /></ion-content>
  </ion-page>
</template>

<style scoped></style>
