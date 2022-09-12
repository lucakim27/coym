<template>
  <div id='container'>
    <div id="ipnutContainer">
      <textarea height="60" type="text" id="userInput" v-model="commentInput" v-if="majorName === null"
        :placeholder="'Loading...'" @focus="showBtns = true"></textarea>
      <textarea height="60" type="text" id="userInput" v-model="commentInput" v-if="majorName !== null"
        :placeholder="'Comment on ' + majorName + '...'" @focus="showBtns = true"></textarea><br>
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
        :id="comment.commentID + 'Container'">
        <div class="firstRow">
          <div class="usernameDateContainer">
            <router-link class='username' :to="'/profile/' + comment.id">{{  comment.username  }}
            </router-link>
            <a class='date'>{{  comment.createdAt.slice(0, 10)  }}</a>
          </div>
          <div class="commentDropdown">
            <svg @click.prevent="toggleDropdown(comment.commentID)" v-bind:id="`toggleDropdownBtn/${comment.commentID}`"
              v-if="comment.username === username" class="svg-icon commentDropdownBtn" fill="black" width="30"
              height="30" viewBox="0 0 20 20">
              <path class="svg-path"
                d="M10,2.172c-4.324,0-7.828,3.504-7.828,7.828S5.676,17.828,10,17.828c4.324,0,7.828-3.504,7.828-7.828S14.324,2.172,10,2.172M10,17.004c-3.863,0-7.004-3.141-7.004-7.003S6.137,2.997,10,2.997c3.862,0,7.004,3.141,7.004,7.004S13.862,17.004,10,17.004M10,8.559c-0.795,0-1.442,0.646-1.442,1.442S9.205,11.443,10,11.443s1.441-0.647,1.441-1.443S10.795,8.559,10,8.559 M10,10.619c-0.34,0-0.618-0.278-0.618-0.618S9.66,9.382,10,9.382S10.618,9.661,10.618,10S10.34,10.619,10,10.619 M14.12,8.559c-0.795,0-1.442,0.646-1.442,1.442s0.647,1.443,1.442,1.443s1.442-0.647,1.442-1.443S14.915,8.559,14.12,8.559 M14.12,10.619c-0.34,0-0.618-0.278-0.618-0.618s0.278-0.618,0.618-0.618S14.738,9.661,14.738,10S14.46,10.619,14.12,10.619 M5.88,8.559c-0.795,0-1.442,0.646-1.442,1.442s0.646,1.443,1.442,1.443S7.322,10.796,7.322,10S6.675,8.559,5.88,8.559 M5.88,10.619c-0.34,0-0.618-0.278-0.618-0.618S5.54,9.382,5.88,9.382S6.498,9.661,6.498,10S6.22,10.619,5.88,10.619">
              </path>
            </svg>
            <svg @click.prevent="closeEditMode(comment.commentID)" class="svg-icon closeEditBtn"
              v-bind:id="`closeEditBtn/${comment.commentID}`" v-if="comment.username === username" fill="black"
              width="25" height="25" viewBox="0 0 20 20">
              <path
                d="M10.185,1.417c-4.741,0-8.583,3.842-8.583,8.583c0,4.74,3.842,8.582,8.583,8.582S18.768,14.74,18.768,10C18.768,5.259,14.926,1.417,10.185,1.417 M10.185,17.68c-4.235,0-7.679-3.445-7.679-7.68c0-4.235,3.444-7.679,7.679-7.679S17.864,5.765,17.864,10C17.864,14.234,14.42,17.68,10.185,17.68 M10.824,10l2.842-2.844c0.178-0.176,0.178-0.46,0-0.637c-0.177-0.178-0.461-0.178-0.637,0l-2.844,2.841L7.341,6.52c-0.176-0.178-0.46-0.178-0.637,0c-0.178,0.176-0.178,0.461,0,0.637L9.546,10l-2.841,2.844c-0.178,0.176-0.178,0.461,0,0.637c0.178,0.178,0.459,0.178,0.637,0l2.844-2.841l2.844,2.841c0.178,0.178,0.459,0.178,0.637,0c0.178-0.176,0.178-0.461,0-0.637L10.824,10z">
              </path>
            </svg>
            <div v-bind:id="`commentDropdown/${comment.commentID}`" class="comment-dropdown-content">
              <a class="commentEditBtn" @click.prevent="openCommentEdit(comment.commentID)"
                v-bind:id="comment.comment + 'edit'">Edit</a>
              <a class="commentDeleteBtn" @click.prevent="deleteComment(comment.commentID)">Delete</a>
            </div>
          </div>
        </div>
        <p class='comment' v-bind:id="`commetParagraph/${comment.commentID}`">{{  comment.comment  }}</p>
        <div v-bind:id="`commentEditContainer/${comment.commentID}`" class="editContainer">
          <textarea class='commentEditTextarea' :value="comment.comment"
            v-bind:id="`editTextArea/${comment.commentID}`"></textarea><button class='editBtn'
            @click="editComment(comment.commentID)">Edit</button>
        </div>
        <div class='likeAndReplyContainer'>
          <center class='lastRow'>
            <button class='like' @click="likeComment(comment.commentID)">
              <p v-for="like in getLike" :key="like.commentID">
                <a v-if="like.commentID === comment.commentID && like.count">{{  like.count  }}</a>
              </p>
              <p>&nbsp;Like</p>
            </button>
            <button v-bind:id="`Reply/${comment.commentID}`" class='reply'
              @click="showReplyContainer(comment.commentID)">Reply</button>
            <button v-if='renderReplyBtn.includes(comment.commentID)' v-bind:id="`ViewReply/${comment.commentID}`"
              class='viewReply' @click="viewReply(comment.commentID)">View
              Replies</button>
          </center>
        </div>
        <div :id="`ReplyContainer/${comment.commentID}`" class="replyContainer">
          <textarea :id="`ReplyInput/${comment.commentID}`" placeholder='Reply here...' />
          <button @click="reply(comment.commentID)">Reply</button>
        </div>
        <div :id="`ViewReplyContainer/${comment.commentID}`" class="viewReplyContainer">
          <div v-for="reply in getReply" :key="reply.replyID">
            <div v-if="reply.commentID === comment.commentID" class="replyContainers">
              <div class="firstRow">
                <div class="usernameDateContainer">
                  <router-link class='username replyUsername' :to="'/profile/' + reply.id">{{  reply.username  }}
                  </router-link>
                  <a class='date replyDate'>{{  reply.createdAt.slice(0, 10)  }}</a>
                  <div class="replyDropdown">
                    <svg @click.prevent="toggleReplyDropdown(comment.commentID, reply.replyID)"
                      v-bind:id="`toggleReplyDropdownBtn/${comment.commentID}/${reply.replyID}`"
                      v-if="reply.username === username" class="svg-icon replyDropdownBtn" fill="black" width="30"
                      height="30" viewBox="0 0 20 20">
                      <path class="svg-path"
                        d="M10,2.172c-4.324,0-7.828,3.504-7.828,7.828S5.676,17.828,10,17.828c4.324,0,7.828-3.504,7.828-7.828S14.324,2.172,10,2.172M10,17.004c-3.863,0-7.004-3.141-7.004-7.003S6.137,2.997,10,2.997c3.862,0,7.004,3.141,7.004,7.004S13.862,17.004,10,17.004M10,8.559c-0.795,0-1.442,0.646-1.442,1.442S9.205,11.443,10,11.443s1.441-0.647,1.441-1.443S10.795,8.559,10,8.559 M10,10.619c-0.34,0-0.618-0.278-0.618-0.618S9.66,9.382,10,9.382S10.618,9.661,10.618,10S10.34,10.619,10,10.619 M14.12,8.559c-0.795,0-1.442,0.646-1.442,1.442s0.647,1.443,1.442,1.443s1.442-0.647,1.442-1.443S14.915,8.559,14.12,8.559 M14.12,10.619c-0.34,0-0.618-0.278-0.618-0.618s0.278-0.618,0.618-0.618S14.738,9.661,14.738,10S14.46,10.619,14.12,10.619 M5.88,8.559c-0.795,0-1.442,0.646-1.442,1.442s0.646,1.443,1.442,1.443S7.322,10.796,7.322,10S6.675,8.559,5.88,8.559 M5.88,10.619c-0.34,0-0.618-0.278-0.618-0.618S5.54,9.382,5.88,9.382S6.498,9.661,6.498,10S6.22,10.619,5.88,10.619">
                      </path>
                    </svg>
                    <svg @click.prevent="closeReplyEditMode(comment.commentID, reply.replyID)"
                      class="svg-icon closeReplyEditBtn"
                      v-bind:id="`closeReplyEditBtn/${comment.commentID}/${reply.replyID}`"
                      v-if="reply.username === username" fill="black" width="25" height="25" viewBox="0 0 20 20">
                      <path
                        d="M10.185,1.417c-4.741,0-8.583,3.842-8.583,8.583c0,4.74,3.842,8.582,8.583,8.582S18.768,14.74,18.768,10C18.768,5.259,14.926,1.417,10.185,1.417 M10.185,17.68c-4.235,0-7.679-3.445-7.679-7.68c0-4.235,3.444-7.679,7.679-7.679S17.864,5.765,17.864,10C17.864,14.234,14.42,17.68,10.185,17.68 M10.824,10l2.842-2.844c0.178-0.176,0.178-0.46,0-0.637c-0.177-0.178-0.461-0.178-0.637,0l-2.844,2.841L7.341,6.52c-0.176-0.178-0.46-0.178-0.637,0c-0.178,0.176-0.178,0.461,0,0.637L9.546,10l-2.841,2.844c-0.178,0.176-0.178,0.461,0,0.637c0.178,0.178,0.459,0.178,0.637,0l2.844-2.841l2.844,2.841c0.178,0.178,0.459,0.178,0.637,0c0.178-0.176,0.178-0.461,0-0.637L10.824,10z">
                      </path>
                    </svg>
                    <div v-bind:id="`replyDropdown/${comment.commentID}/${reply.replyID}`"
                      class="reply-dropdown-content">
                      <a @click.prevent="editReply(comment.commentID, reply.replyID)"
                        v-bind:id="`replyEdit/${reply.replyID}`">Edit</a>
                      <a class="replyDeleteBtn"
                        @click.prevent="deleteReply(reply.replyID, comment.commentID)">Delete</a>
                    </div>
                  </div>
                </div>
              </div>
              <p class='replyParagraph' v-bind:id="`replyParagraph/${comment.commentID}/${reply.replyID}`">{{
                 reply.reply  }}</p>
              <div v-bind:id="`replyEditContainer/${comment.commentID}/${reply.replyID}`" class="replyEditContainer">
                <textarea class='replyEditTextarea' :value="reply.reply"
                  v-bind:id="`replyEditTextArea/${comment.commentID}/${reply.replyID}`"></textarea><button
                  class='editReplyBtn' @click="editReplyBtn(reply.replyID, comment.commentID)">Edit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </center>
  </div>
  <div>
    <FooterComponent v-if="getComment !== null" />
  </div>
