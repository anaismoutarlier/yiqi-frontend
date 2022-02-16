export const joinAll = data => {
    global.SOCKET.emit('joinAll', data)
}