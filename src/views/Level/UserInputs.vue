<script setup lang="ts">
import { computed, ref, watch, onMounted } from "vue";
import { AlertButton, IonButton, IonIcon, alertController } from "@ionic/vue";
import { trashOutline, playForwardCircleOutline } from "ionicons/icons";
import AppLetter from "./AppLetter.vue";
import { Letter } from "@/utils/Letter";
import { LetterState } from "@/utils/LetterState";
import { LetterPickerCollection } from "@/utils/LetterPickerCollection";
import { useDiamondsStore } from "@/stores/diamonds";
import { useIonRouter } from "@ionic/vue";
import { useTriggerPopover } from "@/use/index";

const diamondsStore = useDiamondsStore();

const ionRouter = useIonRouter();

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
  diamondsStore.setDiamonds(diamondsStore.diamonds + 100);
  ionRouter.navigate("/next-level/", "forward", "push");

  // const ua = props.userAnswer;
  // const lpc = props.letterPickerCollection;
  // const aaws = lpc.actualAnswerWithoutSpaces;
  // const ml = mixedLetters.value;

  // aaws.split("").forEach((character, index) => {
  //   if (ua[index].character !== "_") {
  //     emit("update:letter-picker-state", ua[index].index, false);
  //   }

  //   const entries = ml
  //     .split("")
  //     .map((ch, idx) => ({ ch, idx }))
  //     .filter(
  //       ({ ch, idx }) =>
  //         ch === character &&
  //         !ua.find(
  //           (letter) =>
  //             letter.character === ch &&
  //             letter.index === idx &&
  //             letter.state === LetterState.BLOCKED
  //         )
  //     );

  //   const entry = entries.find(
  //     ({ ch, idx }) =>
  //       !ua.find(
  //         (letter, index) =>
  //           letter.index === idx && letter.state === LetterState.BLOCKED
  //       )
  //   );
  //   if (entry == null) return;

  //   const letter = ua.find(
  //     (letter) => letter.character === entry.ch && letter.index === entry.idx
  //   );
  //   const letterIndex = ua.findIndex(
  //     (letter) => letter.character === entry.ch && letter.index === entry.idx
  //   );
  //   if (letter != null) {
  //     emit("update:letter-picker-state", ua[letterIndex].index, false);
  //     emit("update:letter", letterIndex, new Letter("_", letter.index));
  //   }

  //   emit("update:letter-picker-state", entry.idx, true);
  //   emit(
  //     "update:letter",
  //     index,
  //     new Letter(character, entry.idx, LetterState.BLOCKED)
  //   );
  // });
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
      },
    },
  ];

  const canBuyHint = diamondsStore.diamonds >= price;
  if (canBuyHint) {
    buttons.unshift({
      text: "Купить",
      handler: () => {
        diamondsStore.setDiamonds(diamondsStore.diamonds - price);
        if (currentHint) {
          currentHint();
        }
      },
    });
  }

  const alert = await alertController.create({
    cssClass: "app-alert",
    header,
    subHeader: `Стоимость ${price} алмазов`,
    message: `Для того чтобы получить подсказку, ${
      canBuyHint
        ? "вы можете либо просмотреть рекламный ролик, либо использовать накопленные алмазы."
        : "вам нужно будет просмотреть рекламный ролик."
    }`,
    buttons,
  });

  await alert.present();
}

const isShownRequiredLetters = ref<boolean>(false);

const letterHint = ref<InstanceType<typeof IonButton>>();

onMounted(() => {
  const { trigger: triggerLetterHint } = useTriggerPopover(letterHint.value?.$el);
  triggerLetterHint();
});
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
        ref="letterHint"
        class="hints__button"
        fill="solid"
        color="light"
        @click="onClickHint('showLetter')"
      >
        Показать
        <ion-icon slot="end" size="large" class="letter-icon"></ion-icon>
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
  position: relative;
  width: 2rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0;
  cursor: pointer;
  transition: all 0.13s ease-out;
  animation-duration: 2s;
  animation-name: appearance-placeholder;
}

@keyframes appearance-placeholder {
  from {
    width: 0;
    margin: 0 16px;
  }

  to {
    width: 32px;
    margin: 0;
  }
}

