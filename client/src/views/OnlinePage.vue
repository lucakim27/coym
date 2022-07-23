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

            <div v-if="user.username !== undefined">
              <a href="">{{ user.username }}</a>
            </div>
            <div v-if="user.username === undefined">Anonymous</div>

            <div v-if="user.gender !== undefined">{{ user.gender }}</div>
            <div v-if="user.gender === undefined">N/A</div>

            <div v-if="user.country !== undefined">{{ user.country }}</div>
            <div v-if="user.country === undefined">N/A</div>

            <div v-if="user.major !== undefined">{{ user.major }}</div>
            <div v-if="user.major === undefined">N/A</div>

            <div v-if="user.school !== undefined">{{ user.school }}</div>
            <div v-if="user.school === undefined">N/A</div>

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
.onlineDiv {
  height: 83vh;
  min-width: 80%;
  flex: 0;
  padding: 10px;
  border-radius: 10px;
  background: rgb(146, 156, 161);
}

.onlineHead {
  display: flex;
  justify-content: center;
  padding: 10px;
  margin-left: 2%;
}

.onlineHead div {
  padding: 10px;
  color: white;
  font-size: 30px;
  width: 16%;
  text-align: center;
}

.onlineBody {
  overflow-y: scroll;
  justify-content: center;
  padding: 10px;

}

.container {
  display: flex;
  padding: 10px;
  justify-content: center;
}

.eachRow {
  padding: 10px;
  justify-content: center;
  margin: 20px;
  background: rgb(89, 95, 98);
  border-radius: 10px;
}

.row {
  justify-content: center;
  display: flex;
  padding: 10px;
  color: white;
  width: 100%;
}

.row div {
  width: 16%;
  padding: 10px;
  text-align: center;
}

.row div a {
  text-decoration: none;
  color: white;
}

.row div a:hover {
  color: rgb(98, 203, 255);
}
</style>