<script setup>
import VButton from '@/components/ui/VButton.vue'
import VCoin from '@/components/ui/VCoin.vue'
const items = [
  'Д',
  'Ж',
  'О',
  'П',
  'A',
  'В',
  'И',
  'К',
  'A',
  'Т',
  'Ы',
  'A',
  'Б',
  'Д',
]
</script>

<template>
  <div class="h-screen grid grid-rows-[auto_2fr_1fr] gap-2">
    <div class="flex-center">
      <div class="w-full flex justify-end space-x-3">
        <v-button color="success"> Уровень 1 </v-button>
        <v-button color="help">
          <div class="flex-center space-x-1">
            <span>500</span>
            <v-coin />
          </div>
        </v-button>
      </div>
    </div>
    <div class="flex-center flex-col space-y-2">
      <p>Что за фильм?</p>
      <img
        class="object-cover aspect-square shadow-lg md:w-4/6"
        src="@/assets/img1.png"
        alt="image"
      />
      <div class="w-full flex justify-center space-x-2">
        <div class="w-1/12 text-center border-b-4 border-cyan-300">A</div>
        <div class="w-1/12 text-center border-b-4 border-border-color"></div>
      </div>
    </div>
    <div class="mb-3 flex justify-center flex-col space-y-5">
      <div class="flex space-x-3">
        <v-button color="success" class="flex-1"> Помощь друзей </v-button>
        <v-button color="help" class="flex-1"> Подсказки </v-button>
      </div>
      <div class="grid grid-cols-7 gap-2">
        <v-button
          color="warn"
          class="flex font-bold"
          v-for="item in items"
        >
          {{ item }}
        </v-button>
      </div>
    </div>
  </div>
</template>
