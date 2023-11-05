<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { AlertButton, IonButton, IonIcon, alertController } from "@ionic/vue";
import {
  trashOutline,
  languageOutline,
  playForwardCircleOutline,
} from "ionicons/icons";
import { showToast } from "@/helpers/toast";
import AppLetter from "@/components/LevelView/AppLetter.vue";
import { Letter } from "@/utils/Letter";
import { LetterState } from "@/utils/LetterState";
import { LetterPickerCollection } from "@/utils/LetterPickerCollection";
import { useDiamondsStore } from "@/stores/diamonds";
import { useLevelsStore } from "@/stores/levels";

const diamondsStore = useDiamondsStore();
const levelsStore = useLevelsStore();

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

watch(
  () => props.userAnswer,
  () => {
    isShownRequiredLetters.value = false;
  }
);

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

  const indexes = ua
    .map((letter, idx) => ({ letter, idx }))
    .filter(({ letter, idx }) => letter.character !== aaws[idx])
    .map(({ idx }): number => idx);
  if (indexes.length === 0) return;

  const uaIndex = indexes[Math.floor(Math.random() * indexes.length)];
  const character = aaws[uaIndex];
  if (ua[uaIndex].character !== "_") {
    emit("update:letter-picker-state", ua[uaIndex].index, false);
  }

  const entries = ml
    .split("")
    .map((ch, idx) => ({ ch, idx }))
    .filter(
      ({ ch, idx }) =>
        ch === character &&
        !ua.find(
          (letter) =>
            letter.character === ch &&
            letter.index === idx &&
            letter.state === LetterState.BLOCKED
        )
    );

  const entry = entries.find(
    ({ ch, idx }) =>
      !ua.find(
        (letter, index) =>
          letter.index === idx && letter.state === LetterState.BLOCKED
      )
  );
  if (entry == null) return;

  const letter = ua.find(
    (letter) => letter.character === entry.ch && letter.index === entry.idx
  );
  const letterIndex = ua.findIndex(
    (letter) => letter.character === entry.ch && letter.index === entry.idx
  );
  if (letter != null) {
    emit("update:letter-picker-state", ua[letterIndex].index, false);
    emit("update:letter", letterIndex, new Letter("_", -1));
  }

  emit("update:letter-picker-state", entry.idx, true);
  emit(
    "update:letter",
    uaIndex,
    new Letter(character, entry.idx, LetterState.BLOCKED)
  );
}

function onShowRequiredLettersHint() {
  isShownRequiredLetters.value = true;

  const ua = props.userAnswer;
  const lpc = props.letterPickerCollection;
  const aaws = lpc.actualAnswerWithoutSpaces;
  const ml = mixedLetters.value;

  console.log(ml);
  ml.split("").forEach((character, index) => {
    if (!aaws.includes(character)) {
      const entry = ua
        .map((letter, idx) => ({ letter, idx }))
        .find(
          ({ letter, idx }) =>
            letter.index === idx && letter.state !== LetterState.BLOCKED
        );
      if (entry != null) {
        emit("update:letter", entry.idx, new Letter("_", -1));
      }

      emit("update:letter-picker-state", index, true);
    }
  });

  ua.forEach((letter, index) => {
    if (letter.state !== LetterState.BLOCKED) {
      emit("update:letter", index, new Letter("_", -1));
    }
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

    const entries = ml
      .split("")
      .map((ch, idx) => ({ ch, idx }))
      .filter(
        ({ ch, idx }) =>
          ch === character &&
          !ua.find(
            (letter) =>
              letter.character === ch &&
              letter.index === idx &&
              letter.state === LetterState.BLOCKED
          )
      );

    const entry = entries.find(
      ({ ch, idx }) =>
        !ua.find(
          (letter, index) =>
            letter.index === idx && letter.state === LetterState.BLOCKED
        )
    );
    if (entry == null) return;

    const letter = ua.find(
      (letter) => letter.character === entry.ch && letter.index === entry.idx
    );
    const letterIndex = ua.findIndex(
      (letter) => letter.character === entry.ch && letter.index === entry.idx
    );
    if (letter != null) {
      emit("update:letter-picker-state", ua[letterIndex].index, false);
      emit("update:letter", letterIndex, new Letter("_", letter.index));
    }

    emit("update:letter-picker-state", entry.idx, true);
    emit(
      "update:letter",
      index,
      new Letter(character, entry.idx, LetterState.BLOCKED)
    );
  });
}

/**
 * Функция обработки нажатия на подсказку
 */
