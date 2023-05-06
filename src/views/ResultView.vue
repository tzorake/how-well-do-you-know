
<script setup>
	import VButton from '@/components/ui/VButton.vue'
	import VCoin from '@/components/ui/VCoin.vue'
</script>

<template>
	<div class="h-screen flex flex-col gap-2 py-2">
		<!-- label -->
		<span class="flex justify-center">Отлично!</span>
		<!-- image -->
		<div class="flex justify-center">
			<img class="object-cover aspect-square shadow-lg w-4/6" src="@/assets/img1.png" alt="img" >
		</div>
		<!-- label -->
		<span class="flex justify-center">ДЖОН ВИК</span>

		<!-- reward -->
		<div class="flex flex-col justify-center gap-2 grow">
			<div class="flex flex-col justify-center">
				<div class="flex items-center bg-[#0b6562] px-6 py-1 rounded-full mx-auto">
					<v-coin />
					<span>+50</span>
				</div>
			</div>
			<!-- more coins -->
			<div class="flex flex-col justify-center">
				<div class="flex bg-[#0b6562] p-1 rounded-full">
					<div class="flex justify-center items-center bg-[#148485] text-[#ff7e01] rounded-full aspect-square w-[15%] relative">
						<span class="relative top-1 left-0">x</span>
						<span class="relative text-[2rem] right-0">2</span>
					</div>
					<div class="flex flex-col grow items-center justify-center">
						<span>БОЛЬШЕ МОНЕТ</span>
						<span class="text-[0.65rem]">ПОСМОТРЕТЬ ВИДЕО!</span>
					</div>
					<div class="flex justify-center items-center bg-[#148485] rounded-full aspect-square w-[15%]">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 fill-[#0b6562] stroke-[#0b6562]">
							<path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
						</svg>
					</div>
				</div>
			</div>
		</div>
		<!--  buttons -->
		<div class="flex grow">
			<div class="grid grid-cols-2 grid-flow-rows-2 gap-2 py-2 self-end grow">
				<v-button color="warn" class="gap-1 self-end">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
						<path stroke-linecap="round" stroke-linejoin="round" d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384" />
					</svg>
					<span>Скучно</span>
				</v-button>
				<v-button color="warn" class="gap-1 self-end">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
						<path stroke-linecap="round" stroke-linejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
					</svg>
					<span>Отлично</span>
				</v-button>
				<v-button color="warn" class="col-span-2 self-end">
					<span>Продолжить</span>
				</v-button>
			</div>
		</div>
	</div>
</template>
