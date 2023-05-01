
<template>
	<div class="flex flex-col h-screen bg-teal-700">
        <header class="flex justify-between items-center mx-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
                </svg>
                <div class="flex gap-1">
                    <button class="bg-lime-500 px-2 py-1 rounded-md text-white">Уровень 1</button>
                    <button class="flex gap-1 bg-fuchsia-500 px-2 py-1 rounded-md text-white">
                        <div>500</div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 fill-yellow-300 stroke-yellow-600">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                        </svg>
                    </button>
                </div>
        </header>
        <main class="">
            <div class="flex flex-col items-center">
                <div class="mt-4 mb-2 text-white">
                    <p>Что за фильм?</p>
                </div>
                <img class="object-cover aspect-square w-3/4" src="@/assets/img1.png" alt="image">

            </div>
            <div class="flex justify-center gap-2 my-4">
                <div class="flex border-b-4 border-cyan-300 justify-center text-white font-bold text-xl w-8 h-8">A</div>
                <div class="flex border-b-4 border-cyan-300 justify-center text-white font-bold text-xl w-8 h-8">B</div>
            </div>
            <div class="flex justify-around">
                <button class="bg-lime-500 px-2 py-1 rounded-md text-white w-2/5">Помощь друзей</button>
                <button class="bg-fuchsia-500 px-2 py-1 rounded-md text-white w-2/5">Подсказки</button>
            </div>
            <div class="flex flex-wrap justify-center gap-2 my-4 px-4">
                <div class="flex justify-center bg-orange-500 text-white font-bold text-xl w-8 h-8 rounded-md" v-for="item in items">{{ item }}</div>
            </div>
        </main>
	</div>
</template>

<script setup>
    const items = ['Д', 'Ж', 'О', 'П', 'A', 'В', 'И', 'К', 'A', 'Т', 'Ы', 'A', 'Б', 'Д', 'В'];
</script>
