<template>
    <div>
        <div style="height: 1100px; text-align: center;">
            <h1 id="header" class="waviy">CHART</h1>
            <hr />
            <div style="
          display: flex;
          padding: 10px;
          margin-top: 40px;
          justify-content: center;
        ">
                <div style="
            height: 83vh;
            min-width: 40%;
            flex: 0;
            border-style: solid;
            padding: 10px;
            margin-right: 30px;
            border-radius: 5px;
          ">
                    <h1>Most Visited Pages</h1>
                    <hr />
                    <canvas id="mostViewedPages" style="max-width: 90%"></canvas>
                </div>
                <div style="
            height: 83vh;
            min-width: 40%;
            flex: 0;
            border-style: solid;
            padding: 10px;
            margin-left: 30px;
            border-radius: 5px;
          ">
                    <h1>Most Commented Pages</h1>
                    <hr />
                    <canvas id="mostCommentedPages" style="max-width: 90%"></canvas>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ChartPage',
};
</script>