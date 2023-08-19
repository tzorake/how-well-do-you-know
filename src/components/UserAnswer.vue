<template>
  <div class="user-answer">
    <div class="placeholder__container">
      <template v-for="(word, i) in props.actualAnswer" :key="i">
        <VPlaceholder v-for="(_, j) in word" :key="`${i},${j}`" @click="onRemoveLetter(index(i, j))">{{ letter(index(i, j)) }}</VPlaceholder>
        <VPlaceholder class="space" v-if="i !== props.actualAnswer.length - 1"> </VPlaceholder>
      </template>
    </div>
  </div>
</template>

<script setup>
import VPlaceholder from "./VPlaceholder.vue";
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  actualAnswer: {
    type: Array,
    default: () => [],
  },
  userAnswer: {
    type: String,
    default: () => "",
  },
});

const emit = defineEmits(["remove:letter"]);

function letter(index) {
  return index < props.userAnswer.length ? props.userAnswer.at(index) : "";
}

function index(i, j) {
  return props.actualAnswer.filter((_, idx) => idx < i).reduce((prev, curr) => prev + curr.length, 0) + j
}

function onRemoveLetter(index) {
  if (index < props.userAnswer.length) {
    emit("remove:letter", index);
  }
}
</script>

<style scoped>
.user-answer {
  display: flex;
  justify-content: center;
  align-items: center;
}

.placeholder__container {
  display: flex;
  gap: 0.5rem;
}
</style>
