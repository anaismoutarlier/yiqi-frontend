/* eslint-disable import/no-anonymous-default-export */
export default (mask = false, action) => {
    if (action.type === 'toggleMask') {
        return action.mask
    } else {
        return mask
    }
}