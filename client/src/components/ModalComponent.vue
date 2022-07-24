<script>
import { useCookies } from "vue3-cookies"
export default {
	props: ['shouldRender'],
	data() {
		return {
			showModal: false,
			username: ''
		}
	},
	setup() {
		const { cookies } = useCookies()
		return { cookies }
	},
	methods: {
		logout() {
			this.cookies.remove('user')
			window.location.reload()
		}
	},
	computed: {

	},
	mounted() {
		let user = this.cookies.get("user")
		if (user !== null) {
			this.username = this.cookies.get("user").username
		}
	}
}
</script>
<template>
	<div class="modal-mask">
		<div class="modal-wrapper">
			<div class="modal-container">

				<div class="modal-header">
					<slot name="header">
						<h3>User Profile</h3>
						<span @click="$emit('close')">&times;</span>
					</slot>
				</div>

				<div class="modal-body">
					<slot name="body">
						<div v-if="this.username !== undefined">Username: {{ this.username }}</div>
						<div v-if="this.username === undefined">Username: Anonymous</div>

						<div v-if="this.gender !== undefined">Gender: {{ this.gender }}</div>
						<div v-if="this.gender === undefined">Gender: N/A</div>

						<div v-if="this.country !== undefined">Country: {{ this.country }}</div>
						<div v-if="this.country === undefined">Country: N/A</div>

						<div v-if="this.major !== undefined">Major: {{ this.major }}</div>
						<div v-if="this.major === undefined">Major: N/A</div>

						<div v-if="this.school !== undefined">School: {{ this.school }}</div>
						<div v-if="this.school === undefined">School: N/A</div>
					</slot>
				</div>

				<div class="modal-footer">
					<slot name="footer">
						<button @click='logout()' class="modal-default-button logoutBtn">
							Logout
						</button>
						<button class="modal-default-button updateBtn">
							Update
						</button>
					</slot>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
@import '../assets/componentStyles/modalComponent.css';
</style>