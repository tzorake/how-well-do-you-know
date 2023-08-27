<script setup lang="ts">
import { IonButton, IonIcon } from "@ionic/vue";
import { computed, ref, watch } from "vue";
import { useData } from "@/services/fetchApi";
import { Letter } from "@/utils/Letter";
import {
  playForwardOutline,
  desktopOutline,
  trashBinOutline,
  eyeOutline,
} from "ionicons/icons";
import MainLayout from "@/layouts/MainLayout.vue";
import UserInputs from "@/components/LevelView/UserInputs.vue";

import { useStore } from "vuex";
const store = useStore();

import { useIonRouter } from "@ionic/vue";
import { LetterPickerCollection } from "@/utils/LetterPickerCollection";
import { LetterState } from "@/utils/LetterState";
const ionRouter = useIonRouter();

const data = await useData("/levels/levels.json");
const levels = data.levels;
const currentLevelIndex = computed(() => store.state.currentLevelIndex);
const levelTitle = computed(() => data.title);
const imageSrc = computed(() => levels[currentLevelIndex.value].image);
const actualAnswer = computed(() =>
  levels[currentLevelIndex.value].actual_answer.toLowerCase()
);
const opened = computed(() => levels[currentLevelIndex.value].opened);
const userAnswer = ref<Letter[]>([]);
const letterPickerCollection = computed(
  () => new LetterPickerCollection(actualAnswer.value, opened.value)
);
const letterPickerState = computed(
  () => letterPickerCollection.value.letterPickerState
);
const actualAnswerWithoutSpaces = computed(
  () => letterPickerCollection.value.actualAnswerWithoutSpaces
);

watch(
  currentLevelIndex,
  () => {
    const word = actualAnswer.value.replaceAll(/[а-яА-Я]/g, "_");
    const letters = Letter.toLetters(word);
    if (opened.value != null && opened.value instanceof Array) {
      letters.forEach((letter, index) => {
        if (opened.value.includes(index)) {
          letter.character = actualAnswer.value[index];
          letter.state = LetterState.BLOCKED;
        }
      });
    }
    userAnswer.value = letters.filter((item) => item.character !== " ");
  },
  { immediate: true }
);

const isLevelFinished = computed(
  () => actualAnswerWithoutSpaces.value === Letter.toString(userAnswer.value)
);

watch(isLevelFinished, (newValue) => {
  if (newValue) {
    ionRouter.navigate("/next-level/", "forward", "push");
  }
});

function onLetterChanged(index: number, letter: Letter) {
  userAnswer.value[index] = letter;
}

function onLetterPickerStateChanged(index: number, state: boolean) {
  letterPickerState.value[index] = state;
}
</script>

<template>
  <main-layout>
    <div class="level-title">
      <p class="level-title__text">
        {{ levelTitle }}
      </p>
    </div>
    <img class="level-image" alt="level-image" :src="imageSrc" />

    <UserInputs
      :user-answer="userAnswer"
      @update:letter="onLetterChanged"
      :letter-picker-collection="letterPickerCollection"
      @update:letter-picker-state="onLetterPickerStateChanged"
    ></UserInputs>

    <div class="hints">
      <ion-button fill="outline" color="tertiary">
        <ion-icon size="large" slot="start" :icon="eyeOutline"></ion-icon>
        <ion-icon size="large" slot="end" :icon="desktopOutline"></ion-icon>
      </ion-button>
      <ion-button fill="outline" color="tertiary">
        <ion-icon size="large" slot="start" :icon="trashBinOutline"></ion-icon>
        <ion-icon size="large" slot="end" :icon="desktopOutline"></ion-icon
      ></ion-button>
      <ion-button fill="outline" color="tertiary">
        <ion-icon
          size="large"
          slot="start"
          :icon="playForwardOutline"
        ></ion-icon>
        <ion-icon size="large" slot="end" :icon="desktopOutline"></ion-icon>
      </ion-button>
    </div>
  </main-layout>
</template>

<style scoped>
.level-title {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 10%;
  font-weight: 600;
}

.level-title__text {
  display: inline-block;
  font-size: 1.25rem;
  margin: 0;
}

.level-image {
  height: 50%;
  width: 100%;
  object-fit: cover;
}

.hints {
  display: flex;
  justify-content: space-between;
  height: 7%;
  padding: 0 5px;
}

ion-button {
  --padding-start: 1.2rem;
  --padding-end: 1.2rem;
}
</style>
