import { useContext } from "react"

//STYLES_______________________
import defaultstyles from "../../defaultstyles"
import modalstyles from './AddMenuModals/modalstyles'

//UI_____________________________
import { mdiPinOutline } from '@mdi/js';
import Icon from '@mdi/react'

//CONTEXT_________________________
import { ThemeContext } from "../../hooks/theme-context";

//HELPERS_________________________
import combineStyles from "../../helpers/combineStyles";

const Header = ({ icon, title, style }) => {
    const { theme: { foreground: { color } } } = useContext(ThemeContext)
    
    const { modal_header } = modalstyles
    const { subtitle } = defaultstyles
    
    return (
        <div style={ style ? combineStyles(modal_header, style) : modal_header }>
            <Icon
            path={ icon }
            size={ 0.6 }
            rotate={ 325 }
            color={ color }
            style={ { marginRight: 8, marginTop: 2 } }
            />
            <h5 style={ subtitle }>{ title }</h5>
        </div>
    )
}

export default Header
