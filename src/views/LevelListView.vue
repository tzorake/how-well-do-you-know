<script setup lang="ts">
/* Helpers */
import { computed, ref } from "vue";
import { storeToRefs } from "pinia";
import { useLevelsStore } from "@/stores/levels";
import { useIonRouter } from "@ionic/vue";
import { LevelListItemState } from "@/utils/LevelListItemState";

/* Components */
import { IonAlert, IonGrid, IonRow, IonCol } from "@ionic/vue";
import BackLayout from "@/layouts/BackLayout.vue";
import LevelListItem from "@/components/LevelListView/LevelListItem.vue";

const ionRouter = useIonRouter();

const levelsStore = useLevelsStore();
const { levelsInfo, lastAvailableLevelIndex } = storeToRefs(levelsStore);
const { setLastAvailableLevelIndex, setCurrentLevelIndex } = levelsStore;

const levels = levelsInfo.value.levels;
const isOpenFinishAlert = ref(lastAvailableLevelIndex.value === levels.length);

const setOpenFinishAlert = async (state: boolean) => {
  if (state === false) {
    setLastAvailableLevelIndex(lastAvailableLevelIndex.value + 1);
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
    setCurrentLevelIndex(index);
    ionRouter.navigate("/level-view/", "back", "pop");
  }
}
</script>

<template>
  <back-layout title="Уровни">
    <ion-grid>
      <ion-row>
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
ion-grid {
  --ion-grid-padding: 8px;
}
</style>
