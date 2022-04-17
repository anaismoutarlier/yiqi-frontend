import { useEffect, useState } from 'react'
import "./home.css"

//REDUX___________________________
import { useSelector } from 'react-redux'

//HELPER FUNCTIONS___________________
import combineStyles from '../../helpers/combineStyles'

//COMPONENTS_________________________
import Pin from '../../components/Pin'

//SCROLL___________________________
// import SimpleBar from "simplebar-react"

//SOCKETS_________________
import { joinAll, leaveAll } from '../../sockets'

export default function MyBoard() {
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
    
    const { container } = styles
    return (
        <div style={ container }>
            {/* <SimpleBar id="board-scroll" style={ { height: '100%', width: '100%' } }> */}
                { board?.pins.length > 0 && board.pins.map((e, i) => <Pin pin={ e } key={ e.id } index={ i } />) }
            {/* </SimpleBar> */}
        </div>
    )
}

const styles = {
    container: {
        display: 'grid',
        gridTemplateColumns: "repeat(auto-fill, 340px)",
        gridTemplateRows: "repeat(auto-fill, 180px)",
        paddingTop: 40,
        paddingLeft: 20
    }
}