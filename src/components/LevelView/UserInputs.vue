<script setup lang="ts">
import { replaceCharAtIndex, shuffle } from '@/utils/StringUtils';
import { computed, ref, watch } from 'vue';
import AppLetter from "@/components/LevelView/AppLetter.vue";
import { Letter } from '@/utils/Letter';

const props = defineProps({
  actualAnswer: {
    type: String,
    required: true,
  },
  userAnswer: {
    type: Array<Letter>,
    required: true,
  },
  mixin: {
    type: String,
    required: true,
  }
});
const emit = defineEmits([
  "change:userAnswer",
]);

const rowLength = ref<number>(9);

const actualAnswerWords = computed(() => {
  return props.actualAnswer.split(" ");
});

const mixedLetters = computed(() => {
  const word = props.actualAnswer.replaceAll(" ", "") + props.mixin;

  return shuffle(word);
});
const letterStates = ref<boolean[]>([]);

watch(() => mixedLetters, () => {
  letterStates.value = new Array(mixedLetters.value.length).fill(false);
}, { immediate: true });

const onRemoveLetter = (index: number) => {
  const stateIndex = props.userAnswer[index].index;
  letterStates.value[stateIndex] = false;

  props.userAnswer[index] = new Letter("_", index);

  emit("change:userAnswer", props.userAnswer.map(l => l.copy()));
};

const onAddLetter = (index: number) => {
  if(letterStates.value[index]) {
    return;
  }

  const cursor = props.userAnswer.findIndex(l => l.letter === "_");

  if (cursor > -1 && props.userAnswer.at(cursor)?.letter === "_") {
    props.userAnswer[cursor] = new Letter(mixedLetters.value[index], index);

    letterStates.value[index] = true;
    emit("change:userAnswer", props.userAnswer.map(l => l.copy()));
  }
};

const letter = (index: number) => {
  return props.userAnswer.at(index);
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
    <template v-for="(word, i) in actualAnswerWords" :key="i">
      <div
        v-for="(_, j) in word"
        :key="`${i},${j}`"
        @click="onRemoveLetter(index(i, j))"
        :class="{ 'letter-inplace': letter(index(i, j))?.letter !== '_' }"
        class="letter-placeholder"
      >
        {{ letter(index(i, j))?.letter }}
      </div>

      <div
        class="letter-placeholder transparent"
        v-if="i !== actualAnswerWords.length - 1"
      ></div>
    </template>
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
        :class="{ 'transparent': letterStates[(rowIndex - 1) * rowLength + i] }"
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
  justify-content: center;
  align-items: center;
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