</template>
<script>
import axios from 'axios'
import { useCookies } from "vue3-cookies"
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import FooterComponent from '../components/FooterComponent.vue'
export default {
  name: 'CommentPage',
  components: {
    PulseLoader,
    FooterComponent
  },
  data() {
    return {
      username: '',
      commentInput: '',
      showBtns: false,
      getComment: null,
      getLike: [],
      getReply: [],
      renderReplyBtn: [],
      majorName: null
    }
  },
  created() {
    let self = this
    this.getMajorName(self)
    this.cookieValidation(self)
    this.initComment(self)
    this.initLike(self)
    this.initReply(self)
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
    getMajorName(self) {
      axios({
        method: "GET",
        url: `${process.env.VUE_APP_ROOT_API}/getMajorName/${this.$route.params.id}`
      }).then(function (response) {
        if (response.data.status) {
          self.majorName = response.data.message[0].name
        }
      })
    },
    cookieValidation(self) {
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
    },
    initComment(self) {
      axios({
        method: "GET",
        url: `${process.env.VUE_APP_ROOT_API}/getComment/${this.$route.params.id}`
      }).then(function (response) {
        if (response.data.status) {
          self.getComment = response.data.message
        }
      })
    },
    initLike(self) {
      axios({
        method: "GET",
        url: `${process.env.VUE_APP_ROOT_API}/getLike/${this.$route.params.id}`
      }).then(function (response) {
        if (response.data.status) {
          self.getLike = response.data.message
          let likeList = []
          for (var i = 0; i < self.getLike.length; i++) {
            let check = false
            for (var j = 0; j < likeList.length; j++) {
              if (likeList[j].commentID === self.getLike[i].commentID) {
                check = true
                likeList[j].count++
              }
            }
            if (!check) {
              likeList.push({ commentID: self.getLike[i].commentID, count: 1 })
            }
          }
          self.getLike = likeList
        }
      })
    },
    initReply(self) {
      axios({
        method: "GET",
        url: `${process.env.VUE_APP_ROOT_API}/getReply/${this.$route.params.id}`
      }).then(function (response) {
        if (response.data.status) {
          self.getReply = response.data.message
          self.findReplyComments(self.getReply)
        }
      })
    },
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
    editComment(commentID) {
      if (document.getElementById(`editTextArea/${commentID}`).value === '') {
        alert("You have not input anything yet.")
      } else {
        axios({
          method: "POST",
          url: `${process.env.VUE_APP_ROOT_API}/editComment/${commentID}`,
          headers: { 'Content-Type': 'application/json' },
          data: { comment: document.getElementById(`editTextArea/${commentID}`).value, page: this.$route.params.id }
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
    editReplyBtn(replyID, commentID) {
      if (document.getElementById(`replyEditTextArea/${commentID}/${replyID}`).value === '') {
        alert("You have not input anything yet.")
      } else {
        axios({
          method: "POST",
          url: `${process.env.VUE_APP_ROOT_API}/editReply/${replyID}`,
          headers: { 'Content-Type': 'application/json' },
          data: { reply: document.getElementById(`replyEditTextArea/${commentID}/${replyID}`).value }
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
    openCommentEdit(commentID) {
      document.getElementById(`commentDropdown/${commentID}`).classList.remove("height")
      document.getElementById(`closeEditBtn/${commentID}`).style.display = 'block'
      document.getElementById(`toggleDropdownBtn/${commentID}`).style.display = 'none'
      document.getElementById(`commetParagraph/${commentID}`).style.display = 'none'
      document.getElementById(`commentEditContainer/${commentID}`).style.display = 'flex'
    },
    closeEditMode(commentID) {
      document.getElementById(`closeEditBtn/${commentID}`).style.display = 'none'
      document.getElementById(`toggleDropdownBtn/${commentID}`).style.display = 'block'
      document.getElementById(`commetParagraph/${commentID}`).style.display = 'block'
      document.getElementById(`commentEditContainer/${commentID}`).style.display = 'none'
    },
    editReply(commentID, replyID) {
      document.getElementById(`replyDropdown/${commentID}/${replyID}`).classList.remove("height")
      document.getElementById(`closeReplyEditBtn/${commentID}/${replyID}`).style.display = 'block'
      document.getElementById(`toggleReplyDropdownBtn/${commentID}/${replyID}`).style.display = 'none'
      document.getElementById(`replyParagraph/${commentID}/${replyID}`).style.display = 'none'
      document.getElementById(`replyEditContainer/${commentID}/${replyID}`).style.display = 'flex'
    },
    closeReplyEditMode(commentID, replyID) {
      document.getElementById(`closeReplyEditBtn/${commentID}/${replyID}`).style.display = 'none'
      document.getElementById(`toggleReplyDropdownBtn/${commentID}/${replyID}`).style.display = 'block'
      document.getElementById(`replyParagraph/${commentID}/${replyID}`).style.display = 'block'
      document.getElementById(`replyEditContainer/${commentID}/${replyID}`).style.display = 'none'
    },
    deleteComment(commentID) {
      if (confirm("Are you sure you want to delete the comment?")) {
        axios({
          method: "POST",
          url: `${process.env.VUE_APP_ROOT_API}/deleteComment/${commentID}`,
          headers: { 'Content-Type': 'application/json' }
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
    deleteReply(replyID) {
      if (confirm("Are you sure you want to delete the reply?")) {
        axios({
          method: "POST",
          url: `${process.env.VUE_APP_ROOT_API}/deleteReply/${replyID}`,
          headers: { 'Content-Type': 'application/json' }
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
    toggleDropdown(commentID) {
      document.getElementById(`commentDropdown/${commentID}`).classList.toggle("height")
    },
    toggleReplyDropdown(commentID, replyID) {
      document.getElementById(`replyDropdown/${commentID}/${replyID}`).classList.toggle("height")
    },
    findReplyComments(replies) {
      let list = []
      replies.forEach(key => {
        if (!list.includes(key.commentID)) {
          list.push(key.commentID)
        }
      })
      this.renderReplyBtn = list
    },
    reply(commentID) {
      if (this.username === '' || this.username === null) {
        alert("Sign in please.")
      }
      else if (document.getElementById(`ReplyInput/${commentID}`).value === '') {
        alert("Please type in longer than a character.")
      }
      else {
        axios({
          method: "POST",
          url: `${process.env.VUE_APP_ROOT_API}/postReply/${commentID}`,
          headers: { 'Content-Type': 'application/json' },
          data: { username: this.username, reply: document.getElementById(`ReplyInput/${commentID}`).value, page: this.$route.params.id }
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
    comment() {
      if (this.username === '' || this.username === null) {
        alert("Sign in please.")
      } else if (this.commentInput === '') {
        alert("Please type in longer than a character.")
      } else {
        axios({
          method: "POST",
          url: `${process.env.VUE_APP_ROOT_API}/postComment/${this.$route.params.id}`,
          headers: { 'Content-Type': 'application/json' },
          data: { comment: this.commentInput, username: this.username }
        }).then(function (response) {
          if (response.data.status) {
            alert("You have successfully commented.")
            window.location.reload()
          }
        })
      }
    },
    likeComment(commentID) {
      if (this.username === '' || this.username === null) {
        alert("Sign in please.")
      } else {
        axios({
          method: "POST",
          url: `${process.env.VUE_APP_ROOT_API}/postLike/${commentID}`,
          headers: { 'Content-Type': 'application/json' },
          data: { page: this.$route.params.id, username: this.username }
        }).then(function (response) {
          if (response.data.status) {
            alert(response.data.message)
            window.location.reload()
          }
        })
      }
    },
    showReplyContainer(commentID) {
      if (document.getElementById(`Reply/${commentID}`).innerText === 'Reply') {
        document.getElementById(`Reply/${commentID}`).innerText = 'Close'
        document.getElementById(`ReplyContainer/${commentID}`).style.display = 'flex'
      } else {
        document.getElementById(`Reply/${commentID}`).innerText = 'Reply'
        document.getElementById(`ReplyContainer/${commentID}`).style.display = 'none'
      }
    },
    viewReply(commentID) {
      if (document.getElementById(`ViewReplyContainer/${commentID}`).style.display === 'block') {
        document.getElementById(`ViewReplyContainer/${commentID}`).style.display = 'none'
        document.getElementById(`ViewReply/${commentID}`).innerText = 'View Replies'
      } else {
        document.getElementById(`ViewReplyContainer/${commentID}`).style.display = 'block'
        document.getElementById(`ViewReply/${commentID}`).innerText = 'Close Replies'
      }
    }
  }
}
</script>
<style scoped>
@import '../assets/styles/comment.css';
</style>