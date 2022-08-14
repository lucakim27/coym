<template>
  <div class='mainContainer'>
    <div class="eachContainer">
      <h3>Type</h3>
      <div class="centerChild">
        <select @change="onChange">
          <option value="Add major">Add major</option>
          <option value="Report user">Report user</option>
          <option value="Change username">Change username</option>
        </select>
      </div>
    </div>
    <div class="eachContainer">
      <h3>{{ inputLabel }}</h3>
      <div class="centerChild">
        <input type="text" placeholder="Type here..." v-model="content">
      </div>
    </div>
    <div class="eachContainer">
      <div class="centerChild">
        <button @click="request">Request</button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import { useCookies } from "vue3-cookies"
export default {
  name: 'RequestPage',
  created() {
    let self = this
    if (self.cookies.get('user') !== null) {
      axios({
        method: "GET",
        url: "https://proxy11112321321.herokuapp.com/https://coym-api.herokuapp.com/cookieValidation",
        // url: "http://localhost:3000/cookieValidation",
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
          url: "https://proxy11112321321.herokuapp.com/https://coym-api.herokuapp.com/postRequest",
          // url: "http://localhost:3000/postRequest",
          headers: { 'Content-Type': 'application/json' },
          data: { username: this.username, type: this.selectedValue, content: this.content }
        }).then(function (response) {
          if (response.data.status) {
            alert(response.data.message)
            window.location.reload()
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