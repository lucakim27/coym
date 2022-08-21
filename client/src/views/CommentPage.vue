<template>
  <div id='container'>
    <div id="ipnutContainer">
      <textarea height="60" type="text" id="userInput" v-model="commentInput" placeholder="Comment here..."
        @focus="showBtns = true"></textarea><br>
      <div class="commentButtonContainer">
        <button @click="comment()" id="commentBtn" v-show="showBtns">Comment</button>
        <button @click="showBtns = !showBtns" class="closeBtn" v-show="showBtns">Close</button>
      </div>
    </div>
    <center id="commentDiv">
      <div class="commentLoader" v-if="getComment === null">
        <pulse-loader :loading="loading" :color="color" :size="size"></pulse-loader>
      </div>
      <div v-for="comment in getComment" :key="comment.comment" class='eachCommentDiv'
        :id="comment.comment + 'Container'">
        <div class="firstRow">
          <div class="usernameDateContainer">
            <router-link class='username' :to="'/profile?username=' + comment.username">{{ comment.username }}
            </router-link>
            <p class='date'>{{ comment.createdAt.slice(0, 10) }}</p>
          </div>
          <div class="commentDropdown">
            <svg @click.prevent="toggleDropdown(comment.comment)" v-bind:id="comment.comment + 'toggleDropdownBtn'"
              v-if="comment.username === username" class="svg-icon commentDropdownBtn" fill="white" width="30"
              height="30" viewBox="0 0 20 20">
              <path class="svg-path"
                d="M10,2.172c-4.324,0-7.828,3.504-7.828,7.828S5.676,17.828,10,17.828c4.324,0,7.828-3.504,7.828-7.828S14.324,2.172,10,2.172M10,17.004c-3.863,0-7.004-3.141-7.004-7.003S6.137,2.997,10,2.997c3.862,0,7.004,3.141,7.004,7.004S13.862,17.004,10,17.004M10,8.559c-0.795,0-1.442,0.646-1.442,1.442S9.205,11.443,10,11.443s1.441-0.647,1.441-1.443S10.795,8.559,10,8.559 M10,10.619c-0.34,0-0.618-0.278-0.618-0.618S9.66,9.382,10,9.382S10.618,9.661,10.618,10S10.34,10.619,10,10.619 M14.12,8.559c-0.795,0-1.442,0.646-1.442,1.442s0.647,1.443,1.442,1.443s1.442-0.647,1.442-1.443S14.915,8.559,14.12,8.559 M14.12,10.619c-0.34,0-0.618-0.278-0.618-0.618s0.278-0.618,0.618-0.618S14.738,9.661,14.738,10S14.46,10.619,14.12,10.619 M5.88,8.559c-0.795,0-1.442,0.646-1.442,1.442s0.646,1.443,1.442,1.443S7.322,10.796,7.322,10S6.675,8.559,5.88,8.559 M5.88,10.619c-0.34,0-0.618-0.278-0.618-0.618S5.54,9.382,5.88,9.382S6.498,9.661,6.498,10S6.22,10.619,5.88,10.619">
              </path>
            </svg>
            <svg @click.prevent="closeEditMode(comment.comment)" class="svg-icon closeEditBtn"
              v-bind:id="comment.comment + 'closeEditBtn'" v-if="comment.username === username" fill="white" width="25"
              height="25" viewBox="0 0 20 20">
              <path
                d="M10.185,1.417c-4.741,0-8.583,3.842-8.583,8.583c0,4.74,3.842,8.582,8.583,8.582S18.768,14.74,18.768,10C18.768,5.259,14.926,1.417,10.185,1.417 M10.185,17.68c-4.235,0-7.679-3.445-7.679-7.68c0-4.235,3.444-7.679,7.679-7.679S17.864,5.765,17.864,10C17.864,14.234,14.42,17.68,10.185,17.68 M10.824,10l2.842-2.844c0.178-0.176,0.178-0.46,0-0.637c-0.177-0.178-0.461-0.178-0.637,0l-2.844,2.841L7.341,6.52c-0.176-0.178-0.46-0.178-0.637,0c-0.178,0.176-0.178,0.461,0,0.637L9.546,10l-2.841,2.844c-0.178,0.176-0.178,0.461,0,0.637c0.178,0.178,0.459,0.178,0.637,0l2.844-2.841l2.844,2.841c0.178,0.178,0.459,0.178,0.637,0c0.178-0.176,0.178-0.461,0-0.637L10.824,10z">
              </path>
            </svg>
            <div v-bind:id="comment.comment + 'commentDropdown'" class="comment-dropdown-content">
              <a class="commentEditBtn" @click.prevent="editComment(comment.comment)"
                v-bind:id="comment.comment + 'edit'">Edit</a>
              <a class="commentDeleteBtn" @click.prevent="deleteComment(comment.comment)">Delete</a>
            </div>
          </div>
        </div>
        <p class='comment' v-bind:id="comment.comment + 'commetParagraph'">{{ comment.comment }}</p>
        <div v-bind:id="comment.comment + 'commentEditContainer'" class="editContainer">
          <textarea class='commentEditTextarea' :value="comment.comment"
            v-bind:id="comment.comment + 'editTextArea'"></textarea><button class='editBtn'
            @click="edit(comment.comment)">Edit</button>
        </div>
        <div class='likeAndReplyContainer'>
          <center class='lastRow'>
            <button v-bind:id="comment.comment" class='like' @click="like(comment.comment)">0 Like</button>
            <button v-bind:id="comment.comment + 'Reply'" class='reply'
              @click="showReplyContainer(comment.comment)">Reply</button>
            <button v-if='renderReplyBtn.includes(comment.comment)' v-bind:id="comment.comment + 'ViewReply'"
              class='viewReply' @click="viewReply(comment.comment)">View
              Replies</button>
          </center>
        </div>
        <div :id="comment.comment + 'ReplyContainer'" class="replyContainer">
          <textarea :id="comment.comment + 'ReplyInput'" placeholder='Reply here...' />
          <button @click="reply(comment.comment)">Reply</button>
        </div>
        <div :id="comment.comment + 'ViewReplyContainer'" class="viewReplyContainer">
          <div v-for="reply in getReply" :key="reply.reply">
            <div v-if="reply.comment === comment.comment">
              <div class="firstRow">
                <div class="usernameDateContainer">
                  <router-link class='username' :to="'/profile?username=' + reply.username">{{ reply.username }}
                  </router-link>
                  <p class='date'>{{ reply.createdAt.slice(0, 10) }}</p>
                  <div class="replyDropdown">
                    <svg @click.prevent="toggleReplyDropdown(comment.comment, reply.reply)"
                      v-bind:id="comment.comment + reply.reply + 'toggleReplyDropdownBtn'" v-if="reply.username === username"
                      class="svg-icon replyDropdownBtn" fill="white" width="30" height="30" viewBox="0 0 20 20">
                      <path class="svg-path"
                        d="M10,2.172c-4.324,0-7.828,3.504-7.828,7.828S5.676,17.828,10,17.828c4.324,0,7.828-3.504,7.828-7.828S14.324,2.172,10,2.172M10,17.004c-3.863,0-7.004-3.141-7.004-7.003S6.137,2.997,10,2.997c3.862,0,7.004,3.141,7.004,7.004S13.862,17.004,10,17.004M10,8.559c-0.795,0-1.442,0.646-1.442,1.442S9.205,11.443,10,11.443s1.441-0.647,1.441-1.443S10.795,8.559,10,8.559 M10,10.619c-0.34,0-0.618-0.278-0.618-0.618S9.66,9.382,10,9.382S10.618,9.661,10.618,10S10.34,10.619,10,10.619 M14.12,8.559c-0.795,0-1.442,0.646-1.442,1.442s0.647,1.443,1.442,1.443s1.442-0.647,1.442-1.443S14.915,8.559,14.12,8.559 M14.12,10.619c-0.34,0-0.618-0.278-0.618-0.618s0.278-0.618,0.618-0.618S14.738,9.661,14.738,10S14.46,10.619,14.12,10.619 M5.88,8.559c-0.795,0-1.442,0.646-1.442,1.442s0.646,1.443,1.442,1.443S7.322,10.796,7.322,10S6.675,8.559,5.88,8.559 M5.88,10.619c-0.34,0-0.618-0.278-0.618-0.618S5.54,9.382,5.88,9.382S6.498,9.661,6.498,10S6.22,10.619,5.88,10.619">
                      </path>
                    </svg>
                    <svg @click.prevent="closeReplyEditMode(comment.comment, reply.reply)" class="svg-icon closeReplyEditBtn"
                      v-bind:id="comment.comment + reply.reply + 'closeReplyEditBtn'" v-if="reply.username === username" fill="white"
                      width="25" height="25" viewBox="0 0 20 20">
                      <path
                        d="M10.185,1.417c-4.741,0-8.583,3.842-8.583,8.583c0,4.74,3.842,8.582,8.583,8.582S18.768,14.74,18.768,10C18.768,5.259,14.926,1.417,10.185,1.417 M10.185,17.68c-4.235,0-7.679-3.445-7.679-7.68c0-4.235,3.444-7.679,7.679-7.679S17.864,5.765,17.864,10C17.864,14.234,14.42,17.68,10.185,17.68 M10.824,10l2.842-2.844c0.178-0.176,0.178-0.46,0-0.637c-0.177-0.178-0.461-0.178-0.637,0l-2.844,2.841L7.341,6.52c-0.176-0.178-0.46-0.178-0.637,0c-0.178,0.176-0.178,0.461,0,0.637L9.546,10l-2.841,2.844c-0.178,0.176-0.178,0.461,0,0.637c0.178,0.178,0.459,0.178,0.637,0l2.844-2.841l2.844,2.841c0.178,0.178,0.459,0.178,0.637,0c0.178-0.176,0.178-0.461,0-0.637L10.824,10z">
                      </path>
                    </svg>
                    <div v-bind:id="comment.comment + reply.reply + 'replyDropdown'" class="reply-dropdown-content">
                      <a @click.prevent="editReply(comment.comment, reply.reply)" v-bind:id="reply.reply + 'replyEdit'">Edit</a>
                      <a class="replyDeleteBtn" @click.prevent="deleteReply(reply.reply, comment.comment)">Delete</a>
                    </div>
                  </div>
                </div>
              </div>
              <p class='replyParagraph' v-bind:id="comment.comment + reply.reply + 'replyParagraph'">{{ reply.reply }}</p>
              <div v-bind:id="comment.comment + reply.reply + 'replyEditContainer'" class="replyEditContainer">
                <textarea class='replyEditTextarea' :value="reply.reply"
                  v-bind:id="comment.comment + reply.reply + 'replyEditTextArea'"></textarea><button class='editReplyBtn'
                  @click="editReplyBtn(reply.reply, comment.comment)">Edit</button>
              </div>
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
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
export default {
  name: 'CommentPage',
  components: {
    PulseLoader
  },
  data() {
    return {
      username: '',
      commentInput: '',
      showBtns: false,
      getComment: null,
      getLike: [],
      getReply: [],
      renderReplyBtn: []
    }
  },
  created() {
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
    axios({
      method: "GET",
      url: process.env.VUE_APP_ROOT_API + "/getComment",
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
      url: process.env.VUE_APP_ROOT_API + "/getLike",
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
      url: process.env.VUE_APP_ROOT_API + "/getReply",
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
  setup() {
    const { cookies } = useCookies()
    return { cookies }
  },
  mounted() {
    this.$el.addEventListener('click', this.onClick)
  },
  beforeUnMount: function () {
    this.$el.removeEventListener('click', this.onClick)
  },
  methods: {
    onClick: function (event) {
      if (!event.target.matches('.commentEditBtn') && !event.target.matches('.commentDeleteBtn') && !event.target.matches('.commentDropdownBtn') && !event.target.matches('.svg-icon') && !event.target.matches('.svg-path')) {
        for (var i = 0; i < document.getElementsByClassName('comment-dropdown-content').length; i++) {
          document.getElementsByClassName('comment-dropdown-content')[i].classList.remove("height")
        }
      }
      if (!event.target.matches('.replyEditBtn') && !event.target.matches('.replyDeleteBtn') && !event.target.matches('.replyDropdownBtn') && !event.target.matches('.svg-icon') && !event.target.matches('.svg-path')) {
        for (var j = 0; j < document.getElementsByClassName('reply-dropdown-content').length; j++) {
          document.getElementsByClassName('reply-dropdown-content')[j].classList.remove("height")
        }
      }
    },
    edit(comment) {
      if (document.getElementById(comment + 'editTextArea').value === '') {
        alert("You have not input anything yet.")
      } else {
        axios({
          method: "POST",
          url: process.env.VUE_APP_ROOT_API + "/editComment",
          headers: { 'Content-Type': 'application/json' },
          data: { comment: document.getElementById(comment + 'editTextArea').value, previousComment: comment, username: this.username, page: this.getQueryVariable() }
        }).then(function (response) {
          if (response.data.status) {
            alert("You have successfully edited your comment.")
            window.location.reload()
          } else {
            alert("You failed to edit your comment because of the duplicated comment.")
          }
        })
      }
    },
    editReplyBtn(reply, comment) {
      if (document.getElementById(comment + reply + 'replyEditTextArea').value === '') {
        alert("You have not input anything yet.")
      } else {
        axios({
          method: "POST",
          url: process.env.VUE_APP_ROOT_API + "/editReply",
          headers: { 'Content-Type': 'application/json' },
          data: { comment: comment, reply: document.getElementById(comment + reply + 'replyEditTextArea').value, previousReply: reply, username: this.username, page: this.getQueryVariable() }
        }).then(function (response) {
          if (response.data.status) {
            alert("You have successfully edited your reply.")
            window.location.reload()
          } else {
            alert("The reply is duplicated.")
          }
        })
      }
    },
    editComment(comment) {
      document.getElementById(comment + 'commentDropdown').classList.remove("height")
      document.getElementById(comment + 'closeEditBtn').style.display = 'block'
      document.getElementById(comment + 'toggleDropdownBtn').style.display = 'none'
      document.getElementById(comment + 'commetParagraph').style.display = 'none'
      document.getElementById(comment + 'commentEditContainer').style.display = 'flex'
    },
    editReply(comment, reply) {
      document.getElementById(comment + reply + 'replyDropdown').classList.remove("height")
      document.getElementById(comment + reply + 'closeReplyEditBtn').style.display = 'block'
      document.getElementById(comment + reply + 'toggleReplyDropdownBtn').style.display = 'none'
      document.getElementById(comment + reply + 'replyParagraph').style.display = 'none'
      document.getElementById(comment + reply + 'replyEditContainer').style.display = 'flex'
    },
    closeEditMode(comment) {
      document.getElementById(comment + 'closeEditBtn').style.display = 'none'
      document.getElementById(comment + 'toggleDropdownBtn').style.display = 'block'
      document.getElementById(comment + 'commetParagraph').style.display = 'block'
      document.getElementById(comment + 'commentEditContainer').style.display = 'none'
    },
    closeReplyEditMode(comment, reply) {
      document.getElementById(comment + reply + 'closeReplyEditBtn').style.display = 'none'
      document.getElementById(comment + reply + 'toggleReplyDropdownBtn').style.display = 'block'
      document.getElementById(comment + reply + 'replyParagraph').style.display = 'block'
      document.getElementById(comment + reply + 'replyEditContainer').style.display = 'none'
    },
    deleteComment(comment) {
      if (confirm("Are you sure you want to delete the comment?")) {
        axios({
          method: "POST",
          url: process.env.VUE_APP_ROOT_API + "/deleteComment",
          headers: { 'Content-Type': 'application/json' },
          data: { comment: comment, username: this.username, page: this.getQueryVariable() }
        }).then(function (response) {
          if (response.data.status) {
            alert("You have successfully deleted your comment.")
            window.location.reload()
          } else {
            alert("You have failed to delete your comment for some reasons.")
          }
        })
      }
    },
    deleteReply(reply, comment) {
      if (confirm("Are you sure you want to delete the reply?")) {
        axios({
          method: "POST",
          url: process.env.VUE_APP_ROOT_API + "/deleteReply",
          headers: { 'Content-Type': 'application/json' },
          data: { comment: comment, reply: reply, username: this.username, page: this.getQueryVariable() }
        }).then(function (response) {
          if (response.data.status) {
            alert("You have successfully deleted your reply.")
            window.location.reload()
          } else {
            alert("You have failed to delete your reply for some reasons.")
          }
        })
      }
    },
    toggleDropdown(comment) {
      document.getElementById(comment + 'commentDropdown').classList.toggle("height")
    },
    toggleReplyDropdown(comment, reply) {
      document.getElementById(comment + reply + 'replyDropdown').classList.toggle("height")
    },
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
      if (this.username === '' || this.username === null) {
        alert("Sign in please.")
      }
      else if (document.getElementById(comment + 'ReplyInput').value === '') {
        alert("Please type in longer than a character.")
      }
      else {
        axios({
          method: "POST",
          url: process.env.VUE_APP_ROOT_API + "/postReply",
          headers: { 'Content-Type': 'application/json' },
          data: { comment: comment, username: this.username, page: this.getQueryVariable(), reply: document.getElementById(comment + 'ReplyInput').value }
        }).then(function (response) {
          if (response.data.status) {
            alert(response.data.message)
            window.location.reload()
          } else {
            alert(response.data.message)
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
      if (this.username === '' || this.username === null) {
        alert("Sign in please.")
      } else if (this.commentInput === '') {
        alert("Please type in longer than a character.")
        return 0
      } else {
        axios({
          method: "POST",
          url: process.env.VUE_APP_ROOT_API + "/postComment",
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
      }
    },
    like(comment) {
      if (this.username === '' || this.username === null) {
        alert("Sign in please.")
      } else {
        axios({
          method: "POST",
          url: process.env.VUE_APP_ROOT_API + "/postLike",
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
          if ((parseInt(document.getElementById(`${like[i].comment}`).innerText.replace(/([a-z]+)/i, "")) + 1).toString() < 2) {
            document.getElementById(`${like[i].comment}`).innerText = (parseInt(document.getElementById(`${like[i].comment}`).innerText.replace(/([a-z]+)/i, "")) + 1).toString() + " Like"
          } else {
            document.getElementById(`${like[i].comment}`).innerText = (parseInt(document.getElementById(`${like[i].comment}`).innerText.replace(/([a-z]+)/i, "")) + 1).toString() + " Likes"
          }
        }
      }, "300")
    }
  }
}
</script>
<style scoped>
@import '../assets/styles/comment.css';
</style>