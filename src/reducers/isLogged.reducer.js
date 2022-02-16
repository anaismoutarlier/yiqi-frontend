/* eslint-disable import/no-anonymous-default-export */
export default (isLogged = false, action) => {
    if (action.type === 'setIsLogged') {
        return action.isLogged
    } else {
        return isLogged
    }
}