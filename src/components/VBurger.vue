<script setup>
import { ref } from 'vue'
import VModal from './ui/VModal.vue'

const switcher = ref(true)
const toggle = () => {
  switcher.value = !switcher.value
}
const links = [
  { title: 'Играть', url: '/', exact: true },
  { title: 'Монеты', url: '/coins' },
  { title: 'Об игре', url: '/about' },
  { title: 'Контакты', url: '/contacts' }
]
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="white"
    class="w-8 h-8 absolute opacity-90"
    @click="toggle"
    v-if="switcher"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
    />
  </svg>
  <v-modal v-else @on-close="toggle">
    <ul class="flex flex-col w-3/4 mx-auto gap-5">
      <router-link
        v-for="link in links"
        :key="link.url"
        tag="li"
        active-class="bg-primary-light"
        :to="link.url"
        :exact="link.exact"
        @click="toggle"
        class="menu-item"
      >
        <a href="#">{{ link.title }}</a>
      </router-link>
    </ul>
  </v-modal>
</template>
