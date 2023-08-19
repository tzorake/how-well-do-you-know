<template>
  <div class="level-view">
    <div class="level-view__navbar">
      <button class="menu">
        <svg
          width="20"
          height="20"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 17 14"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M1 1h15M1 7h15M1 13h15"
          />
        </svg>
      </button>
      <div class="buttons">
        <button class="level">Level 1</button>
        <button class="coins">
          <span class="amount">600</span>
          <svg
            class="icon"
            width="20"
            height="20"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path
              d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
            />
          </svg>
        </button>
      </div>
    </div>
    <div class="level-view__layout">
      <div class="title">
        <slot name="title"></slot>
      </div>
      <div class="image__wrapper">
        <img class="image" :src="image" alt="image" />
      </div>
      <UserAnswer
        :actual-answer="actualAnswerWords"
        :user-answer="userAnswer"
        @remove:letter="onRemoveLetter"
      >
      </UserAnswer>
      <LetterPicker
        :letters="mixedLetters"
        @add:letter="onAddLetter"
      ></LetterPicker>
    </div>
  </div>
</template>

<script setup>
import UserAnswer from "./UserAnswer.vue";
import LetterPicker from "./LetterPicker.vue";
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  insertCharacterAtIndex,
  removeCharacterAtIndex,
  shuffle,
} from "./StringUtils.js";
import { useData } from "./API.js";

const data = await useData("/levels.json");
const router = useRouter();
const route = useRoute();
const id = ref(route.params.id);

const actualAnswer = computed(() => data[id.value]["actual_answer"]);
const mixin = computed(() => data[id.value]["mixin"]);
const userAnswer = ref("");
const actualAnswerLetters = computed(() => {
  return actualAnswer.value.replaceAll(" ", "");
});
const isLevelFinished = computed(() => {
  return actualAnswerLetters.value === userAnswer.value;
});
const mixedLetters = computed(() => {
  const word = actualAnswerLetters.value + mixin.value;

  return shuffle(word);
});

const image = computed(() => {
  return data[id.value]["image"];
});

const actualAnswerWords = computed(() => {
  return actualAnswer.value.split(" ");
});

function onRemoveLetter(index) {
  userAnswer.value = removeCharacterAtIndex(userAnswer.value, index);
}

function onAddLetter(index) {
  if (userAnswer.value.length < actualAnswerLetters.value.length) {
    userAnswer.value = insertCharacterAtIndex(
      userAnswer.value,
      userAnswer.value.length,
      mixedLetters.value[index]
    );
  }
}

watch(isLevelFinished, (newValue, oldValue) => {
  if (newValue != oldValue) {
    router.push({ path: "/next-level/" + id.value });
  }
});
</script>

<style scoped>
.level-view {
  height: calc(100vh - 2 * 2rem);
}

.level-view__layout {
  height: 100%;
  display: grid;
  margin: 0 auto;
}

.image__wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.image {
  width: 100%;
  max-width: 22rem;
  aspect-ratio: 1/1;
  object-fit: cover;
}

.level-view__navbar {
  display: flex;
  justify-content: space-between;
}

.menu {
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: transparent;
  border: 0;

  width: 2rem;
  height: 2rem;
}

.buttons {
  display: flex;
  gap: 0.5rem;
  padding: 0 0.5rem;
}

.level,
.coins {
  width: 5rem;
  height: 2rem;
}

.coins {
  display: flex;
  justify-content: center;
  align-items: center;

  gap: 0.25rem;
}
</style>
