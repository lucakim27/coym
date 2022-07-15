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
						default header
					</slot>
				</div>

				<div class="modal-body">
					<slot name="body">
						<b>Username: </b> {{ this.username }}
					</slot>
				</div><hr>

				<div class="modal-footer">
					<slot name="footer">
						<button class="modal-default-button logoutBtn">
							Logout
						</button>
						<button class="modal-default-button closeBtn" @click="$emit('close')">
							Close
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
	background: red;
	color: white;
}

.closeBtn {
	background: black;
	color: white;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 30%;
  height: 60%;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
  border-radius: 10px;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
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

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-from, .modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>