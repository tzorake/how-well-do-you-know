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
  IonLabel,
  IonTabButton,
  IonTabs,
  IonPage,
  IonMenuToggle,
  IonIcon,
  IonItem,
  IonTabBar,
  IonRouterOutlet,
} from "@ionic/vue";
import AppLetter from "@/components/LevelView/AppLetter.vue";
import { diamondOutline } from "ionicons/icons";
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
  <div>
    <ion-menu content-id="main-content">
      <ion-header>
        <ion-toolbar>
          <ion-title>Меню</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <IonMenuToggle :autoHide="false">
          <IonItem> Об игре </IonItem>
        </IonMenuToggle>
      </ion-content>
    </ion-menu>

    <!-- HEADER -->
    <ion-page id="main-content">
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
      <ion-content class="ion-no-padding" :scroll-y="false">
        <div class="level-title">
          <p>{{ levelTitle }}</p>
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

            <div class="letter-placeholder transparent" v-if="i !== actualAnswerWords.length - 1"> </div>
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
              :style="{ width: `calc((100% - ${rowLength - 1}*0.5rem) / ${rowLength})` }"
              @click="onAddLetter((rowIndex - 1) * rowLength + i)"
              >{{ letter }}
            </AppLetter>
          </div>
        </div>
      </ion-content>

      <!-- FOOTER -->
      <!-- <ion-tabs>
        <IonRouterOutlet></IonRouterOutlet>
        <ion-tab-bar slot="bottom" color="secondary">
          <ion-tab-button tab="show">
            <ion-label color="light">Показать букву</ion-label>
          </ion-tab-button>

          <ion-tab-button tab="remove">
            <ion-label color="light">Убрать лишние</ion-label>
          </ion-tab-button>

          <ion-tab-button tab="skip">
            <ion-label color="light">Пройти уровень</ion-label>
          </ion-tab-button>
        </ion-tab-bar>
      </ion-tabs> -->
    </ion-page>
  </div>
</template>

<style scoped>
.level-title {
  height: 5%;
  font-size: 17px;
  font-weight: 600;
  text-align: center;
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
}

.letter-picker {
  height: 35%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}

.row {
  width: calc(100% - 2*0.5rem);
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
