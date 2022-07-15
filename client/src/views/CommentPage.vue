<template>
  <div id='container'>
    <div id="ipnutContainer" v-show='loggedIn'>
      <input type="text" id="userInput" v-model="commentInput" placeholder="Comment here..." />
      <button @click="comment()" id="commentBtn">></button>
    </div>
    <center id="commentDiv">
      <div v-for="comment in getComment" :key="comment.comment" style="padding: 10px; margin: 10px; display: flex; width: 80%; background: black; border-radius: 10px;">
        <a href='' style='color: white; margin: 10px; width: 20%; transform: translateY(30%);'>{{ comment.username }}</a>
        <p style='color: white; margin: 10px; width: 40%; transform: translateY(30%);'>{{ comment.comment }}</p>
        <p style='color: white; margin: 10px; width: 20%; transform: translateY(30%);'>{{ comment.date.slice(0, 10) }}</p>
        <div style='width: 10%; margin: 10px; '>
          <button @click="like('{{ comment.comment }}')" style='margin: 10px; width: 100%; background-color: rgb(54, 153, 207); color: white; border-radius: 5px;'>0 Like</button>
          <button @click="reply('{{ comment.comment }}')" style='margin: 10px; width: 100%; background-color: rgb(54, 153, 207); color: white; border-radius: 5px;'>0 Reply</button>
        </div>
      </div>
    </center>
  </div>
</template>
<script>
import axios from 'axios'
import { useCookies } from "vue3-cookies"
export default {
  name: 'CommentPage',
  setup() {
        const { cookies } = useCookies()
        return { cookies }
    },
  data() {
    return {
      username: '',
      commentInput: '',
      loggedIn: false,
      getComment: []
    }
  },
  mounted() {
    let self = this
    let user = this.cookies.get("user")
    if (user !== null) {
        this.username = this.cookies.get("user").username
        this.loggedIn = true
    }
    axios({
      method: "GET",
      url: "http://localhost:3000/getComment",
      params: {
        page: this.getQueryVariable()
      }
    }).then(function (response) {
      if (response.data.status) {
        self.getComment = response.data.message
      }
    })
  },
  methods: {
    getQueryVariable: function () {
      var query = window.location.search.substring(1)
      var vars = query.split('&')
      var returnValue = ''
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=')
        if (pair.length !== 1) {
          for (var j = 0; j < pair.length; j++) {
            if (pair[j] !== 'major') {
              returnValue += pair[j]
            }
          }
        } else {
          returnValue += pair[0]
        }
      }
      return decodeURIComponent(returnValue)
    },
    comment() {
      if (this.commentInput === '') {
        alert("You have not input anything yet.")
        return 0
      }
      axios({
        method: "POST",
        url: "http://localhost:3000/postComment",
        headers: { 'Content-Type': 'application/json' },
        data: { comment: this.commentInput, username: this.username, page: this.getQueryVariable() }
      }).then(function (response) {
        if (response.data.status) {
          alert("You have successfully commented.")
        } else {
          alert("Your comment is duplicated.")
        }
      })
    },
    like(comment) {
      alert("like")
      axios({
        method: "POST",
        url: "http://localhost:3000/postLike",
        headers: { 'Content-Type': 'application/json' },
        data: { comment: comment, page: this.getQueryVariable() }
      }).then(function (response) {
        if (response.data.status) {
          alert("You have successfully liked.")
        } else {
          alert("You have successfully disliked.")
        }
      })
    },
    reply(comment) {
      alert("reply")
      axios({
        method: "POST",
        url: "http://localhost:3000/postReply",
        headers: { 'Content-Type': 'application/json' },
        data: { comment: comment, page: this.getQueryVariable() }
      }).then(function (response) {
        if (response.data.status) {
          alert("")
        } else {
          alert("")
        }
      })
    },
  }
}
</script>
<style scoped>
#commentBtn {
  background-color: rgb(54, 153, 207);
  cursor: pointer;
  border-radius: 5px;
  color: white;
  font-size: 20px;
  width: 20%;
  margin: 10px;
}

#userInput {
  border-radius: 5px;
  text-align: center;
  width: 60%;
  font-size: 20px;
  margin: 10px;
}

#container {
  height: 1100px;
  text-align: center;
}

#ipnutContainer {
  margin: 10px;
  margin-top: 100px;
}
</style>