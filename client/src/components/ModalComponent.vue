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
.modal-mask {
	position: fixed;
	z-index: 99999999999999999999999999999999999999999999999999999999999999999999999999999999999999 !important;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	display: table;
	transition: opacity 0.3s ease;
}

.logoutBtn {
	background: rgba(255, 0, 0, 0.744);
	color: white;
	border: 1px solid rgb(146, 156, 161);
}

.updateBtn {
	background: rgba(0, 0, 0, 0.478);
	color: white;
	border: 1px solid rgb(146, 156, 161);
}

.modal-wrapper {
	display: table-cell;
	vertical-align: middle;
}

.modal-container {
	width: 50vw;
	height: 60%;
	margin: 0px auto;
	padding: 20px 30px;
	background-color: rgb(146, 156, 161);
	border-radius: 2px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
	transition: all 0.3s ease;
	font-family: Helvetica, Arial, sans-serif;
	border-radius: 10px;
	position: relative;
	overflow: auto;
}

.modal-header h3 {
	margin-top: 0;
	color: white;
}

.modal-header {
	display: flex;
	justify-content: space-between;
}

.modal-header span {
	cursor: pointer;
	color: white;
}

.modal-header span:hover {
	color: rgb(0, 0, 0);
}

.modal-body div {
	background: rgb(89, 95, 98);
	border-radius: 10px;
	margin: 10px;
	padding: 20px;
	color: white;
}

.modal-body {
	margin: 20px 0;
}

.modal-default-button {
	float: right;
	padding: 10px;
	margin: 10px;
	border-radius: 5px;
}

.modal-enter-from,
.modal-leave-to {
	opacity: 0;
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
	-webkit-transform: scale(1.1);
	transform: scale(1.1);
}
</style>