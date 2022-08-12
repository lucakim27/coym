<template>
  <div id='container'>
    <div id="ipnutContainer" v-show='loggedIn'>
      <textarea height="60" type="text" id="userInput" v-model="commentInput" placeholder="Comment here..."
        @focus="magic_flag = true"></textarea><br>
      <button @click="comment()" id="commentBtn" v-show="magic_flag">Comment</button>
      <button @click="magic_flag = !magic_flag" class="closeBtn" v-show="magic_flag">Close</button>
    </div>
    <center id="commentDiv">
      <div v-for="comment in getComment" :key="comment.comment" class='eachCommentDiv'
        :id="comment.comment + 'Container'">
        <div class="firstRow">
          <div class="usernameDateContainer">
            <a class='username '>{{ comment.username }}</a>
            <p class='date'>{{ comment.createdAt.slice(0, 10) }}</p>
          </div>
          <div class="commentDropdown">
            <svg @click.prevent="toggleDropdown(comment.comment)" v-bind:id="comment.comment + 'toggleDropdownBtn'"
              v-if="comment.username === username" class="svg-icon" fill="white" width="40" height="40"
              viewBox="0 0 20 20">
              <path
                d="M10,2.172c-4.324,0-7.828,3.504-7.828,7.828S5.676,17.828,10,17.828c4.324,0,7.828-3.504,7.828-7.828S14.324,2.172,10,2.172M10,17.004c-3.863,0-7.004-3.141-7.004-7.003S6.137,2.997,10,2.997c3.862,0,7.004,3.141,7.004,7.004S13.862,17.004,10,17.004M10,8.559c-0.795,0-1.442,0.646-1.442,1.442S9.205,11.443,10,11.443s1.441-0.647,1.441-1.443S10.795,8.559,10,8.559 M10,10.619c-0.34,0-0.618-0.278-0.618-0.618S9.66,9.382,10,9.382S10.618,9.661,10.618,10S10.34,10.619,10,10.619 M14.12,8.559c-0.795,0-1.442,0.646-1.442,1.442s0.647,1.443,1.442,1.443s1.442-0.647,1.442-1.443S14.915,8.559,14.12,8.559 M14.12,10.619c-0.34,0-0.618-0.278-0.618-0.618s0.278-0.618,0.618-0.618S14.738,9.661,14.738,10S14.46,10.619,14.12,10.619 M5.88,8.559c-0.795,0-1.442,0.646-1.442,1.442s0.646,1.443,1.442,1.443S7.322,10.796,7.322,10S6.675,8.559,5.88,8.559 M5.88,10.619c-0.34,0-0.618-0.278-0.618-0.618S5.54,9.382,5.88,9.382S6.498,9.661,6.498,10S6.22,10.619,5.88,10.619">
              </path>
            </svg>
            <svg @click.prevent="closeEditMode(comment.comment)" class="svg-icon closeEditBtn"
              v-bind:id="comment.comment + 'closeEditBtn'" v-if="comment.username === username" fill="white" width="35"
              height="35" viewBox="0 0 20 20">
              <path
                d="M10.185,1.417c-4.741,0-8.583,3.842-8.583,8.583c0,4.74,3.842,8.582,8.583,8.582S18.768,14.74,18.768,10C18.768,5.259,14.926,1.417,10.185,1.417 M10.185,17.68c-4.235,0-7.679-3.445-7.679-7.68c0-4.235,3.444-7.679,7.679-7.679S17.864,5.765,17.864,10C17.864,14.234,14.42,17.68,10.185,17.68 M10.824,10l2.842-2.844c0.178-0.176,0.178-0.46,0-0.637c-0.177-0.178-0.461-0.178-0.637,0l-2.844,2.841L7.341,6.52c-0.176-0.178-0.46-0.178-0.637,0c-0.178,0.176-0.178,0.461,0,0.637L9.546,10l-2.841,2.844c-0.178,0.176-0.178,0.461,0,0.637c0.178,0.178,0.459,0.178,0.637,0l2.844-2.841l2.844,2.841c0.178,0.178,0.459,0.178,0.637,0c0.178-0.176,0.178-0.461,0-0.637L10.824,10z">
              </path>
            </svg>
            <div v-bind:id="comment.comment + 'commentDropdown'" class="comment-dropdown-content">
              <a @click.prevent="toggleDropdown(comment.comment)">Close</a>
              <a @click.prevent="editComment(comment.comment)" v-bind:id="comment.comment + 'edit'">Edit</a>
              <a @click.prevent="deleteComment(comment.comment)">Delete</a>
            </div>
          </div>
        </div>
        <p class='comment' v-bind:id="comment.comment + 'commetParagraph'">{{ comment.comment }}</p>
        <div v-bind:id="comment.comment + 'commentEditContainer'" class="editContainer">
          <textarea class='commentEditTextarea' :value="comment.comment" v-bind:id="comment.comment + 'editTextArea'"></textarea><button class='editBtn'
            @click="edit(comment.comment)">Edit</button>
        </div>
        <div class='likeAndReplyContainer'>
          <center class='lastRow'>
            <button v-bind:id="comment.comment" class='like' @click="like(comment.comment)">0 Likes</button>
            <button v-bind:id="comment.comment + 'Reply'" class='reply' v-if="loggedIn"
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
export default {
  props: ["pass_data"],
  name: 'CommentPage',
  data() {
    return {
      username: '',
      commentInput: '',
      magic_flag: false,
      getComment: [],
      getLike: [],
      getReply: [],
      renderReplyBtn: []
    }
  },
  beforeMount() {
    let self = this
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
  computed: {
    loggedIn() {
      if (this.username === '' || this.username === null) {
        return false
      } else {
        return true
      }
    }
  },
  mounted() {
    // this.username = this.pass_data
    setTimeout(() => {
        this.username = this.pass_data
        // this.getUserDetails()
    }, "300")
  },
  methods: {
    edit(comment) {
      // alert(document.getElementById(comment + 'editTextArea').value)
      axios({
        method: "POST",
        url: "https://proxy11112321321.herokuapp.com/https://coym-api.herokuapp.com/editComment",
        // url: "http://localhost:3000/editComment",
        headers: { 'Content-Type': 'application/json' },
        data: { comment: document.getElementById(comment + 'editTextArea').value, previousComment: comment, username: this.username, page: this.getQueryVariable() }
      }).then(function (response) {
        if (response.data.status) {
          alert("You have successfully edited your comment.")
          window.location.reload()
        } else {
          alert("You failed to edit your comment for some reasons.")
        }
      })
    },
    editComment(comment) {
      document.getElementById(comment + 'commentDropdown').style.display = 'none'
      document.getElementById(comment + 'closeEditBtn').style.display = 'block'
      document.getElementById(comment + 'toggleDropdownBtn').style.display = 'none'
      document.getElementById(comment + 'commetParagraph').style.display = 'none'
      document.getElementById(comment + 'commentEditContainer').style.display = 'flex'
    },
    closeEditMode(comment) {
      document.getElementById(comment + 'closeEditBtn').style.display = 'none'
      document.getElementById(comment + 'toggleDropdownBtn').style.display = 'block'
      document.getElementById(comment + 'commetParagraph').style.display = 'block'
      document.getElementById(comment + 'commentEditContainer').style.display = 'none'
    },
    deleteComment(comment) {
      if (confirm(`Are you sure you want to delete the comment which is '${comment}'?`)) {
        axios({
          method: "POST",
          url: "https://proxy11112321321.herokuapp.com/https://coym-api.herokuapp.com/deleteComment",
          // url: "http://localhost:3000/deleteComment",
          headers: { 'Content-Type': 'application/json' },
          data: { comment: comment, username: this.username, page: this.getQueryVariable() }
        }).then(function (response) {
          if (response.data.status) {
            alert("You have successfully deleted your comment.")
            window.location.reload()
          } else {
            alert("You failed to delete your comment for some reasons.")
          }
        })
      }
    },
    toggleDropdown(comment) {
      if (document.getElementById(comment + 'commentDropdown').style.display !== 'block') {
        document.getElementById(comment + 'commentDropdown').style.display = 'block'
      } else {
        document.getElementById(comment + 'commentDropdown').style.display = 'none'
      }
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
      if (document.getElementById(comment + 'ReplyInput').value === '') {
        alert("You have not input anything yet.")
        return 0
      } else if (this.username === '' || this.username === null) {
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
      if (this.username === '' || this.username === null) {
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
      }, "300")
    }
  }
}
</script>
<style scoped>
@import '../assets/styles/comment.css';
</style>