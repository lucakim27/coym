<template>
    <div class='container'>
        <div class='BothContainer'>
            <div class='mostViewedContainer'>
                <h2>Users</h2>
                <div class='eachRow' v-for="user in users" :key="user">
                    <p>{{ user }}</p>
                </div>
            </div>
            <div class='mostCommentedContainer'>
                <div class='eachRow' v-for="(msg, index) in messages" :key="index">
                    <p>{{ msg.user }}: {{ msg.message }}</p>
                </div>

                <form class="input" @submit.prevent="sendMessage">
                    <input type="text" placeholder="Enter your chat..." v-model="message">
                    <button type="submit">Send</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import io from 'socket.io-client';
export default {
    data() {
        return {
            user: '',
            message: '',
            users: ['user1', 'user2', 'user3'],
            messages: [],
            socket: io('localhost:3001', {
                transports: ['websocket']
            })
        }
    },
    methods: {
        sendMessage(e) {
            e.preventDefault();
            this.socket.emit('SEND_MESSAGE', {
                user: this.user,
                message: this.message
            })
            this.message = ''
        }
    },
    mounted() {
        this.socket.on('MESSAGE', (data) => {
            this.messages = [...this.messages, data]
        })
    }
}
</script>

<style scoped>
.mostCommentedContainer .input {
    position: absolute;
    bottom: 3%;
    left: 0;
    right: 0;
    border-radius: 5px;
}

.mostCommentedContainer .input input {
    width: 70%;
    padding: 12px 20px;
    margin: 8px;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-sizing: border-box;
}

.mostCommentedContainer .input button {
    width: 20%;
    padding: 12px 20px;
    margin: 8px;
    display: inline-block;
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.478);
    color: white;
}

.container {
    text-align: center;
}

.BothContainer {
    display: flex;
    padding: 10px;
    justify-content: center;
}

.mostViewedContainer {
    height: 83vh;
    min-width: 20%;
    flex: 0;
    padding: 10px;
    margin: 10px;
    border-radius: 10px;
    background: rgb(146, 156, 161);
    overflow-y: scroll;
}

.mostViewedContainer h2 {
    color: white;
}

.mostCommentedContainer {
    height: 83vh;
    min-width: 60%;
    flex: 0;
    margin: 10px;
    padding: 10px;
    border-radius: 10px;
    background: rgb(146, 156, 161);
    overflow-y: scroll;
    position: relative;
    text-align: center;
}

.eachRow {
    background: rgb(89, 95, 98);
    border-radius: 10px;
}

.eachRow p {
    padding: 20px;
    color: white;
}

.eachRow p a {
    color: rgb(255, 255, 255);
    text-decoration: none;
}

.eachRow p a:hover {
    color: rgb(98, 203, 255);
}
</style>