.letter-placeholder::after {
  position: absolute;
  border-bottom: 3px solid var(--ion-color-step-250);
  width: 100%;
  bottom: 0;
  content: "";
}

.inplace-letter {
  font-size: 1rem;
}

.inplace-letter::after {
  position: absolute;
  border-bottom: 3px solid var(--ion-color-primary);
  width: 100%;
  bottom: 0;
  content: "";
}

.blocked-letter {
  font-size: 1rem;
  color: var(--ion-color-warning);
  animation-duration: 0.7s;
  animation-name: appearance-blocked-letter;
}

@keyframes appearance-blocked-letter {
  from {
    font-size: 3rem;
  }

  to {
    font-size: 1rem;
  }
}

.blocked-letter::after {
  position: absolute;
  border-bottom: 3px solid var(--ion-color-warning);
  width: 100%;
  bottom: 0;
  content: "";
}

.wrong-letter {
  font-size: 1rem;
  color: var(--ion-color-danger) !important;
}

.wrong-letter::after {
  position: absolute;
  border-bottom: 3px solid var(--ion-color-danger);
  width: 100%;
  bottom: 0;
  content: "";
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

.transparent {
  opacity: 0;
  cursor: default;
  transition: opacity 0.2s ease-in-out;
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
  justify-content: center;
  gap: 10px;
}

.hints__button {
  flex: 1;
  margin: 0;
  max-width: calc(50% - 5px);
}

.letter-icon {
  height: 32px;
  width: 32px;
  background-image: url("data:image/svg+xml,%3Csvg fill='%23000000' version='1.1' id='Capa_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='32px' height='32px' viewBox='0 20 312 312' xml:space='preserve'%3E%3Cg%3E%3Cg%3E%3Cpolygon points='194.229,91.162 204.627,103.513 189.356,106.437 '/%3E%3Cpolygon points='219.813,96.517 201.924,75.261 262.135,15.05 279.013,29.764 '/%3E%3Cpolygon points='273.567,3.623 277.189,0 292.623,14.413 289.704,17.696 '/%3E%3Cpath d='M103.054,152.958l-30.967-11.499l5.578-18.255l30.113,10.289C106.238,140.254,104.661,146.91,103.054,152.958z'/%3E%3Cpolygon points='67.366,156.908 98.733,168.559 94.729,182.891 63.035,171.095 '/%3E%3Cpath d='M117.682,160.657c1.596-5.667,3.129-11.946,4.611-18.368c1.683,6.407,3.417,12.69,5.134,18.451l12.804,43.546h-34.757 L117.682,160.657z'/%3E%3Cpath d='M113.794,107.54c-0.805,3.215-1.616,6.622-2.424,10.134l-28.988-9.903l4.024-13.173l30.431,8.444 C115.369,104.123,114.256,105.668,113.794,107.54z'/%3E%3Cpolygon points='26.917,289.286 30.841,276.444 68.513,290.198 64.61,304.268 '/%3E%3Cpolygon points='72.838,274.603 35.56,261.001 39.99,246.513 76.812,260.266 '/%3E%3Cpolygon points='22.192,304.761 41.5,312.44 19.843,312.44 '/%3E%3Cpath d='M184.874,312.44l-17.858-59.46c-1.019-3.412-4.158-5.738-7.73-5.738H88.009l-43.305-16.174l2.843-9.307l40.812,16.415 c0.99,0.394,2.005,0.571,3.01,0.571c3.191,0,6.213-1.904,7.483-5.044c1.665-4.142-0.338-8.84-4.472-10.488l-42.095-16.919 l6.031-19.742l32.058,11.948l-3.272,11.694c-0.683,2.425-0.184,5.045,1.338,7.05c1.525,2.011,3.908,3.192,6.423,3.192h56.146 c2.548,0,4.934-1.197,6.457-3.239c1.517-2.025,1.989-4.661,1.271-7.097l-15.845-53.925c-3.769-12.574-7.569-27.912-10.929-41.449 l-1.774-7.155c-0.581-2.368-2.236-4.179-4.325-5.2c1.406-1.031,2.509-2.514,3.015-4.333c1.197-4.294-1.323-8.735-5.616-9.927 l-32.14-8.924l1.402-4.59h63.457l13.837,44.593c0,0.005,0,0.014,0,0.019l59.928,193.253L184.874,312.44L184.874,312.44z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}
</style>
