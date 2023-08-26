<script setup lang="ts">
import {
  IonHeader,
  IonButtons,
  IonToolbar,
  IonMenu,
  IonTitle,
  IonContent,
  IonMenuButton,
  IonButton,
  IonPage,
  IonMenuToggle,
  IonIcon,
  IonItem,
  IonFooter,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/vue";
import {
  diamondOutline,
  playForwardOutline,
  desktopOutline,
  trashBinOutline,
  eyeOutline,
} from "ionicons/icons";
import { computed, ref, watch } from "vue";
import { useData } from "@/services/fetchApi";
import { Letter } from "@/utils/Letter";
import { generateUniqueRandomLetters } from "@/utils/StringUtils";
import UserInputs from "@/components/LevelView/UserInputs.vue";

import { useStore } from "vuex";
const store = useStore();

import { useIonRouter } from "@ionic/vue";
import { LetterState } from "@/utils/LetterState";
const ionRouter = useIonRouter();
const paths = [
  { name: "Об игре", url: "/about" },
  { name: "Поделиться", url: "/share" },
  { name: "Алмазы", url: "/diamond" },
  { name: "Уровни", url: "/levels" },
];

const data = await useData("/levels/levels.json");
const levels = data.levels;
const diamonds = computed(() => store.state.diamonds);
const currentLevelIndex = computed(() => store.state.currentLevelIndex);
const levelTitle = computed(() => data.title);
const imageSrc = computed(() => levels[currentLevelIndex.value].image);
const opened = computed(() => levels[currentLevelIndex.value].opened);
const actualAnswer = computed(
  () => levels[currentLevelIndex.value].actual_answer
);
const actualAnswerLetters = computed(() => {
  return actualAnswer.value.replaceAll(" ", "");
});
const mixin = computed(() => {
  const lettersArr = actualAnswerLetters.value.split("");
  return generateUniqueRandomLetters(lettersArr, 18 - lettersArr.length).join(
    ""
  );
});

const userAnswer = ref<Letter[]>([]);

watch(
  currentLevelIndex,
  () => {
    const word = actualAnswer.value.replaceAll(/[а-яА-Я]/g, "_");
    const letters = Letter.toLetters(word);
    if (opened.value != null && opened.value instanceof Array) {
      letters.forEach((letter, index) => {
        if (opened.value.includes(index)) {
          letter.letter = actualAnswer.value[index];
          letter.state = LetterState.BLOCKED;
        }
      });
    }
    userAnswer.value = letters.filter(item => item.letter !== " ");
  },
  { immediate: true }
);

const isLevelFinished = computed(
  () => actualAnswerLetters.value === Letter.toString(userAnswer.value)
);

watch(isLevelFinished, (newValue) => {
  if (newValue) {
    ionRouter.navigate("/next-level/", "forward", "push");
  }
});

function onLetterChanged(cursor: number, letter: Letter) {
  userAnswer.value[cursor] = letter;
}

</script>

<template>
  <ion-page>
    <ion-menu content-id="main-content">
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Меню</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <IonMenuToggle v-for="path in paths" :key="path.name" :autoHide="false">
          <IonItem :routerLink="path.url" router-direction="forward">
            {{ path.name }}
          </IonItem>
        </IonMenuToggle>
      </ion-content>
    </ion-menu>

    <!-- HEADER -->
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-buttons slot="end">
          <ion-button routerLink="/levels"
            >Уровень: {{ currentLevelIndex + 1 }}</ion-button
          >
          <ion-button routerLink="/diamond"
            >{{ diamonds }}
            <ion-icon slot="end" :icon="diamondOutline" />
          </ion-button>
        </ion-buttons>
        <ion-title></ion-title>
      </ion-toolbar>
    </ion-header>

    <!-- CONTENT -->
    <ion-content id="main-content" class="ion-no-padding" :scroll-y="false">
      <ion-grid class="ion-no-padding" style="height: 100%" fixed>
        <ion-row class="ion-justify-content-center" style="height: 100%">
          <ion-col
            size="12"
            sizeMd="8"
            sizeLg="6"
            sizeXl="4"
            style="height: 100%"
          >
            <div class="level-title">
              <p class="level-title__text">
                {{ levelTitle }}
              </p>
            </div>
            <img class="level-image" alt="level-image" :src="imageSrc" />

            <UserInputs
              :user-answer="userAnswer"
              :actual-answer="actualAnswer"
              :mixin="mixin"
              :opened="opened"
              @update:letter="onLetterChanged"
            ></UserInputs>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>

    <!-- FOOTER -->
    <ion-footer>
      <ion-grid fixed>
        <ion-row class="ion-justify-content-center">
          <ion-col size="12" sizeMd="8" sizeLg="6" sizeXl="4">
            <div class="footer">
              <ion-button shape="round" fill="outline" color="tertiary">
                <ion-icon
                  size="large"
                  slot="start"
                  :icon="eyeOutline"
                ></ion-icon>
                <ion-icon
                  size="large"
                  slot="end"
                  :icon="desktopOutline"
                ></ion-icon>
              </ion-button>
              <ion-button shape="round" fill="outline" color="tertiary">
                <ion-icon
                  size="large"
                  slot="start"
                  :icon="trashBinOutline"
                ></ion-icon>
                <ion-icon
                  size="large"
                  slot="end"
                  :icon="desktopOutline"
                ></ion-icon
              ></ion-button>
              <ion-button shape="round" fill="outline" color="tertiary">
                <ion-icon
                  size="large"
                  slot="start"
                  :icon="playForwardOutline"
                ></ion-icon>
                <ion-icon
                  size="large"
                  slot="end"
                  :icon="desktopOutline"
                ></ion-icon>
              </ion-button>
            </div>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-footer>
  </ion-page>
</template>

<style scoped>
.level-title {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 10%;
  font-weight: 600;
}

.level-title__text {
  display: inline-block;
  font-size: 1.25rem;
  margin: 0;
}

.level-image {
  height: 50%;
  width: 100%;
  object-fit: cover;
}

.footer {
  display: flex;
  justify-content: space-between;
}

ion-button {
  --padding-start: 1.2rem;
  --padding-end: 1.2rem;
}
</style>
