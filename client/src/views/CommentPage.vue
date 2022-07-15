<template>
  <div id='container'>
    <div id="ipnutContainer">
      <input type="text" id="userInput" placeholder="Comment here..." />
      <button id="commentBtn">></button>
    </div>
    <table class="table" id="commentTable" border="1"></table>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  name: 'CommentPage',
  data() {
    return {

    }
  },
  mounted() {
    axios({
      method: "GET",
      url: "http://localhost:3000/getComment",
      params: {
        page: this.getQueryVariable()
      }
    }).then(function (response) {
      if (response.data.status) {
        console.log(response.data.message)
        


        for (var i = 0; i < response.data.message.length; i++) {
          // document.getElementById('commentTable').querySelector('tbody').append("<tr>" + response.data.message[i].comment + "</tr>")
          var table = document.getElementById("commentTable")
          var row = table.insertRow(0)
          var cell1 = row.insertCell(0)
          var cell2 = row.insertCell(1)
          var cell3 = row.insertCell(2)
          var cell4 = row.insertCell(3)
          var cell5 = row.insertCell(4)
          cell1.innerHTML = response.data.message[i].username
          cell2.innerHTML = response.data.message[i].comment
          cell3.innerHTML = response.data.message[i].date
          cell4.innerHTML = "<button>Likes</button>"
          cell5.innerHTML = "<button>Replies</button>"
        }


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
    }
  }
}
</script>
<style scoped>
#commentTable {
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

tbody tr {
    padding: 10px;
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