export const joinBoard = data => {
    global.SOCKET.emit('joinBoard', data)
}