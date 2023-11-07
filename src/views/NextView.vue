<script setup lang="ts">
/* Helpers */
import { computed } from "vue";
import { useLevelsStore } from "@/stores/levels";
import { useIonRouter } from "@ionic/vue";
import { storeToRefs } from "pinia";

/* Components */
import { IonButton, IonIcon, IonLabel } from "@ionic/vue";
import MainLayout from "@/layouts/MainLayout.vue";
import { diamondOutline, happyOutline, sadOutline } from "ionicons/icons";

const levelsStore = useLevelsStore();
const { levelsInfo, currentLevelIndex, lastAvailableLevelIndex } =
  storeToRefs(levelsStore);
const { setCurrentLevelIndex, setLastAvailableLevelIndex } = levelsStore;

const ionRouter = useIonRouter();

const levels = computed(() => levelsInfo.value.levels);

const imageSrc = computed(() => {
  return levels.value[currentLevelIndex.value].image;
});
const actualAnswer = computed(
  () => levels.value[currentLevelIndex.value].actual_answer
);

async function onContinue() {
  const newLevelIndex = currentLevelIndex.value + 1;
  if (lastAvailableLevelIndex.value < newLevelIndex) {
    await setLastAvailableLevelIndex(newLevelIndex);
  }
  if (newLevelIndex === levels.value.length) {
    ionRouter.navigate("/levels/", "none", "replace");
    return;
  } else {
    await setCurrentLevelIndex(newLevelIndex);
    ionRouter.navigate("/level-view/", "none", "replace");
  }
}
</script>

<template>
  <main-layout>
    <div class="level-title">
      <p class="level-title__header">Поздравляем!</p>
      <p class="level-title__content">Вы прошли на новый уровень</p>
    </div>
    <img class="level-image" alt="level-image" :src="imageSrc" />

    <div class="level-answer" v-once>
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
      <ion-button @click="onContinue" class="continue-button" color="primary"
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
  justify-content: space-evenly;
}

.level-title__header {
  font-size: 1.5rem;
  margin: 0;
}

.level-title__content {
  font-size: 1.15rem;
  margin: 0;
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
  height: 15%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-template-areas:
    "boring-button fun-button"
    "continue-button continue-button";
  margin: 0 8px;
  gap: 10px;
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
