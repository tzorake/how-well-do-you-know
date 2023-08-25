<script setup lang="ts">
import BackLayout from "@/layouts/BackLayout.vue";
import LevelListItem from "@/components/LevelListView/LevelListItem.vue";
import { computed } from "vue";
import { useStore } from "vuex";
import { LevelListItemState } from "@/utils/LevelListItemState";
import { useIonRouter } from "@ionic/vue";
import { useData } from "@/services/fetchApi";
import {
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/vue";

const data = await useData("/levels/levels.json");
const levels = data.levels;
const store = useStore();
const ionRouter = useIonRouter();
const lastAvailableLevelIndex = computed(
  () => store.state.lastAvailableLevelIndex
);

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
          v-for="(item, index) in levels">
          <LevelListItem
            :imageSrc="item.image"
            :state="itemState(index)"
            @click="onItemClicked(index)"
            >{{ index + 1 }}</LevelListItem
          >
        </ion-col>
      </ion-row>
    </ion-grid>
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
