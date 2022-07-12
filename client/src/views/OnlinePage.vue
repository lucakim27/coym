<template>
  <div id='container'>
    <table class="table" id="onlineTable" border="1">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Username</th>
          <th scope="col">Major</th>
          <th scope="col">Country</th>
          <th scope="col">Online</th>
        </tr>
      </thead>
      <tbody>
        <tr></tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: 'OnlinePage',
};
</script>
<style scoped>
#onlineTable {
  margin: 20px;
  width: 80%;
  position: absolute;
  top: 50px;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;
}

#container {
  height: 1100px;
  text-align: center;
}
</style>