async function onClickHint(
  mode: "showLetter" | "onlyRequired" | "completeLevel"
) {
  let currentHint: Function;
  let price: number;
  let header: string;
  switch (mode) {
    case "showLetter":
      currentHint = onShowLetterHint;
      header = "Показать букву";
      price = 300;
      break;
    case "onlyRequired":
      currentHint = onShowRequiredLettersHint;
      header = "Удалить лишние буквы";
      price = 700;
      break;
    case "completeLevel":
      currentHint = onCompleteLevelHint;
      header = "Пройти уровень";
      price = 1500;
      break;
  }

  const buttons: AlertButton[] = [
    {
      text: "Смотреть",
      cssClass: "watch-button",
      handler: () => {
        console.log("Запуск видео");
        if (currentHint) {
          currentHint();
        }
        if (["showLetter", "onlyRequired"].includes(mode)) {
          showToast(`Вы получили подсказку: "${header}"`);
        }
      },
    },
  ];

  if (diamondsStore.diamonds >= price) {
    buttons.push({
      text: "Купить",
      handler: () => {
        diamondsStore.setDiamonds(diamondsStore.diamonds - price);
        if (currentHint) {
          currentHint();
        }
        if (["showLetter", "onlyRequired"].includes(mode)) {
          showToast(`Вы купили подсказку: "${header}"`);
        }
      },
    });
  }

  const alert = await alertController.create({
    cssClass: "app-alert",
    header,
    subHeader: `Стоимость ${price} алмазов`,
    message:
      "У вас есть два варианта: либо просмотреть рекламный ролик, либо использовать ваши алмазы.",
    buttons,
  });

  await alert.present();
}

const isShownRequiredLetters = ref<boolean>(false);
</script>

<template>
  <!-- USER-ANSWER -->
  <div class="user-answer">
    <span
      v-for="(word, wordIndex) in actualAnswerWords"
      :key="wordIndex"
      class="word"
    >
      <span
        v-for="(_, charIndex) in word"
        :key="`${wordIndex},${charIndex}`"
        @click="onRemoveLetter(flatIndex(wordIndex, charIndex))"
        :class="{
          'inplace-letter':
            letterByIndex(props.userAnswer, flatIndex(wordIndex, charIndex))
              .state !== LetterState.BLOCKED &&
            letterByIndex(props.userAnswer, flatIndex(wordIndex, charIndex))
              .character !== '_',
          'blocked-letter':
            letterByIndex(props.userAnswer, flatIndex(wordIndex, charIndex))
              .state === LetterState.BLOCKED &&
            letterByIndex(props.userAnswer, flatIndex(wordIndex, charIndex))
              .character !== '_',
          'wrong-letter':
            letterByIndex(props.userAnswer, flatIndex(wordIndex, charIndex))
              .state !== LetterState.BLOCKED &&
            !Letter.toString(props.userAnswer).includes('_') &&
            Letter.toString(props.userAnswer) !==
              letterPickerCollection.actualAnswerWithoutSpaces,
        }"
        class="letter-placeholder"
      >
        {{
          letterByIndex(props.userAnswer, flatIndex(wordIndex, charIndex))
            .character
        }}
      </span>
    </span>
  </div>

  <!-- LETTER-PICKER -->
  <div class="letter-picker">
    <div
      class="row"
      v-for="(_, rowIndex) in Math.ceil(mixedLetters.length / rowLength)"
      :key="rowIndex"
    >
      <AppLetter
        v-for="(character, charIndex) in mixedLetters.slice(
          rowIndex * rowLength,
          (rowIndex + 1) * rowLength
        )"
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
      <ion-button
        class="hints__button"
        fill="solid"
        color="light"
        @click="onClickHint('showLetter')"
      >
        Показать
        <ion-icon slot="end" size="large" :icon="languageOutline"></ion-icon>
      </ion-button>

      <!-- SHOW ONLY REQUIRED LETTERS -->
      <ion-button
        class="hints__button"
        :fill="isShownRequiredLetters ? 'outline' : 'solid'"
        :disabled="isShownRequiredLetters"
        color="danger"
        @click="onClickHint('onlyRequired')"
      >
        Удалить
        <ion-icon slot="end" size="large" :icon="trashOutline"></ion-icon>
      </ion-button>

      <!-- COMPLETE LEVEL -->
      <ion-button
        class="hints__button"
        fill="solid"
        color="success"
        @click="onClickHint('completeLevel')"
      >
        Пройти
        <ion-icon
          slot="end"
          size="large"
          :icon="playForwardCircleOutline"
        ></ion-icon>
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
  height: 15%;
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
  margin: 0 8px;
}

.hints-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.hints__button {
  flex: 1;
  margin: 0;
}
</style>
