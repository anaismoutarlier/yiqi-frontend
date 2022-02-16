export const leaveBoard = data => {
    global.SOCKET.emit('leaveBoard', data)
}