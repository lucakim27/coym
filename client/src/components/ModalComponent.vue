<script>
import axios from 'axios'
import { useCookies } from "vue3-cookies"
export default {
	props: ['shouldRender'],
	data() {
		return {
			showModal: false,
			username: '',
			gender: '',
			school: '',
			major: '',
			country: ''
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
		},
		settings() {
			window.location.href = '/settings'
		}
	},
	mounted() {
		let user = this.cookies.get("user")
		if (user !== null) {
			this.username = this.cookies.get("user").username
		}
		const self = this
		axios({
			method: "GET",
			url: "http://localhost:3000/getUserDetails",
			params: { username: this.username }
		}).then(function (response) {
			self.country = response.data.userDetails.country === null ? '' : response.data.userDetails.country
			self.major = response.data.userDetails.major === null ? '' : response.data.userDetails.major
			self.school = response.data.userDetails.school === null ? '' : response.data.userDetails.school
			self.gender = response.data.userDetails.gender === null ? '' : response.data.userDetails.gender
		})
	}
}
</script>
<template>
	<div class="modal-mask">
		<div class="modal-wrapper">
			<div class="modal-container">

				<div class="modal-header">
					<slot name="header">
						<h3>{{ this.username }}</h3>
						<span @click="$emit('close')">&times;</span>
					</slot>
				</div>

				<div class="modal-body">
					<slot name="body">
						<div class='detailsContainer'>
							<div>
								<div v-if="this.school !== ''">School
									<hr>{{ this.school }}
								</div>
								<div v-if="this.school === ''">School
									<hr>N/A
								</div>
							</div>
							<div>
								<div v-if="this.gender !== ''">Gender
									<hr>{{ this.gender }}
								</div>
								<div v-if="this.gender === ''">Gender
									<hr>N/A
								</div>
							</div>
						</div>
						<div class='detailsContainer'>
							<div>
								<div v-if="this.country !== ''">Country
									<hr>{{ this.country }}
								</div>
								<div v-if="this.country === ''">Country
									<hr>N/A
								</div>
							</div>
							<div>
								<div v-if="this.major !== ''">Major
									<hr>{{ this.major }}
								</div>
								<div v-if="this.major === ''">Major
									<hr> N/A
								</div>
							</div>
						</div>
					</slot>
				</div>
				<div class="modal-footer">
					<slot name="footer">
						<button @click='logout()' class="modal-default-button logoutBtn">
							Logout
						</button>
						<button @click="settings()" class="modal-default-button settingsBtn">
							Settings
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