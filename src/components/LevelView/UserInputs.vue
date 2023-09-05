<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { IonButton, IonIcon } from "@ionic/vue";
import {
  playForwardOutline,
  desktopOutline,
  trashBinOutline,
  eyeOutline,
} from "ionicons/icons";
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

const actualAnswerWithoutSpaces = computed(() => {
  return props.letterPickerCollection.actualAnswerWithoutSpaces;
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

  const newLetter = new Letter("_", -1, letter.state);

  emit("update:letter-picker-state", cursor, false);
  emit("update:letter", index, newLetter);
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

    emit("update:letter-picker-state", index, true);
    emit("update:letter", cursor, newLetter);
  }
};

const letterByIndex = (letters: Letter[], index: number) => {
  return letters[index];
};

// converts i, j to index in the string[], where string[] words
// i - word index, j - char index
const flatIndex = (i: number, j: number) => {
  return (
    actualAnswerWords.value
      .filter((_, idx) => idx < i)
      .reduce((p, c) => p + c.length, 0) + j
  );
};

function onShowLetterHint() {
  const ua = props.userAnswer;
  const lpc = props.letterPickerCollection;
  const aaws = lpc.actualAnswerWithoutSpaces;
  const ml = mixedLetters.value;

  const indexes = ua.map((letter, idx) => ({ letter, idx })).filter(({ letter, idx }) => letter.character !== aaws[idx]).map(({ idx }): number => idx);
  if (indexes.length === 0) return;

  const uaIndex = indexes[Math.floor(Math.random() * indexes.length)];
  const character = aaws[uaIndex];
  if (ua[uaIndex].character !== "_") {
    emit("update:letter-picker-state", ua[uaIndex].index, false);
  }

  const entries = ml.split("")
    .map((ch, idx) => ({ ch, idx }))
    .filter(({ ch, idx }) => ch === character && !ua.find(letter => letter.character === ch && letter.index === idx && letter.state === LetterState.BLOCKED));

  const entry = entries.find(({ ch, idx }) => !ua.find((letter, index) => letter.index === idx && letter.state === LetterState.BLOCKED));
  if (entry == null) return;

  const letter = ua.find((letter) => letter.character === entry.ch && letter.index === entry.idx);
  const letterIndex = ua.findIndex((letter) => letter.character === entry.ch && letter.index === entry.idx);
  if (letter != null) {
    emit("update:letter-picker-state", ua[letterIndex].index, false);
    emit("update:letter", letterIndex, new Letter("_", -1));
  }

  emit("update:letter-picker-state", entry.idx, true);
  emit("update:letter", uaIndex, new Letter(character, entry.idx, LetterState.BLOCKED));
}

function onShowRequiredLettersHint() {
  const ua = props.userAnswer;
  const lpc = props.letterPickerCollection;
  const aaws = lpc.actualAnswerWithoutSpaces;
  const ml = mixedLetters.value;

  ml.split("").forEach((character, index) => {
    if (!aaws.includes(character)) {
      const entry = ua.map((letter, idx) => ({ letter, idx })).find(({letter, idx}) => letter.index === idx && letter.state !== LetterState.BLOCKED);
      if (entry != null) {
        emit("update:letter", entry.idx, new Letter("_", -1));
      }

      emit("update:letter-picker-state", index, true);
    }
  });

  ua.forEach((_, index) => {
    emit("update:letter", index, new Letter("_", -1));
  });
}

function onCompleteLevelHint() {
  const ua = props.userAnswer;
  const lpc = props.letterPickerCollection;
  const aaws = lpc.actualAnswerWithoutSpaces;
  const ml = mixedLetters.value;

  aaws.split("").forEach((character, index) => {
    if (ua[index].character !== "_") {
      emit("update:letter-picker-state", ua[index].index, false);
    }

    const entries = ml.split("")
      .map((ch, idx) => ({ ch, idx }))
      .filter(({ ch, idx }) => ch === character && !ua.find(letter => letter.character === ch && letter.index === idx && letter.state === LetterState.BLOCKED));

    const entry = entries.find(({ ch, idx }) => !ua.find((letter, index) => letter.index === idx && letter.state === LetterState.BLOCKED));
    if (entry == null) return;

    const letter = ua.find((letter) => letter.character === entry.ch && letter.index === entry.idx);
    const letterIndex = ua.findIndex((letter) => letter.character === entry.ch && letter.index === entry.idx);
    if (letter != null) {
      emit("update:letter-picker-state", ua[letterIndex].index, false);
      emit("update:letter", letterIndex, new Letter("_", letter.index));
    }

    emit("update:letter-picker-state", entry.idx, true);
    emit("update:letter", index, new Letter(character, entry.idx, LetterState.BLOCKED));
  });
}
</script>

