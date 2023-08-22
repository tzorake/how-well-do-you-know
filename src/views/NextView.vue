<script setup lang="ts">
import { useData } from "@/services/fetchApi";
import { IonPage, IonContent, IonButton } from "@ionic/vue";
import { computed } from "vue";
import { useIonRouter } from '@ionic/vue';
import { useStore } from "vuex";
const store = useStore();
const ionRouter = useIonRouter();

const currentLevelId = computed(() => store.state.currentLevelId);
const levels = await useData("/levels/levels.json");
const imageSrc = computed(() => {
  return levels[currentLevelId.value].image;
});
const actualAnswer = computed(() => levels[currentLevelId.value].actual_answer);

async function onContinue() {
  ionRouter.navigate("/level-view/", "back", "pop");
  store.dispatch("setCurrentLevelId", currentLevelId.value + 1);
}
</script>

<template>
  <ion-page>
    <ion-content>
      <div class="level-title">
        <p class="level-title__text">Отлично!</p>
      </div>
      <img class="level-image" alt="level-image" :src="imageSrc" />

      <div class="level-answer">
        {{ actualAnswer }}
      </div>

      <div class="buttons">
        <ion-button class="boring-button" color="warning">Скучно</ion-button>
        <ion-button class="fun-button" color="warning">Отлично</ion-button>
        <ion-button class="continue-button" color="warning" @click="onContinue"
          >Продолжить</ion-button
        >
      </div>
    </ion-content>
  </ion-page>
</template>

<style scoped>
.level-title {
  height: 15%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
}

.level-image {
  height: 50%;
  width: 100%;
  object-fit: cover;
}

.level-answer {
  height: 15%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 1.5rem;
}

.buttons {
  height: 20%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-template-areas:
    "boring-button fun-button"
    "continue-button continue-button";
  padding: 1rem;
  gap: 0.5rem;
}

.boring-button {
  grid-area: boring-button;
}

.fun-button {
  grid-area: fun-button;
}

.continue-button {
  grid-area: continue-button;
}
</style>
