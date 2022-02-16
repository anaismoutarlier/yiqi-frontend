export const leaveAll = data => {
    global.SOCKET.emit('leaveAll', data)
}