import { useEffect } from "react"
import "./bubble.css"

const Bubble = ({ id, open, children, handleClose, height = null, style = null }) => {
    //EFFECTS__________________
    useEffect(() => {
        if (open) document.getElementById(id).focus()
    }, [open])

    //FUNCTIONS_______________
    const handleBlur = () => {
        if (open) handleClose("bubble")
    }

    let bubbleStyle = {}
    if (style) Object.assign(bubbleStyle, style)
    if (open && height) bubbleStyle.height = height
    return <div tabIndex="0" id={ id } onBlur={ handleBlur } className={ `bubble ${open ? "open" : ""}`} style={ bubbleStyle }>{ children }</div>
}

export default Bubble

