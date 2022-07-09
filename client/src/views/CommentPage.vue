<template>
  <div>
    <center style="height: 1100px">
      <h1>{{getQueryVariable('major')}}</h1>
      <hr />
      <div id="inputAndCommentBtn">
        <input type="text" id="userInput" placeholder="Comment here..." />
        <button id="commentBtn">></button>
      </div>
      <table class="table" id="myTable" border="1" style="margin: 20px; width: 90%">
        <thead>
          <tr>
            <th scope="col">Username</th>
            <th scope="col">Comment</th>
            <th scope="col">Date</th>
            <th scope="col">Likes</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr></tr>
        </tbody>
      </table>
      <hr />
    </center>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  name: 'CommentPage',
  data() {
    return {
      items: []
    }
  },
  async created() {
    try {
      const respond = await axios.get(`http://localhost:3000/items`);
      this.items = respond.data;
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    getQueryVariable: function (variable) {
      var query = window.location.search.substring(1)
      var vars = query.split('&')
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=')
        if (decodeURIComponent(pair[0]) == variable) {
          if (decodeURIComponent(pair[1]).includes('+') == false) {
            return decodeURIComponent(pair[1])
          } else {
            return decodeURIComponent(pair[1].replaceAll('+', ' '))
          }
        }
      }
    }
  }
};
</script>