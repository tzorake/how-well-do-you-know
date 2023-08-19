<template>
  <div class="letter-picker">
    <div
      class="row"
      v-for="rowIndex in Math.ceil(props.letters.length / props.rowLength)"
      :key="rowIndex"
    >
      <VLetter
        v-for="(letter, i) in props.letters.slice(
          (rowIndex - 1) * props.rowLength,
          rowIndex * props.rowLength
        )"
        :key="i"
        @click="onAddLetter((rowIndex - 1) * props.rowLength + i)"
        >{{ letter }}</VLetter
      >
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import VLetter from "./VLetter.vue";

const props = defineProps({
  letters: {
    type: String,
    default: "",
  },
  rowLength: {
    type: Number,
    default: 9,
  },
});

const emit = defineEmits(["add:letter"]);

function onAddLetter(index) {
  emit("add:letter", index);
}
</script>

<style scoped>
.letter-picker {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.row {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}
</style>
