<template>
  <ion-app v-if="initialized">
    <Suspense>
      <ion-router-outlet />
    </Suspense>
  </ion-app>
</template>

<script setup lang="ts">
import { StatusBar } from "@capacitor/status-bar";
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import { useStore } from "vuex";
import { onBeforeMount, ref } from "vue";
const store = useStore();
const fetchCurrentLevelIndex = () => store.dispatch("fetchCurrentLevelIndex");
const fetchLastAvailableLevelIndex = () =>
  store.dispatch("fetchLastAvailableLevelIndex");
const fetchDiamonds = () => store.dispatch("fetchDiamonds");

const initialized = ref(false);
onBeforeMount(async () => {
  await fetchCurrentLevelIndex();
  await fetchLastAvailableLevelIndex();
  await fetchDiamonds();
  await StatusBar.setBackgroundColor({
    color: "#148485",
  }).catch(() => {});
  initialized.value = true;
});
</script>
