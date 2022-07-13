<script>
export default {
	props: ['shouldRender'],
	data() {
		return {

		}
	},
	methods: {
		logout() {
			this.$cookies.remove("user")
			alert("You're logged out. Please refresh the page.")
		}
	},
	computed: {
		getCookie() {
			return this.$cookies.get("user")
		}
	}

}
</script>

<template>
	<div v-if="shouldRender" id="defaultModal" tabindex="-1" aria-hidden="true">
		<h4>Username: {{ getCookie.username }}</h4>
		<h4>Password: {{ getCookie.password }}</h4>
		<button @click="logout()">
			<p>Logout</p>
		</button>
	</div>
</template>
<style scoped>
#defaultModal {
	position: fixed;
	overflow-y: auto;
	overflow-x: hidden;
	top: 45%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 50%;
	background-color: rgb(0, 0, 0);
	height: 70%;
	color: rgb(255, 255, 255);
	text-align: center;
	z-index: 99999999999999999999 !important;
	border-radius: 10px;
}

#defaultModal button {
	position: fixed;
	bottom: 10px;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: rgb(185, 37, 37);
	color: white;
	border-radius: 10px;
}

#defaultModal button p {
	margin: 5px;
}
</style>