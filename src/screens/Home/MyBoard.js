import { useEffect, useState, useContext } from 'react'
import "./home.css"

//STYLES___________________________
import { defaultstyles } from '../../styles'

//REDUX___________________________
import { useSelector } from 'react-redux'

//HELPER FUNCTIONS___________________
import combineStyles from '../../helpers/combineStyles'

//COMPONENTS_________________________
import Pin from '../../components/Pin'
import Sider from "../../components/Sider"

//SCROLL___________________________
// import SimpleBar from "simplebar-react"

//CONTEXT___________________
import { ThemeContext } from '../../hooks/theme-context'

//UI___________________________
import { Icon } from "@mdi/react"
import { mdiWeatherSunset, mdiWeatherSunny, mdiWeatherNight } from '@mdi/js';

//SOCKETS_________________
import { joinAll, leaveAll } from '../../sockets'

export default function MyBoard() {
    //CONTEXT___________________________
    const { theme } = useContext(ThemeContext)

    //STORE_______________________
    const user = useSelector(({ user }) => user)

    //STATE_______________________
    const [board, setBoard] = useState(null)
    const [sunData, setSunData] = useState({ sunset: 19, sunrise: 6 })
    const [userBoards, setUserBoards] = useState([])

    const time = new Date().getHours()

    //EFFECTS_____________________
    useEffect(() => {
        const fetchUserBoard = async () => {
            const data = await fetch(`${global.BACKEND}/pins/all/${user.token}`)
            const { result, board, boards } = await data.json()
            if (result) {
                joinAll({ boards, userId: user.token })
                setUserBoards(boards)
                setBoard(board)
            }
        }

        fetchUserBoard()
    }, [user])

    useEffect(() => {
        const getSunData = async() => {
            try {
                const data = await fetch('https://api.sunrise-sunset.org/json?lat=46.2276%lng=2.2137&formatted=0')
                const { status, results: { sunset, sunrise }} = await data.json()

                if (status === 'OK') {
                    setSunData({ sunset: new Date(sunset).getHours(), sunrise: new Date(sunrise).getHours() })
                }
            } catch (error) {
                console.error(error)
            }
        }
        getSunData()
    }, [])

    useEffect(() => {
        if(global.SOCKET) {
            global.SOCKET.on('user joined', data => console.log(data))
            global.SOCKET.on('newPin', newPin)
            global.SOCKET.on('timeoutPin', deletePin)
            global.SOCKET.on('disconnect', data => console.log("disconnect", data))
        }

        return () => {
            global.SOCKET.off('user joined', data => console.log(data))
            global.SOCKET.off('newPin', newPin)
            global.SOCKET.off('timeoutPin', deletePin)
            global.SOCKET.off('disconnect', data => console.log("disconnect", data))
            leaveAll({ boards: userBoards })
        }
    })

    //FUNCTIONS_________________________________
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

    const { subtitle, menu_header } = defaultstyles
    const { container, board: boardStyle } = styles

    const weatherIcon = time === sunData.sunrise || time === sunData.sunset ? mdiWeatherSunset : time > sunData.sunrise && time < sunData.sunset ? mdiWeatherSunny : mdiWeatherNight
    
    return (
        <div style={ container }>
            <Sider>
                <div style={ combineStyles(menu_header, { borderBottom: `1px solid ${theme.foreground.color}`}) }>
                    <Icon
                    path={ weatherIcon }
                    size={ 0.8 }
                    color={ theme.foreground.color }
                    style={{ marginRight: 5 }}
                    />
                    <h2 style={ combineStyles(subtitle, theme.foreground) }><span>{ time > 7 && time < 17 ? "Bonjour" : "Bonsoir" }</span>, Anaïs!</h2>
                </div>
            </Sider>
            <div style={ combineStyles(boardStyle, { background: `url(${user.preferences.background})`, backgroundPosition: "cover" }) }>
                {/* <SimpleBar id="board-scroll" style={ { height: '100%', width: '100%' } }> */}
                    { board?.pins.length > 0 && board.pins.map((e, i) => <Pin pin={ e } key={ i } />) }
                {/* </SimpleBar> */}
            </div>
        </div>
    )
}

const styles = {
    container: {
        display: "grid",
        boxSizing: 'border-box',
        height: '100%',
        gridTemplateColumns: 'auto 1fr'
    },
    board: {
        display: "flex",
        flexWrap: "wrap",
        height: '100%',
        maxHeight: '100%',
        justifyContent: "flex-start",
        alignItems: 'flex-start',
        boxSizing: "border-box",
    }
}
