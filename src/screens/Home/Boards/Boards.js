import { useState, useEffect } from 'react'
import '../../../App.css'

//REDUX___________________________________
import { useSelector, useDispatch } from 'react-redux'

//UI___________________________
import { mdiHeartOutline, mdiAccountOutline, mdiBlurRadial } from '@mdi/js';

//COMPONENTS______________________
import Category from './Category'

export default function Boards() {
    //STATE HOOKS____________________________
    const [selectedTabs, setSelectedTabs] = useState(['favorites'])

    //STORE__________________________________
    const { user, boards, userCircle, circles } = useSelector(({ user, boards, userCircle, circles }) => ({ user, boards, userCircle, circles }))
    const dispatch = useDispatch()

    //EFFECT HOOKS______________________________
    useEffect(() => {
        const fetchBoards = async () => {
            let data = await fetch(`${global.BACKEND}/boards/userboards/${user._id}`)
            let { result, boards } = await data.json()

            if (result) {
                dispatch({ type: "loadBoards", boards })
            }
        }
        
        if (user) {
            fetchBoards()
        }
    }, [user])

    //FUNCTIONS_______________________________
    const setSelected = tab => selectedTabs.includes(tab) ? setSelectedTabs(selectedTabs.filter(e => e !== tab)) : setSelectedTabs([ ...selectedTabs, tab ])
    
    const sortBoards = (a, b) => (a.isActive && !b.isActive) ? -1
        : (b.isActive && !a.isActive) ? 1
        : 0

    const favorite = async (board, isFavorite) => {
        let endpoint;
        let options = {}

        if (isFavorite) {
            endpoint = `/boards/favorite`
            options = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token: user.token, boardId: board._id })
            }
        } else {
            endpoint = `/boards/favorite/${user.token}/${board._id}`
            options = {
                method: "DELETE"
            }
        }
        
        if (endpoint) {
            const data = await fetch(`${global.BACKEND}${endpoint}`, options)
            const { result } = await data.json()
    
            if (result) {
                let tempUser = { ...user }
                if (isFavorite) tempUser.favorites.push(board._id)
                else tempUser.favorites = tempUser.favorites.filter(e => e !== board._id)

                let temp = [ ...boards ]
    
                let index = temp.findIndex(e => e._id === board._id)
                temp[index].isFavorite = isFavorite

                dispatch({ type: "modifyUser", user: tempUser })
                dispatch({ type: "loadBoards", boards: temp })
            }
        }
    }

    const { page_container, wrapper } = styles

    return (
        <div style={ wrapper }>
            <Category 
            title="FAVORIS" 
            icon={ mdiHeartOutline } 
            isSelected={ selectedTabs.includes("favorites") } 
            setSelected={ setSelected } 
            boards={ boards.filter(e => e.isFavorite) }
            name="favorites"
            favorite={ favorite } />
            <Category 
            title="PERSO" 
            icon={ mdiAccountOutline } 
            isSelected={ selectedTabs.includes('personal') } 
            setSelected={ setSelected }  
            boards={ boards.filter(e => e.circles.map(e => e._id).includes(userCircle._id)).sort(sortBoards) }
            name="personal"
            favorite={ favorite } />
            {
                circles.filter(e => e._id !== userCircle._id).map((e, i) => 
                    <Category
                    title={ e.name.toUpperCase() }
                    icon={ mdiBlurRadial } 
                    isSelected={ selectedTabs.includes(e._id) }
                    setSelected={ setSelected }
                    boards={ boards.filter(board => board.circles.map(circle => circle._id).includes(e._id)).sort(sortBoards) }
                    name={ e._id }
                    favorite={ favorite }
                    />
                )
            }
        </div>
    )
}

const styles = {
    page_container: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'scroll',
        maxHeight: '100vh',
        width: '100%',
        padding: 30
    },
    wrapper: {
        height:'100%',
        maxHeight: '100%',
        margin: "30px",
        boxSizing: "border-box",
    }
}