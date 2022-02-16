import React, { useState, useEffect, useContext } from 'react'

//STYLES_______________________
import defaultstyles from '../defaultstyles';
import '../App.css'

//NAVIGATION____________________
import { useParams } from 'react-router-dom';

//COMPONENTS____________________
import Pin from '../components/Pin'
import AddMenu from '../components/AddMenu'

//CONTEXT___________________
import { ThemeContext } from '../hooks/theme-context';
import { MediaContext } from '../hooks/media-context'

//HELPER FUNCTIONS______________
import combineStyles from '../helpers/combineStyles';

//UI___________________________
import { Icon } from "@mdi/react"
import { mdiChevronRight } from '@mdi/js';

//REDUX_______________________
import { connect } from 'react-redux'

//SOCKETS_________________
import { joinBoard, joinAll, leaveBoard, leaveAll } from '../sockets'

const Board = ({ setCurrentPage, user }) => {
    //CONTEXT_________________________
    const { theme } = useContext(ThemeContext)
    const { media } = useContext(MediaContext)

    //STATE HOOKS_________________________
    const [board, setBoard] = useState(null)
    const [userBoards, setUserBoards] = useState([])

    //PARAMETERS_______________________
    //type enum: "global", "user"
    const { type, id } = useParams()

    //EFFECT HOOKS_____________________
    useEffect(() => {
        setCurrentPage('board')
    }, [])

    useEffect(() => {
        if(global.SOCKET) {
            global.SOCKET.on('user joined', data => console.log(data))
            global.SOCKET.on('newPin', newPin)
            global.SOCKET.on('timeoutPin', deletePin)
            global.SOCKET.on('disconnect', data => console.log("disconnect", data))
        }
    })

    useEffect(() => {
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
    })

    useEffect(() => {
        const fetchBoard = async () => {
            const data = await fetch(`${global.BACKEND}/boards/${id}/${user._id}`)
            const json = await data.json()

            if (json.result) {
                joinBoard({ boardId: id, userId: user.token })
                setBoard(json.board)
            }
        }

        const fetchUserBoard = async () => {
            const data = await fetch(`${global.BACKEND}/pins/all/${id}`)
            const json = await data.json()
            if (json.result) {
                joinAll({ boards: json.boards, userId: user.token })
                setUserBoards(json.boards)
                setBoard(json.board)
            }
        }

        if (id && user) type === 'user' ? fetchUserBoard() : fetchBoard()
    }, [id, user, type])

    //sockets
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

    const updatePin = pin => {
        if (board && pin) {
            let temp = { ...board }
            temp.pins[temp.pins.findIndex(e => e._id === pin._id)] = pin

            setBoard(temp)
        }
    }

    //DISPLAY__________________
    const backgroundStyle = {
        background: `radial-gradient(circle, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.2) 81%), url('/images/backgrounds/${board?.background}'`,
        // backgroundImage: `url('/images/backgrounds/${board?.background}')`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    }


    return (
        <>
            <AddMenu />
            <div style={ media === 'desktop' ? combineStyles(styles.background, backgroundStyle, { borderColor: theme.foreground.color }) : combineStyles(styles.background, backgroundStyle, styles.background_mobile) }>
                <div style={ combineStyles(styles.header, { borderColor: theme.foreground.color }) }>
                    <div style={ styles.title_wrapper }>
                        <h1 style={ combineStyles(defaultstyles.subtitle, theme.foreground, styles.title) }>{ board?.name || null}</h1>
                        <Icon
                            path={ mdiChevronRight }
                            size={ 1.2 }
                            color={ theme.foreground.color }
                            style={ { marginLeft: 1, marginBottom: -2.7 } }
                            />
                    </div>
                </div>
                <div style={ media === 'mobile' ? styles.pins_container_mobile : styles.pins_container } className={ media === 'mobile' ? 'hide-scrollbar' : undefined }>
                    { board?.pins.length > 0 && board.pins.map((e, i) => <Pin pin={ e } key={ i } />) }
                </div>
            </div>
        </>
    )
}

function mapStateToProps({ user }) {
    return { user }
}
export default connect(mapStateToProps, null)(Board);

const styles = {
    background: {
        height: '100%',
        width: '100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        display: 'grid',
        gridTemplateRows: '75px 1fr',
    },
    background_mobile: {
        width: '100vw'
    },
    header: {
        boxSizing: 'border-box',
        margin: 'auto',
        borderBottom: '1px solid rgba(0, 0, 0, 0.14)',
        background: 'transparent',
        display: 'flex',
        alignItems: 'flex-end',
        paddingBottom: 10,
        width: '90%',
        zIndex: 1000,
    },
    title: {
        fontSize: '1.2rem',
        margin: 0,
        marginLeft: 20,
    },
    board_menu: {
        display: 'flex',
    },
    title_wrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    pins_container: {
        position: 'relative'
    },
    pins_container_mobile: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, 350px)',
        gridTemplateRows: 'repeat(auto-fill, 200px)',
        margin: '10px auto',
        overflow: 'scroll',
        height: '100%'
    }
}