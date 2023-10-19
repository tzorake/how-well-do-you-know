<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { useLevelsStore } from "@/stores/levels";
import { useDiamondsStore } from "@/stores/diamonds";

/* Helpers */
import { StatusBar } from "@capacitor/status-bar";

/* Components */
import {
  IonApp,
  IonContent,
  IonRouterOutlet,
  IonHeader,
  IonToolbar,
  IonMenu,
  IonTitle,
  IonMenuToggle,
  IonItem,
} from "@ionic/vue";

const { fetchCurrentLevelIndex, fetchLastAvailableLevelIndex, fetchLevels } =
  useLevelsStore();

const { fetchDiamonds } = useDiamondsStore();

const paths = [
  { name: "Об игре", url: "/about" },
  { name: "Алмазы", url: "/diamond" },
  { name: "Уровни", url: "/levels" },
];

const initialized = ref(false);
onBeforeMount(async () => {
  await fetchLevels();
  await fetchCurrentLevelIndex();
  await fetchLastAvailableLevelIndex();
  await fetchDiamonds();

  await StatusBar.setBackgroundColor({
    color: "#148485",
  }).catch(() => {});

  initialized.value = true;
});
</script>

<template>
  <ion-app v-if="initialized">
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
    <ion-content id="main-content">
      <Suspense>
        <ion-router-outlet />
      </Suspense>
    </ion-content>
  </ion-app>
</template>
