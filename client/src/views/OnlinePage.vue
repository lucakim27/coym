<template>
  <div class='container'>
    <div class="onlineDiv">
      <div class="onlineHead">
        <div>Username</div>
        <div>Gender</div>
        <div>Country</div>
        <div>Major</div>
        <div>School</div>
      </div>
      <div class="onlineBody">
        <div class='eachRow' v-for="user in users" :key="user.username">
          <div class="row">

            <div v-if="user.username !== null">
              <a v-bind:href="'/chat?counterpart=' + user.username" class="tooltip">{{ user.username }}
                <span class="tooltiptext">Click to chat</span>
              </a>
            </div>
            <div v-if="user.username === null">Anonymous</div>

            <div v-if="user.gender !== null">{{ user.gender }}</div>
            <div v-if="user.gender === null">N/A</div>

            <div v-if="user.country !== null">{{ user.country }}</div>
            <div v-if="user.country === null">N/A</div>

            <div v-if="user.major !== null">{{ user.major }}</div>
            <div v-if="user.major === null">N/A</div>

            <div v-if="user.school !== null">{{ user.school }}</div>
            <div v-if="user.school === null">N/A</div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import io from 'socket.io-client';
export default {
  name: 'OnlinePage',
  data() {
    return {
      users: [],
      socket: io('localhost:3001', {
        transports: ['websocket']
      })
    }
  },
  mounted() {
    this.socket.on('updateOnlineUsers', (data) => {
      this.users = [...JSON.parse(data)[0]]
    })
  }
}
</script>
<style scoped>
@import '../assets/styles/online.css';
</style>