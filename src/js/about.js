try {
    if ($('#signIn').html() === 'Sign in') {
    } else {
        socket.emit('addOnlineUser', getCookie('current-user'))
    }
} catch (error) {
    console.error(error);
}