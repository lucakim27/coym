<template>
  <div id='container'>
    <div id="ipnutContainer" v-show='loggedIn'>
      <textarea height="60" type="text" id="userInput" v-model="commentInput" placeholder="Comment here..."
        @focus="magic_flag = true" /><br>
      <button @click="comment()" id="commentBtn" v-show="magic_flag">Comment</button>
      <button @click="magic_flag = !magic_flag" class="closeBtn" v-show="magic_flag">Close</button>
    </div>
    <center id="commentDiv">
      <div v-for="comment in getComment" :key="comment.comment" class='eachCommentDiv'
        :id="comment.comment + 'Container'">
        <div class="firstRow">
          <a class='username '>{{ comment.username }}</a>
          <p class='date'>{{ comment.createdAt.slice(0, 10) }}</p>
        </div>
        <p class='comment'>{{ comment.comment }}</p>
        <div class='likeAndReplyContainer'>
          <center class='lastRow'>
            <button v-bind:id="comment.comment" class='like' @click="like(comment.comment)">0 Likes</button>
            <button v-bind:id="comment.comment + 'Reply'" class='reply' v-if="username !== ''"
              @click="showReplyContainer(comment.comment)">Reply</button>
            <button v-if='renderReplyBtn.includes(comment.comment)' v-bind:id="comment.comment + 'ViewReply'" class='viewReply' @click="viewReply(comment.comment)">View
              Replies</button>
          </center>
        </div>
        <div :id="comment.comment + 'ReplyContainer'" class="replyContainer">
          <textarea :id="comment.comment + 'ReplyInput'" placeholder='Reply here...'/>
          <button @click="reply(comment.comment)">Reply</button>
        </div>
        <div :id="comment.comment + 'ViewReplyContainer'" class="viewReplyContainer">
          <div v-for="reply in getReply" :key="reply.reply">
            <div v-if="reply.comment === comment.comment">
              <a class="replyUsername">{{ reply.username }}:
              </a> {{ reply.reply }}
            </div>
          </div>
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
      getLike: [],
      getReply: [],
      renderReplyBtn: []
    }
  },
  beforeMount() {
    let self = this
    let user = this.cookies.get("user")
    if (user !== null) {
      this.username = this.cookies.get("user").username
      this.loggedIn = true
    }
    axios({
      method: "GET",
      url: "https://proxy11112321321.herokuapp.com/https://coym-api.herokuapp.com/getComment",
      // url: "http://localhost:3000/getComment",
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
      url: "https://proxy11112321321.herokuapp.com/https://coym-api.herokuapp.com/getLike",
      // url: "http://localhost:3000/getLike",
      params: {
        page: this.getQueryVariable()
      }
    }).then(function (response) {
      if (response.data.status) {
        self.getLike = response.data.message
        self.renderLike(self.getLike)
      }
    })
    axios({
      method: "GET",
      url: "https://proxy11112321321.herokuapp.com/https://coym-api.herokuapp.com/getReply",
      // url: "http://localhost:3000/getReply",
      params: {
        page: this.getQueryVariable()
      }
    }).then(function (response) {
      if (response.data.status) {
        self.getReply = response.data.message
        self.findReplyComments(self.getReply)
      }
    })
  },
  methods: {
    findReplyComments(replies) {
      let list = []
      replies.forEach(key => {
        if (!list.includes(key.comment)) {
          list.push(key.comment)
        }
      })
      this.renderReplyBtn = list
    },
    reply(comment) {
      if (document.getElementById(comment + 'ReplyInput').value === '') {
        alert("You have not input anything yet.")
        return 0
      } else if (this.username === '') {
        alert("You're not logged in.")
      } else {
        axios({
          method: "POST",
          url: "https://proxy11112321321.herokuapp.com/https://coym-api.herokuapp.com/postReply",
          // url: "http://localhost:3000/postReply",
          headers: { 'Content-Type': 'application/json' },
          data: { comment: comment, username: this.username, page: this.getQueryVariable(), reply: document.getElementById(comment + 'ReplyInput').value }
        }).then(function (response) {
          if (response.data.status) {
            alert(response.data.message)
            window.location.reload()
          }
        })
      }
    },
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
        url: "https://proxy11112321321.herokuapp.com/https://coym-api.herokuapp.com/postComment",
        // url: "http://localhost:3000/postComment",
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
      if (this.username === '') {
        alert("You're not logged in.")
      } else {
        axios({
          method: "POST",
          url: "https://proxy11112321321.herokuapp.com/https://coym-api.herokuapp.com/postLike",
          // url: "http://localhost:3000/postLike",
          headers: { 'Content-Type': 'application/json' },
          data: { comment: comment, page: this.getQueryVariable(), username: this.username }
        }).then(function (response) {
          if (response.data.status) {
            alert(response.data.message)
            window.location.reload()
          }
        })
      }
    },
    showReplyContainer(comment) {
      if (document.getElementById(comment + 'Reply').innerText === 'Reply') {
        document.getElementById(comment + 'Reply').innerText = 'Close'
        document.getElementById(comment + 'ReplyContainer').style.display = 'flex'
      } else {
        document.getElementById(comment + 'Reply').innerText = 'Reply'
        document.getElementById(comment + 'ReplyContainer').style.display = 'none'
      }
    },
    viewReply(comment) {
      if (document.getElementById(comment + 'ViewReplyContainer').style.display === 'block') {
        document.getElementById(comment + 'ViewReplyContainer').style.display = 'none'
        document.getElementById(comment + 'ViewReply').innerText = 'View Replies'
      } else {
        document.getElementById(comment + 'ViewReplyContainer').style.display = 'block'
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
@import '../assets/styles/comment.css';
</style>