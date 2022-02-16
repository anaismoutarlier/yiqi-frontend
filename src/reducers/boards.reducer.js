/* eslint-disable import/no-anonymous-default-export */
export default (boards = [], action) => {
    if (action.type === 'loadBoards') {
        return action.boards
    } else if (action.type === 'modifyBoard') {
        return [ ...boards.filter(e => e._id !== action.board._id), action.board ]
    } else {
        return boards
    }
}