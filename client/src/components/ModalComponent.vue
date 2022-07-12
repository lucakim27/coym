<script>
export default {
	props: ['shouldRender'],
	data() {
		return {
			slidePage: 1
		}
	},
	methods: {
		nextSlide: function () {
			if (this.slidePage === 4) {
				this.slidePage = 1
				this.$emit('finishHabitCreation', false)
			} else {
				this.slidePage++
			}
		}
	}
}
</script>

<template>
	<div v-if="shouldRender" id="defaultModal" tabindex="-1" aria-hidden="true"
		class="overflow-y-auto overflow-x-hidden fixed top-3 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full">
		<div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
			<!-- Modal content -->
			<div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
				<!-- Modal header -->
				<div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
					<!-- first slide -->
					<svg v-if='slidePage === 1' width="331" height="50" viewBox="0 0 331 50" fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<rect x="261" width="70" height="50" rx="11" fill="#EAFBB1" />
						<rect x="287" y="17" width="18" height="18" rx="9" fill="#759679" />
						<path
							d="M288.75 26C288.75 21.9959 291.996 18.75 296 18.75C300.004 18.75 303.25 21.9959 303.25 26C303.25 30.0041 300.004 33.25 296 33.25C291.996 33.25 288.75 30.0041 288.75 26Z"
							stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
						<path
							d="M293.75 26.75L294.184 27.6744C294.527 28.407 295.554 28.4492 295.956 27.7473L298.25 23.75"
							stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
						<rect x="174" width="70" height="50" rx="11" fill="#EAFBB1" />
						<rect x="200" y="17" width="18" height="18" rx="9" fill="#759679" />
						<path
							d="M201.75 26C201.75 21.9959 204.996 18.75 209 18.75C213.004 18.75 216.25 21.9959 216.25 26C216.25 30.0041 213.004 33.25 209 33.25C204.996 33.25 201.75 30.0041 201.75 26Z"
							stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
						<path
							d="M206.75 26.75L207.184 27.6744C207.527 28.407 208.554 28.4492 208.956 27.7473L211.25 23.75"
							stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
						<rect x="87" width="70" height="50" rx="11" fill="#EAFBB1" />
						<rect x="113" y="17" width="18" height="18" rx="9" fill="#759679" />
						<path
							d="M114.75 26C114.75 21.9959 117.996 18.75 122 18.75C126.004 18.75 129.25 21.9959 129.25 26C129.25 30.0041 126.004 33.25 122 33.25C117.996 33.25 114.75 30.0041 114.75 26Z"
							stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
						<path
							d="M119.75 26.75L120.184 27.6744C120.527 28.407 121.554 28.4492 121.956 27.7473L124.25 23.75"
							stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
						<rect width="70" height="50" rx="11" fill="#EAFBB1" />
						<rect x="26" y="16" width="18" height="18" rx="9" fill="#0D3440" />
						<path
							d="M27.75 25C27.75 20.9959 30.9959 17.75 35 17.75C39.0041 17.75 42.25 20.9959 42.25 25C42.25 29.0041 39.0041 32.25 35 32.25C30.9959 32.25 27.75 29.0041 27.75 25Z"
							stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
						<path
							d="M32.75 25.75L33.1837 26.6744C33.5275 27.407 34.5536 27.4492 34.9564 26.7473L37.25 22.75"
							stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
					</svg>
					<!-- second slide -->
					<svg v-if='slidePage === 2' width="331" height="51" viewBox="0 0 331 51" fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<rect x="261" width="70" height="50" rx="11" fill="#EAFBB1" />
						<rect x="287" y="17" width="18" height="18" rx="9" fill="#759679" />
						<path
							d="M288.75 26C288.75 21.9959 291.996 18.75 296 18.75C300.004 18.75 303.25 21.9959 303.25 26C303.25 30.0041 300.004 33.25 296 33.25C291.996 33.25 288.75 30.0041 288.75 26Z"
							stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
						<path
							d="M293.75 26.75L294.184 27.6744C294.527 28.407 295.554 28.4492 295.956 27.7473L298.25 23.75"
							stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
						<rect x="174" width="70" height="50" rx="11" fill="#EAFBB1" />
						<rect x="200" y="17" width="18" height="18" rx="9" fill="#759679" />
						<path
							d="M201.75 26C201.75 21.9959 204.996 18.75 209 18.75C213.004 18.75 216.25 21.9959 216.25 26C216.25 30.0041 213.004 33.25 209 33.25C204.996 33.25 201.75 30.0041 201.75 26Z"
							stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
						<path
							d="M206.75 26.75L207.184 27.6744C207.527 28.407 208.554 28.4492 208.956 27.7473L211.25 23.75"
							stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
						<rect x="87" y="1" width="70" height="50" rx="11" fill="#EAFBB1" />
						<rect x="113" y="17" width="18" height="18" rx="9" fill="#0D3440" />
						<path
							d="M114.75 26C114.75 21.9959 117.996 18.75 122 18.75C126.004 18.75 129.25 21.9959 129.25 26C129.25 30.0041 126.004 33.25 122 33.25C117.996 33.25 114.75 30.0041 114.75 26Z"
							stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
						<path
							d="M119.75 26.75L120.184 27.6744C120.527 28.407 121.554 28.4492 121.956 27.7473L124.25 23.75"
							stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
						<rect width="70" height="50" rx="11" fill="#EAFBB1" />
						<rect x="26" y="17" width="18" height="18" rx="9" fill="#759679" />
						<path
							d="M27.75 26C27.75 21.9959 30.9959 18.75 35 18.75C39.0041 18.75 42.25 21.9959 42.25 26C42.25 30.0041 39.0041 33.25 35 33.25C30.9959 33.25 27.75 30.0041 27.75 26Z"
							stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
						<path
							d="M32.75 26.75L33.1837 27.6744C33.5275 28.407 34.5536 28.4492 34.9564 27.7473L37.25 23.75"
							stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
					</svg>
					<!-- third slide -->
					<svg v-if='slidePage === 3' width="331" height="50" viewBox="0 0 331 50" fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<rect x="261" width="70" height="50" rx="11" fill="#EAFBB1" />
						<rect x="287" y="17" width="18" height="18" rx="9" fill="#759679" />
						<path
							d="M288.75 26C288.75 21.9959 291.996 18.75 296 18.75C300.004 18.75 303.25 21.9959 303.25 26C303.25 30.0041 300.004 33.25 296 33.25C291.996 33.25 288.75 30.0041 288.75 26Z"
							stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
						<path
							d="M293.75 26.75L294.184 27.6744C294.527 28.407 295.554 28.4492 295.956 27.7473L298.25 23.75"
							stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
						<rect x="174" width="70" height="50" rx="11" fill="#EAFBB1" />
						<rect x="200" y="16" width="18" height="18" rx="9" fill="#0D3440" />
						<path
							d="M201.75 25C201.75 20.9959 204.996 17.75 209 17.75C213.004 17.75 216.25 20.9959 216.25 25C216.25 29.0041 213.004 32.25 209 32.25C204.996 32.25 201.75 29.0041 201.75 25Z"
							stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
						<path
							d="M206.75 25.75L207.184 26.6744C207.527 27.407 208.554 27.4492 208.956 26.7473L211.25 22.75"
							stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
						<rect width="70" height="50" rx="11" fill="#EAFBB1" />
						<rect x="26" y="17" width="18" height="18" rx="9" fill="#759679" />
						<path
							d="M27.75 26C27.75 21.9959 30.9959 18.75 35 18.75C39.0041 18.75 42.25 21.9959 42.25 26C42.25 30.0041 39.0041 33.25 35 33.25C30.9959 33.25 27.75 30.0041 27.75 26Z"
							stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
						<path
							d="M32.75 26.75L33.1837 27.6744C33.5275 28.407 34.5536 28.4492 34.9564 27.7473L37.25 23.75"
							stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
						<rect x="87" width="70" height="50" rx="11" fill="#EAFBB1" />
						<rect x="113" y="17" width="18" height="18" rx="9" fill="#759679" />
						<path
							d="M114.75 26C114.75 21.9959 117.996 18.75 122 18.75C126.004 18.75 129.25 21.9959 129.25 26C129.25 30.0041 126.004 33.25 122 33.25C117.996 33.25 114.75 30.0041 114.75 26Z"
							stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
						<path
							d="M119.75 26.75L120.184 27.6744C120.527 28.407 121.554 28.4492 121.956 27.7473L124.25 23.75"
							stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
					</svg>
					<!-- fourth slide -->
					<svg v-if='slidePage === 4' width="331" height="51" viewBox="0 0 331 51" fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<rect x="261" y="1" width="70" height="50" rx="11" fill="#EAFBB1" />
						<rect x="287" y="17" width="18" height="18" rx="9" fill="#0D3440" />
						<path
							d="M288.75 26C288.75 21.9959 291.996 18.75 296 18.75C300.004 18.75 303.25 21.9959 303.25 26C303.25 30.0041 300.004 33.25 296 33.25C291.996 33.25 288.75 30.0041 288.75 26Z"
							stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
						<path
							d="M293.75 26.75L294.184 27.6744C294.527 28.407 295.554 28.4492 295.956 27.7473L298.25 23.75"
							stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
						<rect y="1" width="70" height="50" rx="11" fill="#EAFBB1" />
						<rect x="26" y="18" width="18" height="18" rx="9" fill="#759679" />
						<path
							d="M27.75 27C27.75 22.9959 30.9959 19.75 35 19.75C39.0041 19.75 42.25 22.9959 42.25 27C42.25 31.0041 39.0041 34.25 35 34.25C30.9959 34.25 27.75 31.0041 27.75 27Z"
							stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
						<path
							d="M32.75 27.75L33.1837 28.6744C33.5275 29.407 34.5536 29.4492 34.9564 28.7473L37.25 24.75"
							stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
						<rect x="174" width="70" height="50" rx="11" fill="#EAFBB1" />
						<rect x="200" y="17" width="18" height="18" rx="9" fill="#759679" />
						<path
							d="M201.75 26C201.75 21.9959 204.996 18.75 209 18.75C213.004 18.75 216.25 21.9959 216.25 26C216.25 30.0041 213.004 33.25 209 33.25C204.996 33.25 201.75 30.0041 201.75 26Z"
							stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
						<path
							d="M206.75 26.75L207.184 27.6744C207.527 28.407 208.554 28.4492 208.956 27.7473L211.25 23.75"
							stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
						<rect x="87" width="70" height="50" rx="11" fill="#EAFBB1" />
						<rect x="113" y="17" width="18" height="18" rx="9" fill="#759679" />
						<path
							d="M114.75 26C114.75 21.9959 117.996 18.75 122 18.75C126.004 18.75 129.25 21.9959 129.25 26C129.25 30.0041 126.004 33.25 122 33.25C117.996 33.25 114.75 30.0041 114.75 26Z"
							stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
						<path
							d="M119.75 26.75L120.184 27.6744C120.527 28.407 121.554 28.4492 121.956 27.7473L124.25 23.75"
							stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
					</svg>
					<!-- close button -->
					<!-- <button type="button"
						class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
						data-modal-toggle="defaultModal">
						<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
							<path fill-rule="evenodd"
								d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
								clip-rule="evenodd"></path>
						</svg>
					</button> -->
				</div>
				<!-- Modal body -->
				<div class="p-6">
					<div v-if='slidePage === 1' class="p-12 text-2xl dark:text-white text-center">Name of your habit
					</div>
					<div v-if='slidePage === 2' class="p-6 text-2xl dark:text-white text-center">Which area of your life
						do you wanna improve</div>
					<div v-if='slidePage === 3' class="p-6 text-2xl dark:text-white text-center">When do you wanna
						complete the habit</div>
					<div v-if='slidePage === 4' class="p-12 text-2xl dark:text-white text-center">Set reminder</div>

					<input v-if='slidePage === 1' type="text" class="mt-9 bg-secondary w-full rounded-xl"
						placeholder="Name of a habit" required>
					<select v-if='slidePage === 2' class="form-control mt-9 bg-secondary w-full rounded-xl">
						<option selected>Work out</option>
						<option>Meditation</option>
						<option>Productivity</option>
						<option>Socializing</option>
						<option>Relationship</option>
						<option>Finance</option>
						<option>Learning</option>
					</select>
					<center v-if='slidePage === 3' class="form-control mt-9 w-full rounded-xl">
						<div class="bg-secondary rounded-xl">
							<input type="radio" name="chk_info" value="HTML">Everyday<br>
						</div>
						<label for="" class="text-white">OR</label><br>
						<div class="bg-secondary rounded-xl">
							<input type="radio" name="chk_info" value="CSS" checked="checked">Specific days
						</div>
					</center>
					<center v-if='slidePage === 4' class="form-control mt-9 w-full rounded-xl">
						<div class="bg-secondary rounded-xl">
							<input type="radio" name="chk_info" value="HTML">Do remind<br>
						</div>
						<label for="" class="text-white">OR</label><br>
						<div class="bg-secondary rounded-xl">
							<input type="radio" name="chk_info" value="CSS" checked="checked">Do not remind
						</div>
					</center>
				</div>
				<!-- Modal footer -->
				<div class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
					<button class=" bg-secondary w-full rounded-xl float-bottom" @click="nextSlide">
						<label class="ml-3"> Next </label>
						<label class="float-right mr-3"> > </label>
					</button>
				</div>
			</div>
		</div>
	</div>
</template>