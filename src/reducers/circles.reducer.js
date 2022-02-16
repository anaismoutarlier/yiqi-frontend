// eslint-disable-next-line import/no-anonymous-default-export
export default (circles = [], action) => {
    const { type, circles: newCircles } = action

    if (type === "setCircleList") {
        return newCircles
    } else {
        return circles
    }
}