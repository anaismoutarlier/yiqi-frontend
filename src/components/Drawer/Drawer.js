import "./drawer.css"

//SCROLLBAR____________________
import SimpleBar from "simplebar-react";


const Drawer = ({ open, children, header, bodyStyle }) => (
    <div className={`drawer ${open ? "open" : ""}`}>
        { header ? typeof(header) === "function" ? header() : header : null }
        <SimpleBar style={ bodyStyle }>
            { children }
        </SimpleBar>
    </div>
);

export default Drawer