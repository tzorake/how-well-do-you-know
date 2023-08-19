<template>
  <div class="level-view">
    <div class="level-view__layout">
      <div class="title">Well Done!</div>
      <div class="image__wrapper">
        <img class="image" :src="image" alt="image" />
      </div>
      <div class="answer">
        <p>{{ actualAnswer }}</p>
      </div>
      <div class="buttons__wrapper">
        <div class="buttons">
          <button class="dislike-button">Boring</button>
          <button class="like-button">Fun</button>
          <button class="continue-button" @click="onContinue">Continue</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useData } from './API';

const data = await useData("/levels.json");
const router = useRouter();
const route = useRoute();
const id = ref(route.params.id);

const actualAnswer = computed(() => data[id.value]["actual_answer"]);
const image = computed(() => data[id.value]["image"]);

function onContinue() {
  router.push({ path: "/level-view/" + (parseInt(id.value) + 1) });
}

</script>

<style scoped>
.level-view {
  height: calc(100vh - 2 * 2rem);
}

.level-view__layout {
  height: 100%;
  display: grid;
  margin: 2rem auto;
}

.title {
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 2rem;
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

.title {
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 2rem;
}

.answer {
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 2rem;
  text-transform: uppercase;
}

.buttons__wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.buttons {
  max-width: 22rem;

  display: grid;
  grid-template-areas:
    "dislike like"
    "continue continue";
  gap: 0.5rem;
  flex-grow: 1;
}

.displike-button {
  grid-area: dislike;
  height: 2rem;
}

.like-button {
  grid-area: like;
  height: 2rem;
}

.continue-button {
  grid-area: continue;
  height: 2rem;
}
</style>
