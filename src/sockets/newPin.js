export const newPin = data => {
    console.log({data})
    global.SOCKET.emit('newPin', data)
}