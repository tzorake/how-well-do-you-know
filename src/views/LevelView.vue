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
import AppLetter from "@/components/LevelView/AppLetter.vue";
import {
  diamondOutline,
  playForwardOutline,
  desktopOutline,
  trashBinOutline,
  eyeOutline,
} from "ionicons/icons";
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  insertCharacterAtIndex,
  removeCharacterAtIndex,
  shuffle,
} from "@/utils/StringUtils";
import { useData } from "@/services/fetchApi";

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
const mixin = computed(() => levels[id].mixin);
const imageSrc = computed(() => {
  return levels[id].image;
});
const levelTitle = computed(() => levels.title);

const actualAnswerLetters = computed(() => {
  return actualAnswer.value.replaceAll(" ", "");
});

const actualAnswer = computed(() => levels[id].actual_answer);

const actualAnswerWords = computed(() => {
  return actualAnswer.value.split(" ");
});

const rowLength = ref<number>(9);

const userAnswer = ref("");

const onRemoveLetter = (index: number) => {
  userAnswer.value = removeCharacterAtIndex(userAnswer.value, index);
};

const mixedLetters = computed(() => {
  const word = actualAnswerLetters.value + mixin.value;

  return shuffle(word);
});

const onAddLetter = (index: number) => {
  if (userAnswer.value.length < actualAnswerLetters.value.length) {
    userAnswer.value = insertCharacterAtIndex(
      userAnswer.value,
      userAnswer.value.length,
      mixedLetters.value[index]
    );
  }
};

const letter = (index: number) => {
  return index < userAnswer.value.length ? userAnswer.value.at(index) : "";
};

const index = (i: number, j: any) => {
  return (
    actualAnswerWords.value
      .filter((_: any, idx: number) => idx < i)
      .reduce((prev: any, curr: string | any[]) => prev + curr.length, 0) + j
  );
};

const isLevelFinished = computed(() => {
  return actualAnswerLetters.value === userAnswer.value;
});

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

      <!-- USER-ANSWER -->
      <div class="user-answer">
        <template v-for="(word, i) in actualAnswerWords" :key="i">
          <div
            v-for="(_, j) in word"
            :key="`${i},${j}`"
            @click="onRemoveLetter(index(i, j))"
            class="letter-placeholder"
          >
            {{ letter(index(i, j)) }}
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
            @click="onAddLetter((rowIndex - 1) * rowLength + i)"
            >{{ letter }}
          </AppLetter>
        </div>
      </div>
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
  border-bottom: 3px solid var(--ion-color-primary);
  font-weight: 600;
  font-size: 1rem;
  text-transform: uppercase;
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
