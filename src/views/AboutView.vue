<script setup lang="ts">
import BackLayout from "@/layouts/BackLayout.vue";
</script>

<template>
  <back-layout title="О нас">
    <div class="about">
      <p class="about__text">
        "Угадай мультифильм" – захватывающая игра для всех возрастов, которая
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
  word-spacing: 0.5rem;
  letter-spacing: 0.1rem;
  text-align: center;
}

.about__authors {
  margin-top: auto;
}
</style>
