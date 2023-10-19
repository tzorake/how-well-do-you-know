<script setup lang="ts">
import {
  IonHeader,
  IonButtons,
  IonToolbar,
  IonTitle,
  IonContent,
  IonMenuButton,
  IonButton,
  IonPage,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/vue";
import { diamondOutline } from "ionicons/icons";

import { useDiamondsStore } from "@/stores/diamonds";
import { useLevelsStore } from "@/stores/levels";

const diamondsStore = useDiamondsStore();
const levelsStore = useLevelsStore();
</script>

<template>
  <ion-page>
    <!-- HEADER -->
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-buttons slot="end">
          <ion-button routerLink="/levels"
            >Уровень: {{ levelsStore.currentLevelIndex + 1 }}</ion-button
          >
          <ion-button routerLink="/diamond"
            >{{ diamondsStore.diamonds }}
            <ion-icon slot="end" :icon="diamondOutline" />
          </ion-button>
        </ion-buttons>
        <ion-title></ion-title>
      </ion-toolbar>
    </ion-header>

    <!-- CONTENT -->
    <ion-content :scroll-y="false">
      <ion-grid class="ion-no-padding" style="height: 100%" fixed>
        <ion-row class="ion-justify-content-center" style="height: 100%">
          <ion-col
            size="12"
            sizeMd="8"
            sizeLg="6"
            sizeXl="4"
            style="display: flex; flex-direction: column; height: 100%"
          >
            <slot />
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<style scoped></style>
