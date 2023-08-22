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
import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useData } from "@/services/fetchApi";
import UserInputs from "@/components/LevelView/UserInputs.vue";
import { Letter } from "@/utils/Letter";

const router = useRouter();
const route = useRoute();
const paths = [
  { name: "Алмазы", url: "/diamond" },
  { name: "Поделиться", url: "/share" },
  { name: "Об игре", url: "/about" },
  { name: "Контакты", url: "/contact" },
];

const id = route.params.id as string;

const levels = await useData("/levels/levels.json");
const levelTitle = ref<string>("");
const imageSrc = ref<string>("");
const mixin = ref<string>("");
const actualAnswer = ref<string>("");

const userAnswer = ref<Letter[]>([]);

const initialized = ref<boolean>(false);

onMounted(() => {
  levelTitle.value = levels.title;
  imageSrc.value = levels[id].image;
  mixin.value = levels[id].mixin;
  actualAnswer.value = levels[id].actual_answer;

  userAnswer.value = Letter.toLetters(actualAnswer.value.replaceAll(/\w/g, "_").replaceAll(/\s/g, ""));

  initialized.value = true;
});

const actualAnswerLetters = computed(() => {
  return actualAnswer.value.replaceAll(" ", "");
});

const isLevelFinished = computed(() => {
  return initialized.value 
  && actualAnswerLetters.value.length === userAnswer.value.length
  && actualAnswerLetters.value === Letter.toString(userAnswer.value)
});

function onUserAnswerChanged(newValue: Letter[]) {
  userAnswer.value = newValue;
}

watch(isLevelFinished, () => {
  router.push({ path: "/next-level/" + id });
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
          <ion-button>Уровень: 1</ion-button>
          <ion-button
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
        :actual-answer="actualAnswer"
        :user-answer="userAnswer"
        :mixin="mixin"
        @change:user-answer="onUserAnswerChanged"
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
