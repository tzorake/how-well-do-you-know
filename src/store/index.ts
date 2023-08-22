import { createStore } from "vuex";
import { Preferences } from "@capacitor/preferences";

export default createStore({
  state: {
    currentLevelId: 1,
  },
  mutations: {
    mutateCurrentLevelId(state, value) {
      state.currentLevelId = value;
    },
  },
  actions: {
    async fetchCurrentLevelId({ commit }) {
      const { value } = await Preferences.get({ key: "level-id" });
      if (value) {
        commit("mutateCurrentLevelId", Number(value));
      }
    },

    async setCurrentLevelId({ commit }, value) {
      await Preferences.set({
        key: "level-id",
        value,
      });
      commit("mutateCurrentLevelId", value);
    },
  },
});
