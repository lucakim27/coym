<template>
  <div id='container'>
    <div id="ipnutContainer">
      <input type="text" id="userInput" placeholder="Comment here..." />
      <button id="commentBtn">></button>
    </div>
    <table class="table" id="myTable" border="1">
      <thead>
        <tr>
          <th scope="col">Username</th>
          <th scope="col">Comment</th>
          <th scope="col">Date</th>
          <th scope="col">Likes</th>
          <th scope="col">Replies</th>
        </tr>
      </thead>
      <tbody>
        <tr></tr>
      </tbody>
    </table>
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
      const respond = await axios.get(`http://localhost:3000/items`)
      this.items = respond.data
    } catch (error) {
      console.log(error)
    }
  },
  methods: {

  }
}
</script>
<style scoped>
#myTable {
  margin: 20px;
  width: 80%;
  position: absolute;
  top: 10;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;
}
#commentBtn {
  background-color: rgb(54, 153, 207);
  cursor: pointer;
  border-radius: 5px;
  color: white;
  font-size: 20px;
  width: 90px;
}
#userInput {
  border-radius: 5px;
  text-align: center;
  width: 400px;
  font-size: 20px;
}
#container {
  height: 1100px;
  text-align: center;
}
#ipnutContainer {
  margin-top: 100px;
}
</style>