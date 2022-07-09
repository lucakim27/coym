<template>
  <div>
    <center style="height: 1100px">
      <h1 id="majorTitle"></h1>
      <hr />
      <div id="inputAndCommentBtn">
        <input type="text" id="userInput" placeholder="Comment here..." />
        <button id="commentBtn">></button>
      </div>
      <table
        class="table"
        id="myTable"
        border="1"
        style="margin: 20px; width: 90%"
      >
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
export default {
  name: 'LoginPage',
};
</script>