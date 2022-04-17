import { useEffect,  useState, useContext } from "react"
import "./bubble.css"

//CONTEXT_______________________
import { ThemeContext } from '../../hooks/theme-context'

//HELPER FUNCTIONS___________________
import combineStyles from '../../helpers/combineStyles'

//UI___________________________
import { Icon } from "@mdi/react"
import { mdiCloseCircleOutline, mdiClose, mdiShareVariantOutline, mdiPhone, mdiBellOutline, mdiMessageReplyTextOutline, mdiEmailOUtline, mdiEmailOutline } from '@mdi/js';

//REDUX________________________
import { useDispatch } from "react-redux";

//COMPONENTS)_________________
import Select from "../Select"

const Bubble = ({ id, open, handleClose, height = null, style = null, pinSize, index }) => {
    //STATE__________________________
    const [transfer, setTransfer] = useState(false)
    //CONTEXT__________________
    const { theme } = useContext(ThemeContext)

    //REDUX___________________
    const dispatch = useDispatch()
    //EFFECTS__________________
    useEffect(() => {
        dispatch({ type: "toggleMask", mask: open })
    }, [open])

    useEffect(() => {
        if (open) document.getElementById(id).focus()
    }, [open, id])

    //FUNCTIONS______________________________
    const handleBlur = () => {
        handleClose()
    }

    const toggleTransfer = () => setTransfer(!transfer)

    let bubbleStyle = {}
    if (style) Object.assign(bubbleStyle, style)
    if (open && height) bubbleStyle.height = height

    const { icon_container, icon, select_wrapper, select } = styles
    return (
        <div className={ open ? "anchor open" : "anchor" }>
            <div className={ open ? "bubble open" : "bubble" } onBlur={ handleBlur } tabIndex={ index } id={ id } style={ open ? { height: pinSize.height + 100, width: pinSize.width + 140 } : {} }>
                <Icon
                path={ mdiClose }
                size={ 0.7 }
                style={ { alignSelf: 'flex-end', cursor: "pointer" } }
                onClick={ handleClose }
                />
                <div style={ pinSize }/>
                <div style={ icon_container }>
                    <div style={ select_wrapper }>
                        { transfer &&
                            <Select style={ select } />
                        }
                        <div style={ combineStyles(icon, theme.background) } onClick={ toggleTransfer }>
                            <Icon
                            path={ mdiShareVariantOutline }
                            size={ 0.7 }
                            style={ { position: "relative", top: 1 } }
                            />
                        </div>
                    </div>
                    <div style={ { display:"flex" } }>
                        <div style={ combineStyles(icon, theme.background) }>
                            <Icon
                            path={ mdiPhone }
                            size={ 0.6 }
                            style={ { position: "relative", top: 1 } }
                            />
                        </div>
                        <div style={ combineStyles(icon, theme.background) }>
                            <Icon
                            path={ mdiBellOutline }
                            size={ 0.8 }
                            style={ { position: "relative", top: 1 } }
                            />
                        </div>
                        <div style={ combineStyles(icon, theme.background) }>
                            <Icon
                            path={ mdiMessageReplyTextOutline }
                            size={ 0.7 }
                            style={ { position: "relative", top: 1 } }
                            />
                        </div>
                        <div style={ combineStyles(icon, theme.background) }>
                            <Icon
                            path={ mdiEmailOutline }
                            size={ 0.7 }
                            style={ { position: "relative", top: 1 } }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Bubble

const styles = {
    icon_container: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "auto",
        position: "absolute",
        bottom: 10,
        width: 'calc(100% - 20px)'        
    },
    icon: {
        borderRadius: '50px',
        height: '30px',
        width: '30px',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 3,
        cursor: "pointer"
    },
    select_wrapper: {
        display: "flex"
    },
    select: {
        width: 150
    }
}
