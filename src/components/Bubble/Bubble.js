
import "./bubble.css"

const Bubble = ({ open, children, height = null, style = null }) => {
    let bubbleStyle = {}
    if (style) Object.assign(bubbleStyle, style)
    if (open && height) bubbleStyle.height = height
    return <div className={ `bubble ${open ? "open" : ""}`} style={ bubbleStyle }>{ children }</div>;
}

export default Bubble

