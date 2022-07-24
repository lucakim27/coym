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
@import '../assets/styles/chat.css';
</style>