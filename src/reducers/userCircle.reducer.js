// eslint-disable-next-line import/no-anonymous-default-export
export default (circle = {}, action) => {
    const { type, circle: newCircle } = action

    if (type === 'setUserCircle') {
        return newCircle
    } else {
        return circle
    }
}