<template>
    <div>
        <header style="height: 10px">
            <span style="font-size: 40px; margin-left: 10px; cursor: pointer" v-on:click="sidebarOpen()">&#9776;</span>
            <!--            
                <div id="userId" style="width: 100px; margin-right: -90px">
                    <a href="/login" id="signIn">Sign in</a>
                </div> 
            -->

            <svg style="cursor: pointer; position: absolute; right: 15px; top: 10px" data-toggle="modal"
                data-target="#myModal" xmlns="http://www.w3.org/2000/svg" width="44" height="44" fill="currentColor"
                class="bi bi-person-circle" viewBox="0 0 16 16">
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                <path fill-rule="evenodd"
                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
            </svg>

        </header>
    </div>
</template>
<script>
export default {
    name: 'HeaderComponent',
    
    methods: {
        sidebarOpen: function () {
            document.getElementById("mySidenav").style.width = "250px"
        }
    }
};
</script>