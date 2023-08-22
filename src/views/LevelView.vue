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
} from "@ionic/vue";
import {
  diamondOutline,
  playForwardOutline,
  desktopOutline,
  trashBinOutline,
  eyeOutline,
} from "ionicons/icons";
import { computed, ref, watch } from "vue";
import { useIonRouter } from "@ionic/vue";
import { useData } from "@/services/fetchApi";
import UserInputs from "@/components/LevelView/UserInputs.vue";
import { Letter } from "@/utils/Letter";
import { useStore } from "vuex";
const store = useStore();
const ionRouter = useIonRouter();
const paths = [
  { name: "Об игре", url: "/about" },
  { name: "Поделиться", url: "/share" },
  { name: "Алмазы", url: "/diamond" },
];

const levels = await useData("/levels/levels.json");
const currentLevelId = computed(() => store.state.currentLevelId);
const levelTitle = computed(() => levels.title);
const imageSrc = computed(() => levels[currentLevelId.value].image);
const mixin = computed(() => levels[currentLevelId.value].mixin);
const actualAnswer = computed(() => levels[currentLevelId.value].actual_answer);
const actualAnswerLetters = computed(() => {
  return actualAnswer.value.replaceAll(" ", "");
});

const userAnswer = ref<Letter[]>([]);

watch(
  currentLevelId,
  () => {
    userAnswer.value = Letter.toLetters(
      actualAnswer.value.replaceAll(/\w/g, "_").replaceAll(/\s/g, "")
    );
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
          <ion-button routerLink="/levels">Уровень: 1</ion-button>
          <ion-button routerLink="/diamond"
            >600
            <ion-icon slot="end" :icon="diamondOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title></ion-title>
      </ion-toolbar>
    </ion-header>

    <!-- CONTENT -->
    <ion-content id="main-content" class="ion-no-padding" :scroll-y="false">
      <div class="level-title">
        <p class="level-title__text">
          {{ levelTitle }}
        </p>
      </div>
      <img class="level-image" alt="level-image" :src="imageSrc" />

      <UserInputs
        v-model="userAnswer"
        :actual-answer="actualAnswer"
        :mixin="mixin"
      ></UserInputs>
    </ion-content>

    <!-- FOOTER -->
    <ion-footer>
      <div class="footer">
        <ion-button shape="round" fill="outline" color="tertiary">
          <ion-icon size="large" slot="start" :icon="eyeOutline"></ion-icon>
          <ion-icon size="large" slot="end" :icon="desktopOutline"></ion-icon>
        </ion-button>
        <ion-button shape="round" fill="outline" color="tertiary">
          <ion-icon
            size="large"
            slot="start"
            :icon="trashBinOutline"
          ></ion-icon>
          <ion-icon size="large" slot="end" :icon="desktopOutline"></ion-icon
        ></ion-button>
        <ion-button shape="round" fill="outline" color="tertiary">
          <ion-icon
            size="large"
            slot="start"
            :icon="playForwardOutline"
          ></ion-icon>
          <ion-icon size="large" slot="end" :icon="desktopOutline"></ion-icon>
        </ion-button>
      </div>
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
  justify-content: space-evenly;
  align-items: center;
  height: 56px;
}

ion-button {
  --padding-start: 1.2rem;
  --padding-end: 1.2rem;
}
</style>
