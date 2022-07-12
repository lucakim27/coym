<template>
    <footer>
        <div>
            <h1>Comment On Your Major</h1>
            <a href="mailto:nikolaikim27@gmail.com">nikolaikim27@gmail.com</a>
            <p>Copyright &copy; 2022 COYM</p>
        </div>
    </footer>
</template>
<script>
export default {
    name: 'FooterComponent',
};
</script>
<style scoped>
footer {
    text-align: center;
    padding: 10px;
    width: 100%;
    margin-left: -10px;
    margin-bottom: -10px;
    height: 500px;
    background-color: black;
}

footer div {
    position: relative;
    top: 30%;
}

footer a {
    font-size: 20px;
}

footer p,
footer h1 {
    color: white;
}
</style>