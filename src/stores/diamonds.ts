import { defineStore } from "pinia";
import { ref } from "vue";

/* Helpers */
import { Preferences } from "@capacitor/preferences";

export const useDiamondsStore = defineStore("diamonds", () => {
  const diamonds = ref<number>(0);

  async function fetchDiamonds() {
    const { value: storageDiamonds } = await Preferences.get({
      key: "diamonds",
    });

    if (storageDiamonds) {
      diamonds.value = Number(storageDiamonds);
    }
  }

  async function setDiamonds(newDiamonds: number) {
    diamonds.value = newDiamonds;
    
    await Preferences.set({
      key: "diamonds",
      value: String(newDiamonds),
    });
  }

  return { diamonds, fetchDiamonds, setDiamonds };
});
