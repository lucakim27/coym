<template>
  <div class='requestMainContainer' v-if="!isMobile()">
    <div class="requestEachContainer requestDesktopEachContainer">
      <h3>Type</h3>
      <div class="requestCenterChild">
        <select class="requestSelect" @change="onChange">
          <option value="Add major">Add major</option>
          <option value="Report user">Report user</option>
          <option value="Change username">Change username</option>
        </select>
      </div>
    </div>
    <div class="requestEachContainer requestDesktopEachContainer">
      <h3>{{ inputLabel }}</h3>
      <div class="requestCenterChild">
        <input type="text" placeholder="Type here..." v-model="content">
      </div>
    </div>
    <div class="requestEachContainer requestDesktopEachContainer">
      <div class="requestCenterChild">
        <button @click="request">Request</button>
      </div>
    </div>
  </div>
  <div class='requestMainContainer' v-if="isMobile()">
    <div class="requestEachContainer">
      <h3>Type</h3>
      <div class="requestCenterChild">
        <select class="requestSelect" @change="onChange">
          <option value="Add major">Add major</option>
          <option value="Report user">Report user</option>
          <option value="Change username">Change username</option>
        </select>
      </div>
    </div>
    <div class="requestEachContainer">
      <h3>{{ inputLabel }}</h3>
      <div class="requestCenterChild">
        <input type="text" placeholder="Type here..." v-model="content">
      </div>
    </div>
    <div class="requestEachContainer">
      <div class="requestCenterChild">
        <button @click="request">Request</button>
      </div>
    </div>
  </div>
  <div>
    <FooterComponent />
  </div>
</template>
<script>
import axios from 'axios'
import { useCookies } from "vue3-cookies"
import FooterComponent from '../components/FooterComponent.vue'
export default {
  name: 'RequestPage',
  components: {
    FooterComponent
  },
  created() {
    this.cookieValidation()
  },
  setup() {
    const { cookies } = useCookies()
    return { cookies }
  },
  data() {
    return {
      username: '',
      selectedValue: 'Add major',
      content: ''
    }
  },
  computed: {
    inputLabel() {
      if (this.selectedValue === 'Add major') {
        return 'Major'
      } else if (this.selectedValue === 'Report user') {
        return 'Username & Reason being'
      } else if (this.selectedValue === 'Change username') {
        return 'New username (longer than 7 characters without spaces.)'
      } else {
        return 'Major'
      }
    }
  },
  methods: {
    isMobile() {
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return true
      } else {
        return false
      }
    },
    onChange(event) {
      this.selectedValue = event.target.value
    },
    request() {
      if (this.username === '' || this.username === null) {
        alert("Sign in please.")
      } else if (this.content === '') {
        alert("Please type in longer than a character.")
      } else {
        axios({
          method: "POST",
          url: process.env.VUE_APP_ROOT_API + "/postRequest",
          headers: { 'Content-Type': 'application/json' },
          data: { username: this.username, type: this.selectedValue, content: this.content }
        }).then(function (response) {
          if (response.data.status) {
            alert(response.data.message)
            window.location.reload()
          }
        })
      }
    },
    cookieValidation() {
      let self = this
      if (self.cookies.get('user') !== null) {
        axios({
          method: "GET",
          url: process.env.VUE_APP_ROOT_API + "/cookieValidation",
          params: {
            username: self.cookies.get("user").username,
            password: self.cookies.get("user").password
          }
        }).then(function (response) {
          if (response.data.status) {
            self.username = response.data.username
          }
        })
      }
    }
  }
}
</script>
<style scoped>
@import '../assets/styles/request.css';
</style>