<template>
  <!-- USER-ANSWER -->
  <div class="user-answer">
    <span v-for="(word, wordIndex) in actualAnswerWords" :key="wordIndex" class="word">
      <span
        v-for="(_, charIndex) in word"
        :key="`${wordIndex},${charIndex}`"
        @click="onRemoveLetter(flatIndex(wordIndex, charIndex))"
        :class="{
          'inplace-letter':
            letterByIndex(props.userAnswer, flatIndex(wordIndex, charIndex)).state !== LetterState.BLOCKED &&
            letterByIndex(props.userAnswer, flatIndex(wordIndex, charIndex)).character !== '_',
          'blocked-letter':
            letterByIndex(props.userAnswer, flatIndex(wordIndex, charIndex)).state === LetterState.BLOCKED &&
            letterByIndex(props.userAnswer, flatIndex(wordIndex, charIndex)).character !== '_',
          'wrong-letter':
            letterByIndex(props.userAnswer, flatIndex(wordIndex, charIndex)).state !== LetterState.BLOCKED && 
            !Letter.toString(props.userAnswer).includes('_') && 
            Letter.toString(props.userAnswer) !== letterPickerCollection.actualAnswerWithoutSpaces,
        }"
        class="letter-placeholder"
      >
        {{ letterByIndex(props.userAnswer, flatIndex(wordIndex, charIndex)).character }}
      </span>
    </span>
  </div>

  <!-- LETTER-PICKER -->
  <div class="letter-picker">
    <div
      class="row"
      v-for="(_, rowIndex) in Math.ceil(mixedLetters.length / rowLength)" :key="rowIndex"
    >
      <AppLetter
        v-for="(character, charIndex) in mixedLetters.slice(rowIndex * rowLength, (rowIndex + 1) * rowLength)"
        :key="charIndex"
        :style="{
          width: `calc((100% - ${rowLength - 1}*0.5rem) / ${rowLength})`,
        }"
        :class="{
          transparent: letterPickerState[rowIndex * rowLength + charIndex],
        }"
        @click="onAddLetter(rowIndex * rowLength + charIndex)"
        >{{ character }}
      </AppLetter>
    </div>
  </div>

  <!-- HINTS -->
  <div class="hints">
    <div class="hints-container">
      <!-- SHOW A LETTER -->
      <ion-button fill="outline" color="tertiary" @click="onShowLetterHint">
        <ion-icon size="large" slot="start" :icon="eyeOutline"></ion-icon>
        <ion-icon size="large" slot="end" :icon="desktopOutline"></ion-icon>
      </ion-button>

      <!-- SHOW ONLY REQUIRED LETTERS -->
      <ion-button
        fill="outline"
        color="tertiary"
        @click="onShowRequiredLettersHint"
      >
        <ion-icon size="large" slot="start" :icon="trashBinOutline"></ion-icon>
        <ion-icon size="large" slot="end" :icon="desktopOutline"></ion-icon
      ></ion-button>

      <!-- COMPLETE LEVEL -->
      <ion-button fill="outline" color="tertiary" @click="onCompleteLevelHint">
        <ion-icon
          size="large"
          slot="start"
          :icon="playForwardOutline"
        ></ion-icon>
        <ion-icon size="large" slot="end" :icon="desktopOutline"></ion-icon>
      </ion-button>
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

.hints {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
}

.hints-container {
  display: flex;
  justify-content: space-between;
  padding: 0 5px;
}
</style>
