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

    <ion-content >
      <ion-grid class="ion-no-padding size-full sm:h-[1100px]" fixed>
        <ion-row class="ion-justify-content-center h-full  m-auto">
          <ion-col
            size="12"
            sizeMd="8"
            sizeLg="6"
            sizeXl="4"
          >
            <slot />
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>
