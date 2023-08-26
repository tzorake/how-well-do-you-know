<script setup lang="ts">
import { useData } from "@/services/fetchApi";
import { IonButton, IonIcon, IonLabel } from "@ionic/vue";
import { computed } from "vue";
import { diamondOutline, happyOutline, sadOutline } from "ionicons/icons";
import MainLayout from "@/layouts/MainLayout.vue";

import { useStore } from "vuex";
const store = useStore();

import { useIonRouter } from "@ionic/vue";
const ionRouter = useIonRouter();

const currentLevelIndex = computed(() => store.state.currentLevelIndex);
const lastAvailableLevelIndex = computed(
  () => store.state.lastAvailableLevelIndex
);
const data = await useData("/levels/levels.json");
const levels = data.levels;
const imageSrc = computed(() => {
  return levels[currentLevelIndex.value].image;
});
const actualAnswer = computed(
  () => levels[currentLevelIndex.value].actual_answer
);

async function onContinue() {
  const newLevelIndex = currentLevelIndex.value + 1;

  if (currentLevelIndex.value === lastAvailableLevelIndex.value) {
    await store.dispatch("setLastAvailableLevelIndex", newLevelIndex);
  }

  if (newLevelIndex === levels.length) {
    ionRouter.navigate("/levels/", "forward", "push");
    return;
  }

  await store.dispatch("setCurrentLevelIndex", newLevelIndex);

  ionRouter.navigate("/level-view/", "back", "pop");
}
</script>

<template>
  <main-layout>
    <div class="level-title">
      <p class="level-title__text">Отлично!</p>
    </div>
    <img class="level-image" alt="level-image" :src="imageSrc" />

    <div class="level-answer">
      {{ actualAnswer }}
      <ion-label class="reward">
        <span>+100</span>
        <ion-icon slot="end" :icon="diamondOutline" />
      </ion-label>
    </div>

    <div class="buttons">
      <ion-button @click="onContinue" class="boring-button" color="danger"
        >Скучно
        <ion-icon slot="end" :icon="sadOutline" />
      </ion-button>
      <ion-button @click="onContinue" class="fun-button" color="success"
        >Отлично
        <ion-icon slot="end" :icon="happyOutline" />
      </ion-button>
      <ion-button @click="onContinue" class="continue-button" color="secondary"
        >Продолжить
      </ion-button>
    </div>
  </main-layout>
</template>

<style scoped>
.level-title {
  height: 15%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1.78rem;
}

.level-image {
  height: 50%;
  width: 100%;
  object-fit: cover;
}

.level-answer {
  height: 15%;
  gap: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 1.5rem;
}

.buttons {
  height: 20%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-template-areas:
    "boring-button fun-button"
    "continue-button continue-button";
  padding: 1rem;
  gap: 0.5rem;
}

.reward {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.25rem;
}

.boring-button {
  grid-area: boring-button;
}

.fun-button {
  grid-area: fun-button;
}

.continue-button {
  grid-area: continue-button;
}
</style>
