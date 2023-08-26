<script setup lang="ts">
import BackLayout from "@/layouts/BackLayout.vue";
import LevelListItem from "@/components/LevelListView/LevelListItem.vue";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { LevelListItemState } from "@/utils/LevelListItemState";
import { useIonRouter } from "@ionic/vue";
import { useData } from "@/services/fetchApi";
import { IonAlert, IonGrid, IonRow, IonCol } from "@ionic/vue";

const data = await useData("/levels/levels.json");
const levels = data.levels;
const store = useStore();
const ionRouter = useIonRouter();
const lastAvailableLevelIndex = computed(
  () => store.state.lastAvailableLevelIndex
);
const isOpenFinishAlert = ref(lastAvailableLevelIndex.value === levels.length);
const setOpenFinishAlert = async (state: boolean) => {
  if (state === false) {
    await store.dispatch(
      "setLastAvailableLevelIndex",
      lastAvailableLevelIndex.value + 1
    );
  }

  isOpenFinishAlert.value = state;
};

/**
 *  this function gives state of the item at `index`
 */
const itemState = (index: number) => {
  if (index < lastAvailableLevelIndex.value) {
    return LevelListItemState.COMPLETED;
  } else if (index === lastAvailableLevelIndex.value) {
    return LevelListItemState.CURRENT;
  } else {
    return LevelListItemState.LOCKED;
  }
};

async function onItemClicked(index: number) {
  if (itemState(index) !== LevelListItemState.LOCKED) {
    await store.dispatch("setCurrentLevelIndex", index);
    ionRouter.navigate("/level-view/", "back", "pop");
  }
}
</script>

<template>
  <back-layout title="Уровни">
    <ion-grid>
      <ion-row>
        <!-- uncommit to get mocking data -->
        <!-- <ion-col
          size="3"
          sizeSm="3"
          sizeMd="2"
          sizeLg="1"
          sizeXl="1"
          v-for="(item, index) in Array(90)
            .fill(0)
            .map((_) => Math.floor(Math.random() * 2))"
        > -->
        <ion-col
          size="3"
          sizeSm="3"
          sizeMd="2"
          sizeLg="1"
          sizeXl="1"
          v-for="(item, index) in levels"
        >
          <LevelListItem
            :imageSrc="item.image"
            :state="itemState(index)"
            @click="onItemClicked(index)"
            >{{ index + 1 }}</LevelListItem
          >
        </ion-col>
      </ion-row>
    </ion-grid>

    <ion-alert
      :is-open="isOpenFinishAlert"
      header="Приветствуем, уважаемый игрок!"
      message="Большое спасибо за то, что выбрали нашу игру для своего времяпрепровождения! Мы невероятно рады, что вы нашли в ней интерес и удовольствие. Мы хотели бы попросить вас об одолжении. Ваше мнение важно для нас, и мы были бы признательны, если бы вы оставили свой отзыв о нашей игре на странице Google Play. "
      :buttons="['ОК']"
      @didDismiss="setOpenFinishAlert(false)"
    ></ion-alert>
  </back-layout>
</template>

<style scoped>
.container-wrapper {
  background-color: var(--ion-color-primary-shade);

  min-height: 100%;
}

.container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.75rem;
  padding: 0.75rem;

  max-width: 576px;
  flex-grow: 0;
}
</style>
