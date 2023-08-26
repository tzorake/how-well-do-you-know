<script setup lang="ts">
import { shuffle } from "@/utils/StringUtils";
import { computed, ref, watch } from "vue";
import AppLetter from "@/components/LevelView/AppLetter.vue";
import { Letter } from "@/utils/Letter";
import { LetterState } from "@/utils/LetterState";

const props = defineProps({
  userAnswer: {
    type: Array<Letter>,
    required: true,
  },
  actualAnswer: {
    type: String,
    required: true,
  },
  mixin: {
    type: String,
    required: true,
  },
  opened: {
    type: Array<number>,
    required: true,
  },
});
const emit = defineEmits(["update:letter"]);

const rowLength = ref<number>(9);

const actualAnswerWords = computed(() => {
  return props.actualAnswer.split(" ");
});

const mixedLetters = computed(() => {
  const word = props.actualAnswer.replaceAll(" ", "") + props.mixin;
  return shuffle(word);
});
const letterStates = ref<boolean[]>([]);

watch(
  mixedLetters,
  () => {
    const states = new Array(mixedLetters.value.length).fill(false);
    props.opened.forEach(index => states[index] = true);
    letterStates.value = states;
  },
  { immediate: true }
);

const onRemoveLetter = (index: number) => {
  const letter = props.userAnswer[index];
  const cursor = letter.index;

  if (letter.state === LetterState.BLOCKED) {
    return;
  }

  const newLetter = new Letter("_", letter.index, letter.state);
  letterStates.value[cursor] = false;

  emit("update:letter", index, newLetter);
};

const onAddLetter = (index: number) => {
  if (letterStates.value[index]) {
    return;
  }

  const letters = props.userAnswer;
  const cursor = letters.findIndex((l) => l.letter === "_");
  const letter = letters.at(cursor);

  if (cursor > -1 && letter?.letter === "_") {
    const newLetter = new Letter(
      mixedLetters.value[index],
      index,
      letter?.state
    );
    letterStates.value[index] = true;

    emit("update:letter", cursor, newLetter);
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
          'letter-inplace':
            letter(index(i, j)).state !== LetterState.BLOCKED &&
            letter(index(i, j)).letter !== '_',
          'letter-blocked':
            letter(index(i, j)).state === LetterState.BLOCKED &&
            letter(index(i, j)).letter !== '_',
        }"
        class="letter-placeholder"
      >
        {{ letter(index(i, j)).letter }}
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
        :class="{ transparent: letterStates[(rowIndex - 1) * rowLength + i] }"
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
}

.letter-inplace {
  border-bottom: 3px solid var(--ion-color-primary);
  font-size: 1rem;
}

.letter-blocked {
  border-bottom: 3px solid var(--ion-color-warning);
  font-size: 1rem;
}

.letter-picker {
  height: 30%;
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

.transparent {
  opacity: 0;
}
</style>
