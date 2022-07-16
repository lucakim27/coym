<template>
  <div id='container'>
    <div id="ipnutContainer" v-show='loggedIn'>
      <input type="text" id="userInput" v-model="commentInput" placeholder="Comment here..." @focus="magic_flag = true"/>
      <button @click="comment()" id="commentBtn" v-show="magic_flag">Comment</button>
      <button @click="magic_flag = !magic_flag" class="closeBtn" v-show="magic_flag">Close</button>
    </div>
    <center id="commentDiv">
      <div v-for="comment in getComment" :key="comment.comment" class='eachCommentDiv'>
        <div class="firstRow">
          <a class='username' href=''>{{ comment.username }}</a>
          <p class='date'>{{ comment.date.slice(0, 10) }}</p>
        </div><hr>
        <p class='comment'>{{ comment.comment }}</p><hr>
        <div class='likeAndReplyContainer'>
          <center class='lastRow'>
            <button v-bind:id="comment.comment" class='like' @click="like(comment.comment)">0 Likes</button>
            <button v-bind:id="comment.comment" class='reply' @click="reply(comment.comment)">View Replies</button>
          </center>
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
      magic_flag: false,
      getComment: [],
      getLike: []
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
    axios({
      method: "GET",
      url: "http://localhost:3000/getLike",
      params: {
        page: this.getQueryVariable()
      }
    }).then(function (response) {
      if (response.data.status) {
        self.getLike = response.data.message
        self.renderLike(self.getLike)
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
          window.location.reload()
        } else {
          alert("Your comment is duplicated.")
        }
      })
    },
    like(comment) {
      axios({
        method: "POST",
        url: "http://localhost:3000/postLike",
        headers: { 'Content-Type': 'application/json' },
        data: { comment: comment, page: this.getQueryVariable(), username: this.username  }
      }).then(function (response) {
        if (response.data.status) {
          alert(response.data.message)
          window.location.reload()
        }
      })
    },
    reply(comment) {
      alert("reply")
      console.log(comment)
      // axios({
      //   method: "POST",
      //   url: "http://localhost:3000/postReply",
      //   headers: { 'Content-Type': 'application/json' },
      //   data: { comment: comment, page: this.getQueryVariable() }
      // }).then(function (response) {
      //   if (response.data.status) {
      //     alert("")
      //   } else {
      //     alert("")
      //   }
      // })
    },
    renderLike(like) {
      console.log(like)
      setTimeout(() => {
        for (var i = 0; i < like.length; i++) {
          document.getElementById(`${like[i].comment}`).innerText = (parseInt(document.getElementById(`${like[i].comment}`).innerText.replace(/([a-z]+)/i, "")) + 1).toString() + " Likes"
        }
      }, "0")
    }
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
  width: 10%;
  margin: 10px;
}

.closeBtn {
  background-color: rgb(207, 54, 54);
  cursor: pointer;
  border-radius: 5px;
  color: white;
  font-size: 20px;
  width: 10%;
  margin: 10px;
}

#userInput {
  border-radius: 5px;
  text-align: center;
  width: 59%;
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

.eachCommentDiv {
  padding: 10px;
  margin: 10px;
  width: 80%;
  background: rgb(0, 0, 0);
  border-radius: 10px;
}

.username {
  font-weight: bold;
  color: white;
  margin: 10px;
  width: 50%;
  /* transform: translateY(30%); */
}

.comment {
  display: flex;
  color: white;
  margin: 10px;
  font-size: 50px;
  /* transform: translateY(30%); */
}

.date {
  font-weight: lighter;
  color: white;
  margin: 10px;
  width: 50%;
  /* transform: translateY(30%); */
}

.firstRow,
.lastRow {
  display: flex;
}

.like,
.reply {
  margin: 10px;
  background-color: rgb(60, 61, 62);
  color: white;
  border-radius: 5px;
  width: 50%;
}

</style>