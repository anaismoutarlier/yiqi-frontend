import { useContext, useState, useEffect } from 'react'

//STYLES______________________
import { defaultstyles } from "../styles"

//HELPER FUNCTIONS___________________
import combineStyles from '../helpers/combineStyles'

//CONTEXT_______________________
import { ThemeContext } from '../hooks/theme-context'
import { MediaContext } from '../hooks/media-context'

//NAVIGATION____________________
import { useParams } from 'react-router-dom';

//REDUX________________________
import { useSelector, useDispatch } from "react-redux"

//SOCKETS_________________
import { joinBoard, joinAll, leaveBoard, leaveAll } from '../sockets'

//COMPONENTS___________________
import Nav from "../components/Nav"
import MobileNav from '../components/MobileNav'
import Pin from '../components/Pin'
import Sider from "../components/Sider"

//UI___________________________
import { Icon } from "@mdi/react"
import { mdiViewDashboardOutline} from '@mdi/js';

export default function Board() {
    //CONTEXT__________________
    const media = useContext(MediaContext)
    const { theme } = useContext(ThemeContext)

    //PARAMS__________________
    const { id } = useParams()

    //STORE____________________
    const user = useSelector(({ user }) => user)
    const dispatch = useDispatch()
    

    //STATE_____________________
    const [board, setBoard] = useState(null)

    //EFFECTS_____________________
    useEffect(() => {
        console.log(id)
        const fetchBoard = async () => {
            const data = await fetch(`${global.BACKEND}/boards/${id}/${user._id}`)
            const json = await data.json()
            console.log({ json })
            if (json.result) {
                joinBoard({ boardId: id, userId: user.token })
                setBoard(json.board)
            }
        }

        if (id) fetchBoard()
    }, [user, id])

    useEffect(() => {
        if(global.SOCKET) {
            global.SOCKET.on('user joined', data => console.log(data))
            global.SOCKET.on('newPin', newPin)
            global.SOCKET.on('timeoutPin', deletePin)
            global.SOCKET.on('disconnect', data => console.log("disconnect", data))
        }

        return () => {
            if (global.SOCKET) {
                console.log("in return")
                // if (type === 'user') leaveAll({ boards: userBoards })
                // else if (type === 'public' && user) leaveBoard({ board: id, userId: user.token })

                global.SOCKET.off('newPin', newPin)
                global.SOCKET.off('user joined', data => console.log(data))
                global.SOCKET.off('timeoutPin', deletePin)
            }
        }
    }, [])

    //FUNCTIONS___________________
    const newPin = pin => {
        console.log(pin, board)
        if (board && pin && pin.boards.includes(board._id)) {
            let temp = { ...board }
            if (!temp.pins.find(e => e._id === pin._id)) temp.pins.unshift(pin)

            setBoard(temp)
        }
    }

    const deletePin = pinId => {
        if (board && pinId) {
            let temp = { ...board }
            temp.pins = temp.pins.filter(e => String(e._id) !== pinId )

            setBoard(temp)
        }
    }

    const { mobile_nav_page, nav_page, menu_header, subtitle } = defaultstyles
    const { container, pin_container } = styles
    const background = combineStyles(container, { background: `url(${user?.preferences?.background})`, backgroundPosition: "cover" })
    
    return (
        <div style={ media === "desktop" ? nav_page : mobile_nav_page }>
            {
                media === "desktop"
                ? <Nav />
                : <MobileNav />
            }
            <div style={ background }>
                <Sider>
                    <div style={ combineStyles(menu_header, { borderBottom: `1px solid ${theme.foreground.color}`}) }>
                        <Icon
                            path={ mdiViewDashboardOutline }
                            size={ 0.8 }
                            color={ theme.foreground.color }
                            style={{ marginRight: 5 }}
                        />
                        <h2 style={ combineStyles(subtitle, theme.foreground) }>{ board?.name || null }</h2>
                    </div>
                </Sider>
                <div style={ pin_container }>
                    { board?.pins.length > 0 && board.pins.map((e, i) => <Pin pin={ e } key={ e.id } index={ i } />) }
                </div>
            </div>
        </div>
    )
}

const styles = {
    container: {
        display: "grid",
        boxSizing: 'border-box',
        height: '100%',
        maxHeight: '100%',
        gridTemplateColumns: 'auto 1fr'
    },
    pin_container: {
        display: 'grid',
        gridTemplateColumns: "repeat(auto-fill, 340px)",
        gridTemplateRows: "repeat(auto-fill, 180px)",
        paddingTop: 40,
        paddingLeft: 20
    }
}