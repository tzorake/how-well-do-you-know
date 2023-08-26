<script setup lang="ts">
import {
  IonHeader,
  IonButtons,
  IonToolbar,
  IonMenu,
  IonTitle,
  IonContent,
  IonMenuButton,
  IonButton,
  IonPage,
  IonMenuToggle,
  IonIcon,
  IonItem,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/vue";
import { computed } from "vue";
import { useStore } from "vuex";
const store = useStore();
const diamonds = computed(() => store.state.diamonds);
const currentLevelIndex = computed(() => store.state.currentLevelIndex);
import { diamondOutline } from "ionicons/icons";
const paths = [
  { name: "Об игре", url: "/about" },
  { name: "Алмазы", url: "/diamond" },
  { name: "Уровни", url: "/levels" },
];
</script>

<template>
  <ion-page>
    <ion-menu content-id="main-content">
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Меню</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <IonMenuToggle v-for="path in paths" :key="path.name" :autoHide="false">
          <IonItem :routerLink="path.url" router-direction="forward">
            {{ path.name }}
          </IonItem>
        </IonMenuToggle>
      </ion-content>
    </ion-menu>

    <!-- HEADER -->
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-buttons slot="end">
          <ion-button routerLink="/levels"
            >Уровень: {{ currentLevelIndex + 1 }}</ion-button
          >
          <ion-button routerLink="/diamond"
            >{{ diamonds }}
            <ion-icon slot="end" :icon="diamondOutline" />
          </ion-button>
        </ion-buttons>
        <ion-title></ion-title>
      </ion-toolbar>
    </ion-header>

    <!-- CONTENT -->
    <ion-content id="main-content" :scroll-y="false">
      <ion-grid class="ion-no-padding" style="height: 100%" fixed>
        <ion-row class="ion-justify-content-center" style="height: 100%">
          <ion-col
            size="12"
            sizeMd="8"
            sizeLg="6"
            sizeXl="4"
            style="height: 100%"
          >
            <slot />
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<style scoped></style>
