import React, { useState, useRef, useContext } from 'react'
import "./pin.css"

//HELPER FUNCTIONS__________________
import combineStyles from '../../helpers/combineStyles'

//CONTEXT___________________
import { ThemeContext } from '../../hooks/theme-context'
import { MediaContext } from '../../hooks/media-context'

//DRAGGABLE___________________
import Draggable from 'react-draggable'

//COMPONENTS______________________
import Bubble from '../Bubble'
import Response from './Response'

const colors = ["#FFEBEB", "#FFEDD6", "#FEFFEB", "#EEFFEB", "#EBFDFF", "#EBF2FF", "#DCD6FF", "#FFEBFF", '#FFFFFC']

const Pin = ({ pin, preview = false }) => {
    //CONTEXT_______________________
    const { theme } = useContext(ThemeContext)
    const { media } = useContext(MediaContext)

    //STATE HOOKS____________________
    const [moved, setMoved] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [pinClass, setPinClass] = useState("pin")

    const pinRef = useRef(null)

    //FUNCTIONS_____________
    const handleDragStart = (e) => {
        setMoved(false)
    }

    const handleDrag = (e) => {
        setMoved(true)
    }

    const handleDragStop = (e, data) => {
        if (moved) updatePinPosition({ x: data.x, y: data.y })
        else pinRef.current.click()
    }


    const toggleModal = (e) => {
        console.log("toggleModal")
        setModalOpen(!modalOpen)
        if (!modalOpen) setPinClass("pin open")
        else setTimeout(()=>{console.log("timeout"); setPinClass("pin")}, 475)
    }

    const pinClicked = (e) => {
        e.stopPropagation()
        toggleModal(e)
        setMoved(false)
    }

    const updatePinPosition = async (position) => {
        const data = await fetch(`${global.BACKEND}/pins/edit`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ pinId: pin._id, update: { position }  })
        })
        const json = await data.json()


    }

    const calculateDelay = delay => {
        return delay >= 168 ? `${Math.floor(delay / 168)}sem` : delay >= 24 ? `${Math.floor(delay / 24)}j` : `${delay}h`
    }
    
    const bodyStyle = combineStyles(styles.card_container, styles.card_container_mobile, { borderBottom: `5px solid ${pin.color ? pin.color : colors[Math.floor(Math.random() * 5)]}` })

    const body = (
        <div ref={ pinRef } style={ bodyStyle } className={`handle ${pinClass}`} onClick={ (e) =>pinClicked(e) }>
            <div style={styles.top_menu}>
                <img
                    src={`/images/goodpin${Math.floor(Math.random() * 2) + 1}.png`} alt="pin" style={styles.pin}
                />
            </div>
            <div style={styles.content_wrapper}>
                {pin.content && <h4 style={styles.pin_title}>{pin.content}</h4>}
            </div>
            <div style={styles.bottom_menu}>
                <h6 style={styles.top_menu_text}>Temps restant : {calculateDelay(pin.delay)}</h6>
                <img
                    title={pin.creator ? pin.creator.name : ''} src={pin.creator ? pin.creator.avatar : ''} alt="" style={combineStyles(styles.avatar, theme.foreground)}
                />
            </div>
            <Bubble open={ modalOpen } style={ { borderRadius: '2px 2px 20px 2px' } } height="160px"><Response pin={ pin } /></Bubble>
        </div>
    )

    return (
        <>
            {media !== 'mobile' && !preview ?
                <Draggable
                    axis="both"
                    handle=".handle"
                    position={null}
                    grid={[1, 1]}
                    scale={1}
                    bounds="parent"
                    defaultPosition={ pin.position }
                    onStart={handleDragStart}
                    onDrag={handleDrag}
                    onStop={handleDragStop}
                >
                    { body }
                </Draggable>
                :
                <>{ body }</>
            }
        </>
    )
}

export default Pin;

const styles = {
    card_container: {
        cursor: "pointer",
        display: "grid",
        gridTemplateRows: '25px 1fr 30px',
        minHeight: '100px',
        minWidth: '100px',
        maxHeight: '400px',
        boxShadow: '1px 3px 15px 3px rgba(0, 0 , 0, 0.2)',
        zIndex: 5,
        margin: 'auto',
        position: "relative",
        backgroundColor: '#FFF' 
    },
    card_container_mobile: {
        width: `250px`,
        height: 'auto',
        margin: 'auto',
        maxHeight: '2500px'
    },
    top_menu: {
        display: 'flex',
        alignItems: 'flex-start',
        padding: '10px 10px',
        marginTop: 3,
        justifyContent: 'center'
    },
    content_wrapper: {
        padding: 10,
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: `100%`,
        margin: '2% 10%'
    },
    bottom_menu: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '3px 5px'
    },
    top_menu_text: {
        margin: 0,
        fontSize: '0.7rem',
        color: 'gray',
        marginLeft: 10,
        marginBottom: 20
    },
    view_wrapper: {
        display: 'flex',
        alignItems: 'center',
        width: '8%',
        justifyContent: 'space-between'
    },
    menu_container: {
        display: 'flex',
        alignItems: 'center',
        height: '100%'
    },
    pin_title: {
        margin: 0,
        marginBottom: 15,
        color: '#343a40'
    },
    avatar: {
        borderRadius: '50%',
        paddingRight: 10,
        marginBottom: 20,
        marginRight: -5,
    //    boxShadow: '1px 1px 10px 1px rgba(0, 0 , 0, 0.4)',
    //    border: '2px solid white',
        height: 30,
        width: 30,
        overflow: 'hidden'
    },
    pin: {
        position: 'absolute',
        left: 100, 
        top: -15,
        height: 30,
        width: 'auto'
    },
    modal_body: {
        borderRadius: 10,
        backgroundColor: 'white',
        height: '50vh',
        width: '50vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}