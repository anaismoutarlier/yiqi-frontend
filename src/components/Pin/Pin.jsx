import { useState, useContext } from 'react'
import "./pin.css"

//HELPER FUNCTIONS__________________
import combineStyles from '../../helpers/combineStyles'

//CONTEXT___________________
import { ThemeContext } from '../../hooks/theme-context'
import { MediaContext } from '../../hooks/media-context'

//COMPONENTS________________
import Bubble from "../Bubble"

const colors = ["#FFEBEB", "#FFEDD6", "#FEFFEB", "#EEFFEB", "#EBFDFF", "#EBF2FF", "#DCD6FF", "#FFEBFF", '#FFFFFC']

export default function Pin({ pin, preview = false }) {
    //CONTEXT_______________________
    const { theme } = useContext(ThemeContext)
    const media = useContext(MediaContext)

    //STATE_________________________
    const [pinClass, setPinClass] = useState("pin")
    const [bubbleOpen, setBubbleOpen] = useState(false)

    //FUNCTIONS____________________
    const toggleBubble = () => {
        console.log({bubbleOpen})
        if (!bubbleOpen) openBubble()
    }

    const openBubble = () => {
        console.log("open")
        setPinClass("pin open")
        setBubbleOpen(true)
    }

    const closeBubble = source => {
        console.log("close", { source })
        setBubbleOpen(false)
        setTimeout(() => setPinClass("pin"), 600)
    }

    const calculateDelay = delay => delay >= 168 ? `${Math.floor(delay / 168)}sem` : delay >= 24 ? `${Math.floor(delay / 24)}j` : `${delay}h`

    const { view_wrapper, menu_container, pin_title, avatar, pin: pinStyle, modal_body, card_container, card_container_mobile, top_menu, content_wrapper, bottom_menu, top_menu_text, } = styles
    const bodyStyle = combineStyles(card_container, card_container_mobile, { borderBottom: `5px solid ${pin.color ? pin.color : colors[Math.floor(Math.random() * 5)]}` })

    return (
        <div style={ bodyStyle } className={ pinClass } onClick={ toggleBubble }>
            <div style={top_menu}>
                <img src={`/images/goodpin${Math.floor(Math.random() * 2) + 1}.png`} alt="pin" style={pinStyle} />
            </div>
            <div style={ content_wrapper }>
                { pin.content && <h4 style={ pin_title }>{ pin.content }</h4> }
            </div>
            <div style={bottom_menu}>
                <h6 style={top_menu_text}>Temps restant : {calculateDelay(pin.delay)}</h6>
                <img title={pin.creator ? pin.creator.name : ''} src={pin.creator ? pin.creator.avatar : ''} alt="" style={combineStyles(avatar, theme.foreground)}/>
            </div>
            <Bubble open={ bubbleOpen } id={ `bubble-${pin._id}` } handleClose={ closeBubble } style={ { borderRadius: '0px 0px 20px 2px' } } height="160px">
                BUBBLE
            </Bubble>
        </div>
    )
}

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
        marginTop: 5,
        justifyContent: 'center'
    },
    content_wrapper: {
        padding: `${Math.floor(Math.random() * 10) + 10}px 10px`,
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
        alignItems: 'flex-end',
        padding: "0px 5px 5px 5px"
    },
    top_menu_text: {
        margin: 0,
        color: 'gray',
        marginLeft: 10,
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
        paddingRight: 5,
    //    boxShadow: '1px 1px 10px 1px rgba(0, 0 , 0, 0.4)',
    //    border: '2px solid white',
        height: 25,
        width: 25,
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