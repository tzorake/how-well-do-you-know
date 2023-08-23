import { createStore } from "vuex";
import { Preferences } from "@capacitor/preferences";

export default createStore({
  state: {
    currentLevelIndex: 0,
    lastAvailableLevelIndex: 0,
  },
  mutations: {
    mutateCurrentLevelIndex(state, value) {
      state.currentLevelIndex = value;
    },
    mutateLastAvailableLevelIndex(state, value) {
      state.lastAvailableLevelIndex = value;
    },
  },
  actions: {
    async fetchCurrentLevelIndex({ commit }) {
      const { value } = await Preferences.get({ key: "level-index" });
      if (value) {
        commit("mutateCurrentLevelIndex", Number(value));
      }
    },

    async setCurrentLevelIndex({ commit }, value) {
      await Preferences.set({
        key: "level-index",
        value,
      });
      commit("mutateCurrentLevelIndex", value);
    },

    async fetchLastAvailableLevelIndex({ commit }) {
      const { value } = await Preferences.get({ key: "last-available-level-index" });
      if (value) {
        commit("mutateLastAvailableLevelIndex", Number(value));
      }
    },

    async setLastAvailableLevelIndex({ commit }, value) {
      await Preferences.set({
        key: "last-available-level-index",
        value,
      });
      commit("mutateLastAvailableLevelIndex", value);
    },
  },
});
