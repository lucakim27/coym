<template>
  <div id='container'>
    <div id="ipnutContainer" v-show='loggedIn'>
      <input type="text" id="userInput" v-model="commentInput" placeholder="Comment here..."
        @focus="magic_flag = true" />
      <button @click="comment()" id="commentBtn" v-show="magic_flag">Comment</button>
      <button @click="magic_flag = !magic_flag" class="closeBtn" v-show="magic_flag">Close</button>
    </div>
    <center id="commentDiv">
      <div v-for="comment in getComment" :key="comment.comment" class='eachCommentDiv'
        :id="comment.comment + 'Container'">
        <div class="firstRow">
          <a class='username' href=''>{{ comment.username }}</a>
          <p class='date'>{{ comment.date.slice(0, 10) }}</p>
        </div><br>
        <p class='comment'>{{ comment.comment }}</p><br>
        <div class='likeAndReplyContainer'>
          <center class='lastRow'>
            <button v-bind:id="comment.comment" class='like' @click="like(comment.comment)">0 Likes</button>
            <button v-bind:id="comment.comment + 'Reply'" class='reply' @click="reply(comment.comment)">Reply</button>
            <button v-bind:id="comment.comment + 'ViewReply'" class='viewReply' @click="viewReply(comment.comment)">View
              Replies</button>
          </center>
        </div>
        <div :id="comment.comment + 'ReplyContainer'" class="replyContainer">
          <input placeholder='Reply here...'>
          <button>Reply</button>
          <button @click="closeReplyContainer(comment.comment)">Close</button>
        </div>
        <div :id="comment.comment + 'ViewReplyContainer'" class="viewReplyContainer">
          <p>WOWOOWO SO COOL!</p>
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
    closeReplyContainer(comment) {
      document.getElementById(comment + 'ReplyContainer').style.display = 'none'
    },
    getQueryVariable() {
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
          axios({
              method: "POST",
              url: "http://localhost:3000/postCount",
              headers: { 'Content-Type': 'application/json' },
              data: { page: response.data.page , type: 'comment' }
          })
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
        data: { comment: comment, page: this.getQueryVariable(), username: this.username }
      }).then(function (response) {
        if (response.data.status) {
          alert(response.data.message)
          window.location.reload()
        }
      })
    },
    reply(comment) {
      document.getElementById(comment + 'ReplyContainer').style.display = 'flex'
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
    viewReply(comment) {
      if (document.getElementById(comment + 'ViewReplyContainer').style.display === 'flex') {
        document.getElementById(comment + 'ViewReplyContainer').style.display = 'none'
        document.getElementById(comment + 'ViewReply').innerText = 'View Replies'
      } else {
        document.getElementById(comment + 'ViewReplyContainer').style.display = 'flex'
        document.getElementById(comment + 'ViewReply').innerText = 'Close Replies'
      }
    },
    renderLike(like) {
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
  background-color: rgb(0, 0, 0);
  cursor: pointer;
  border-radius: 10px;
  color: white;
  font-size: 20px;
  width: auto;
  margin: 10px;
}

.closeBtn {
  background-color: rgb(0, 0, 0);
  cursor: pointer;
  border-radius: 10px;
  color: white;
  font-size: 20px;
  width: auto;
  margin: 10px;
}

#userInput {
  border-radius: 10px;
  text-align: center;
  width: auto;
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
  width: auto;
  background: rgb(146, 156, 161);
  border-radius: 10px;
}

.username {
  font-weight: bold;
  color: white;
  margin: 10px;
  /* width: 50%; */
  text-decoration: none;
}

.comment {
  display: flex;
  color: white;
  margin: 10px;
  font-size: 50px;
  /* margin-left: auto;
  margin-right: auto; */
}

.date {
  font-weight: lighter;
  color: rgb(213, 213, 213);
  margin: 10px;
  /* width: 50%; */
}

.firstRow {
  display: flex;
}

.lastRow {
  display: flex;
  justify-content: flex-end;
}

.like,
.reply,
.viewReply {
  margin: 10px;
  background-color: rgba(0, 0, 0, 0.478);
  color: rgb(255, 255, 255);
  border-radius: 10px;
  width: auto;
  /* margin-left: auto; */
  cursor: pointer;
}

.replyContainer,
.viewReplyContainer {
  display: none;
}

.replyContainer input {
  width: 60%;
  margin: 5px;
  border-radius: 10px;
  text-align: center;
}

.replyContainer button {
  width: 20%;
  margin: 5px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.478);
  color: white;
}
</style>