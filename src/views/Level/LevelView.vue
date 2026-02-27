<script setup lang="ts">
/* Helpers */
import { computed, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { Letter } from "@/utils/Letter";
import { useIonRouter } from "@ionic/vue";
import { LetterPickerCollection } from "@/utils/LetterPickerCollection";
import { LetterState } from "@/utils/LetterState";
import { useLevelsStore } from "@/stores/levels";
import { useDiamondsStore } from "@/stores/diamonds";

/* Components */
import MainLayout from "@/layouts/MainLayout.vue";
import UserInputs from "./UserInputs.vue";

const ionRouter = useIonRouter();

const diamondsStore = useDiamondsStore();
const levelsStore = useLevelsStore();
const { levelsInfo, currentLevelIndex } = storeToRefs(levelsStore);

const levels = computed(() => levelsInfo.value.levels);
const levelTitle = computed(() => levelsInfo.value.title);
const imageSrc = computed(() => levels.value[currentLevelIndex.value].image);
const actualAnswer = computed(() =>
  levels.value[currentLevelIndex.value].actual_answer.toLowerCase()
);
const opened = computed(() => levels.value[currentLevelIndex.value].opened);
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
    const letters = Letter.toLetters(word).map(
      (letter) => new Letter(letter.character, -1, letter.state)
    );

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
    diamondsStore.setDiamonds(diamondsStore.diamonds + 100);
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
    <user-inputs
      :user-answer="userAnswer"
      @update:letter="onLetterChanged"
      :letter-picker-collection="letterPickerCollection"
      @update:letter-picker-state="onLetterPickerStateChanged"
    >
    </user-inputs>
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
  height: 45%;
  width: 100%;
  object-fit: cover;
}

ion-button {
  --padding-start: 1.2rem;
  --padding-end: 1.2rem;
}
</style>
