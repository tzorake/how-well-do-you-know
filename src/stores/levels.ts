import { defineStore } from "pinia";
import { ref, computed } from "vue";

/* Helpers */
import { useFetchJson } from "@/services/fetch";
import { ILevels } from "@/utils/Types";
import { Preferences } from "@capacitor/preferences";

export const useLevelsStore = defineStore("levels", () => {
  const levelsInfo = ref<ILevels>({ title: "", levels: [] });
  const currentLevelIndex = ref<number>(0);
  const lastAvailableLevelIndex = ref<number>(0);

  const getLevelByIndex = computed(
    () => (index: number) => levelsInfo.value.levels[index]
  );

  const levelsTitle = computed(() => levelsInfo.value.title);

  async function setCurrentLevelIndex(index: number) {
    await Preferences.set({
      key: "level-index",
      value: String(index),
    });
    
    currentLevelIndex.value = index;
  }

  async function setLastAvailableLevelIndex(index: number) {
    await Preferences.set({
      key: "last-available-level-index",
      value: String(index),
    });

    lastAvailableLevelIndex.value = index;
  }

  async function fetchLevels() {
    const response = await useFetchJson<ILevels>("/levels/levels.json");

    if (response.data) {
      levelsInfo.value = response.data;
    }
  }

  async function fetchCurrentLevelIndex() {
    const { value } = await Preferences.get({ key: "level-index" });

    if (value) {
      currentLevelIndex.value = Number(value);
    }
  }

  async function fetchLastAvailableLevelIndex() {
    const { value } = await Preferences.get({
      key: "last-available-level-index",
    });

    if (value) {
      lastAvailableLevelIndex.value = Number(value);
    }
  }

  return {
    levelsInfo,
    currentLevelIndex,
    lastAvailableLevelIndex,
    getLevelByIndex,
    levelsTitle,
    setCurrentLevelIndex,
    setLastAvailableLevelIndex,
    fetchLevels,
    fetchCurrentLevelIndex,
    fetchLastAvailableLevelIndex,
  };
});
