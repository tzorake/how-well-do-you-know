<script setup lang="ts">
import { LevelListItemState } from "@/utils/LevelListItemState";
import { IonIcon } from "@ionic/vue";

import { checkmarkOutline, lockClosedOutline } from "ionicons/icons";
import { PropType } from "vue";

const props = defineProps({
  imageSrc: {
    type: String,
    required: true,
  },
  state: {
    type: String as PropType<LevelListItemState>,
    required: true,
  },
});
</script>

<template>
  <div class="level-icon">
    <div class="cover">
      <img
        class="image"
        alt="level-img"
        :src="props.imageSrc"
        v-if="props.state !== LevelListItemState.LOCKED"
      />
      <div class="image-placeholder" v-else></div>
    </div>
    <div class="text">
      <span
        class="level-id"
        :class="{
          'lock-text-color': props.state === LevelListItemState.LOCKED,
        }"
      >
        <slot></slot>
      </span>
    </div>
    <ion-icon
      class="mark"
      :icon="checkmarkOutline"
      v-if="props.state === LevelListItemState.COMPLETED"
    ></ion-icon>
    <ion-icon
    class="lock"
    :icon="lockClosedOutline"
    v-if="props.state === LevelListItemState.LOCKED"
    ></ion-icon>
  </div>
</template>

<style scoped>
.level-icon {
  position: relative;
  user-select: none;
  cursor: pointer;
}

.text {
  position: absolute;
  font-size: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  font-size: 2rem;
  font-weight: 600;
  text-shadow: 1px 1px 5px #000;
}

@media screen and (max-width: 375px) {
  .text {
    font-size: 1.5rem;
  }
}

.mark {
  position: absolute;
  right: -1px;
  top: -1px;
  background-color: #04aa6d;
  border-radius: 2rem;
  border: 1px solid var(--ion-color-primary);
  padding: 0.25rem;
  font-size: 0.75rem;
  font-weight: 700;
  --ionicon-stroke-width: 120px;
}
.lock {
  position: absolute;
  right: -1px;
  top: -1px;
  background-color: var(--ion-color-dark-cyan);
  border-radius: 2rem;
  border: 1px solid var(--ion-color-primary);
  padding: 0.25rem;
  font-size: 0.75rem;
  --ionicon-stroke-width: 50px;
}

.cover {
  width: 100%;
  aspect-ratio: 1 / 1;
}

.image,
.image-placeholder {
  width: 100%;
  object-fit: cover;
  aspect-ratio: 1 / 1;
  border-radius: 0.5rem;
}

.image {
  opacity: 0.65;
}

.image-placeholder {
  background-color: var(--ion-color-dark-cyan);
}

.lock-text-color {
  color: var(--ion-color-primary);
}
</style>
