<script setup lang="ts">
/* Components */
import BackLayout from "@/layouts/BackLayout.vue";
</script>

<template>
  <back-layout title="О нас">
    <div class="about">
      <p class="about__text">
        "Угадай мультифильм" – это захватывающая игра для всех возрастов, которая
        проверит вашу эрудицию и знания мультипликационного мира! В этой
        захватывающей головоломке игрокам предстоит погрузиться в удивительный
        мир анимации, чтобы раскрывать тайны и загадки известных мультифильмов.
      </p>
      <p class="about__text about__authors">Авторы: ANTONINIK / TZORAKE</p>
    </div>
  </back-layout>
</template>

<style scoped>
.about {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.about__text {
  margin: 1rem;
  font-size: 1.1rem;
}

.about__authors {
  margin-top: auto;
  margin: auto auto 1rem auto
}
</style>
