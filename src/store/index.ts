import { createStore } from "vuex";
import { Preferences } from "@capacitor/preferences";

export default createStore({
  state: {
    currentLevelIndex: 0,
    lastAvailableLevelIndex: 0,
    diamonds: 0,
  },
  mutations: {
    mutateCurrentLevelIndex(state, value) {
      state.currentLevelIndex = value;
    },
    mutateLastAvailableLevelIndex(state, value) {
      state.lastAvailableLevelIndex = value;
    },
    mutateDiamonds(state, value) {
      state.diamonds = value;
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
        value: String(value),
      });
      commit("mutateCurrentLevelIndex", value);
    },

    async fetchLastAvailableLevelIndex({ commit }) {
      const { value } = await Preferences.get({
        key: "last-available-level-index",
      });
      if (value) {
        commit("mutateLastAvailableLevelIndex", Number(value));
      }
    },

    async setLastAvailableLevelIndex({ commit, dispatch }, value) {
      await Preferences.set({
        key: "last-available-level-index",
        value: String(value),
      });
      commit("mutateLastAvailableLevelIndex", value);
      dispatch("addDiamonds", 100);
    },

    async fetchDiamonds({ commit }) {
      const { value } = await Preferences.get({
        key: "diamonds",
      });
      if (value) {
        commit("mutateDiamonds", Number(value));
      }
    },

    async addDiamonds({ commit, state }, value) {
      const newDiamonds = state.diamonds + Number(value);
      await Preferences.set({
        key: "diamonds",
        value: String(newDiamonds),
      });
      commit("mutateDiamonds", newDiamonds);
    },

    async subDiamonds({ commit, state }, value) {
      const newDiamonds = state.diamonds - Number(value);
      await Preferences.set({
        key: "diamonds",
        value: String(newDiamonds),
      });
      commit("mutateDiamonds", newDiamonds);
    },
  },
});
