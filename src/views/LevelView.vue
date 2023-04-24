<template>
  <div class="h-screen p-1 bg-teal-700">
    <header class="flex justify-between">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="white"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
      </svg>
      <div class="space-x-2">
        <button class="bg-lime-500 leading-7 p-0.5 text-white rounded-sm">
          Уровень 1
        </button>
        <button class="bg-fuchsia-500 leading-7 p-0.5 text-white rounded-sm">
          Подсказки
        </button>
      </div>
    </header>
    <main class="flex flex-col gap-2">
      <div class="w-3/4 m-auto">
        <p class="text-xl text-white text-center">Что за фильм?</p>
        <img class="shadow-2xl" src="@/assets/img1.png" alt="image" />
      </div>
      <div class="flex justify-center">
        <p class="font-semibold text-white text-xl border-b-indigo-500">A</p>
        <p class="font-semibold text-white text-xl border-b-indigo-500">B</p>
        <p class="font-semibold text-white text-xl border-b-indigo-500">C</p>
      </div>
      <div class="flex justify-center space-x-2">
        <button
          class="flex-1 bg-fuchsia-500 leading-7 p-0.5 text-white rounded-sm"
        >
          Помощь друзей
        </button>
        <button
          class="flex-1 bg-lime-500 leading-7 p-0.5 text-white rounded-sm"
        >
          Подсказки
        </button>
      </div>
      <div class="flex flex-wrap gap-2 justify-center">
        <p
          class="bg-orange-500 w-8 h-8 text-xl font-semibold text-white bold rounded text-center"
        >
          A
        </p>
        <p
          class="bg-orange-500 w-8 h-8 text-xl font-semibold text-white bold rounded text-center"
        >
          B
        </p>
        <p
          class="bg-orange-500 w-8 h-8 text-xl font-semibold text-white bold rounded text-center"
        >
          C
        </p>
        <p
          class="bg-orange-500 w-8 h-8 text-xl font-semibold text-white bold rounded text-center"
        >
          C
        </p>
        <p
          class="bg-orange-500 w-8 h-8 text-xl font-semibold text-white bold rounded text-center"
        >
          C
        </p>
        <p
          class="bg-orange-500 w-8 h-8 text-xl font-semibold text-white bold rounded text-center"
        >
          C
        </p>
        <p
          class="bg-orange-500 w-8 h-8 text-xl font-semibold text-white bold rounded text-center"
        >
          C
        </p>
        <p
          class="bg-orange-500 w-8 h-8 text-xl font-semibold text-white bold rounded text-center"
        >
          C
        </p>
        <p
          class="bg-orange-500 w-8 h-8 text-xl font-semibold text-white bold rounded text-center"
        >
          C
        </p>
        <p
          class="bg-orange-500 w-8 h-8 text-xl font-semibold text-white bold rounded text-center"
        >
          C
        </p>
        <p
          class="bg-orange-500 w-8 h-8 text-xl font-semibold text-white bold rounded text-center"
        >
          C
        </p>
      </div>
    </main>
  </div>
</template>
