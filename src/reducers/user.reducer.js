/* eslint-disable import/no-anonymous-default-export */
export default (user = null, action) => {
    if (action.type === 'loginUser' || action.type === 'modifyUser') {
        return action.user
    } else if (action.type === 'logoutUser') {
        return null
    } else {
        return user
    }
}