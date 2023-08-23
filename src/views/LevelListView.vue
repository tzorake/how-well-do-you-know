<script setup lang="ts">
import BackLayout from "@/layouts/BackLayout.vue";
import LevelListItem from "@/components/LevelListView/LevelListItem.vue";
import { computed } from "vue";
import { useStore } from "vuex";
import { LevelListItemState } from "@/utils/LevelListItemState"
import { useIonRouter } from "@ionic/vue";
import { useData } from "@/services/fetchApi";

const data = await useData("/levels/levels.json");
const levels = data.levels;
const store = useStore();
const ionRouter = useIonRouter();
const lastAvailableLevelIndex = computed(() => store.state.lastAvailableLevelIndex);

/**
 *  this function gives state of the item at `index` 
*/
const itemState = (index: number) => {
  if (index < lastAvailableLevelIndex.value) {
    return LevelListItemState.COMPLETED;
  }
  else if (index === lastAvailableLevelIndex.value) {
    return LevelListItemState.CURRENT;
  }
  else {
    return LevelListItemState.LOCKED;
  }
}

async function onItemClicked(index: number) {
  if (itemState(index) !== LevelListItemState.LOCKED) {
    await store.dispatch("setCurrentLevelIndex", index);
    ionRouter.navigate("/level-view/", "back", "pop");
  }
}

</script>

<template>
  <back-layout title="Уровни">
    <div class="container-wrapper">
      <div class="container">
        <LevelListItem
          :imageSrc="item.image"
          :style="{ width: `calc((100%  - 3*0.75rem) / 4)` }"
          :state="itemState(index)"
          @click="onItemClicked(index)"
          v-for="(item, index) in levels"
          >{{ index + 1 }}</LevelListItem
        >
      </div>
    </div>
  </back-layout>
</template>

<style scoped>
.container-wrapper {
  display: flex;
  background-color: var(--ion-color-primary-shade);
  justify-content: center;

  min-height: 100%;
}

.container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  padding: 0.75rem;

  max-width: 576px;
}
</style>
