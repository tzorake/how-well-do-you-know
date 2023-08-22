<template>
  <ion-app v-if="initialized">
    <Suspense>
      <ion-router-outlet />
    </Suspense>
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import { useStore } from "vuex";
import { onBeforeMount, ref } from "vue";
const store = useStore();
const fetchCurrentLevelId = () => store.dispatch("fetchCurrentLevelId");

const initialized = ref(false);
onBeforeMount(async () => {
  await fetchCurrentLevelId();
  initialized.value = true;
});
</script>
