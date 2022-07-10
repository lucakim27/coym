<template>
  <div style="display: none" id="onlineUsers">HEESU</div>
  <div style="height: 1100px; text-align: center;">
    <h1 id="header" class="waviy">
      <span style="--i: 0">O</span>
      <span style="--i: 1">n</span>
      <span style="--i: 2">l</span>
      <span style="--i: 3">i</span>
      <span style="--i: 4">n</span>
      <span style="--i: 5">e</span>
    </h1>
    <hr />
    <table class="table" id="myTable" border="1" style="margin: 20px; width: 80%; position: absolute; top: 10; margin-left: auto; margin-right: auto; left: 0; right: 0; text-align: center;">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Username</th>
          <th scope="col">Major</th>
          <th scope="col">Country</th>
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