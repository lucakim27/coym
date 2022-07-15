<template>
    <div id='container'>
        <div id='BothContainer'>
            <div id='mostViewedContainer'>
                <h1>Most Visited Pages</h1>
                <hr />
                <canvas id="mostViewedPages"></canvas>
            </div>
            <div id='mostCommentedContainer'>
                <h1>Most Commented Pages</h1>
                <hr />
                <canvas id="mostCommentedPages"></canvas>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ChartPage',
};
</script>
<style scoped>
#container {
    height: 1100px;
    margin-top: 100px;
    text-align: center;
}

#BothContainer {
    display: flex;
    padding: 10px;
    /* margin-top: 40px; */
    justify-content: center;
}

#mostViewedContainer {
    height: 83vh;
    min-width: 40%;
    flex: 0;
    border-style: solid;
    padding: 10px;
    margin-right: 30px;
    border-radius: 5px;
}

#mostCommentedContainer {
    height: 83vh;
    min-width: 40%;
    flex: 0;
    border-style: solid;
    padding: 10px;
    margin-left: 30px;
    border-radius: 5px;
}

#mostViewedPages,
#mostCommentedPages {
    max-width: 90%;
}
</style>