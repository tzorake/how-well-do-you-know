<script setup lang="ts">
import { computed, ref, watch } from "vue";
import AppLetter from "@/components/LevelView/AppLetter.vue";
import { Letter } from "@/utils/Letter";
import { LetterState } from "@/utils/LetterState";
import { LetterPickerCollection } from "@/utils/LetterPickerCollection";

const props = defineProps({
  userAnswer: {
    type: Array<Letter>,
    required: true,
  },
  letterPickerCollection: {
    type: LetterPickerCollection,
    required: true,
  },
});

const emit = defineEmits(["update:letter", "update:letter-picker-state"]);

const rowLength = ref<number>(9);

const actualAnswerWords = computed(() => {
  return props.letterPickerCollection.actualAnswerWords;
});

const mixedLetters = computed(() => {
  return props.letterPickerCollection.mixedLetters;
});

const letterPickerState = computed(() => {
  return props.letterPickerCollection.letterPickerState;
});

watch(mixedLetters, () => {}, { immediate: true });

const onRemoveLetter = (index: number) => {
  const letter = props.userAnswer[index];
  const cursor = letter.index;

  if (letter.state === LetterState.BLOCKED) {
    return;
  }

  const newLetter = new Letter("_", letter.index, letter.state);

  emit("update:letter", index, newLetter);
  emit("update:letter-picker-state", cursor, false);
};

const onAddLetter = (index: number) => {
  if (letterPickerState.value[index]) {
    return;
  }

  const letters = props.userAnswer;
  const cursor = letters.findIndex((l) => l.character === "_");
  const letter = letters[cursor];

  if (cursor > -1 && letter.character === "_") {
    const newLetter = new Letter(
      mixedLetters.value[index],
      index,
      letter.state
    );

    emit("update:letter", cursor, newLetter);
    emit("update:letter-picker-state", index, true);
  }
};

const letter = (index: number) => {
  return props.userAnswer[index];
};

const index = (i: number, j: number) => {
  return (
    actualAnswerWords.value
      .filter((_: string, idx: number) => idx < i)
      .reduce((prev: number, curr: string) => prev + curr.length, 0) + j
  );
};
</script>

<template>
  <!-- USER-ANSWER -->
  <div class="user-answer">
    <span v-for="(word, i) in actualAnswerWords" :key="i" class="word">
      <span
        v-for="(_, j) in word"
        :key="`${i},${j}`"
        @click="onRemoveLetter(index(i, j))"
        :class="{
          'inplace-letter':
            letter(index(i, j)).state !== LetterState.BLOCKED &&
            letter(index(i, j)).character !== '_',
          'blocked-letter':
            letter(index(i, j)).state === LetterState.BLOCKED &&
            letter(index(i, j)).character !== '_',
          'wrong-letter':
            letter(index(i, j)).state !== LetterState.BLOCKED &&
            !Letter.toString(props.userAnswer).includes('_'),
        }"
        class="letter-placeholder"
      >
        {{ letter(index(i, j)).character }}
      </span>
    </span>
  </div>

  <!-- LETTER-PICKER -->
  <div class="letter-picker">
    <div
      class="row"
      v-for="rowIndex in Math.ceil(mixedLetters.length / rowLength)"
      :key="rowIndex"
    >
      <AppLetter
        v-for="(letter, i) in mixedLetters.slice(
          (rowIndex - 1) * rowLength,
          rowIndex * rowLength
        )"
        :key="i"
        :style="{
          width: `calc((100% - ${rowLength - 1}*0.5rem) / ${rowLength})`,
        }"
        :class="{
          transparent: letterPickerState[(rowIndex - 1) * rowLength + i],
        }"
        @click="onAddLetter((rowIndex - 1) * rowLength + i)"
        >{{ letter }}
      </AppLetter>
    </div>
  </div>
</template>

<style scoped>
.user-answer {
  height: 10%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 2.5rem;
}

.word {
  display: flex;
  gap: 0.5rem;
}

.letter-placeholder {
  width: 2rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  border-bottom: 3px solid var(--ion-color-step-250);
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0;
  cursor: pointer;
  transition: all 0.1s linear;
}

.inplace-letter {
  border-bottom: 3px solid var(--ion-color-primary);
  font-size: 1rem;
}

.blocked-letter {
  color: var(--ion-color-warning);
  border-bottom: 3px solid var(--ion-color-warning);
  font-size: 1rem;
}

.letter-picker {
  height: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}

.row {
  width: calc(100% - 2 * 0.5rem);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin: 0 0.5rem;
}

.wrong-letter {
  color: var(--ion-color-danger) !important;
  border-color: var(--ion-color-danger);
}

.transparent {
  opacity: 0;
  cursor: default;
}
</style>
