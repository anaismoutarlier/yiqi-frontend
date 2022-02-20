import { useContext, useState } from 'react'
import "./sider.css"

//CONTEXT___________________
import { ThemeContext } from '../../hooks/theme-context'

//UI___________________________
import { Icon } from "@mdi/react"
import { mdiChevronRight, mdiChevronLeft } from '@mdi/js';

export default function Sider({ children }) {
    //STATE_____________________________
    const [open, setOpen] = useState(true)
    const [siderIcon, setSiderIcon] = useState(mdiChevronLeft)

    //CONTEXT___________________________
    const { theme } = useContext(ThemeContext)

    //FUNCTIONS________________________
    const toggleOpen = bool => {
        setOpen(bool)
        setTimeout(() => bool ? setSiderIcon(mdiChevronLeft) : setSiderIcon(mdiChevronRight), 1000)
    }

    return (
        <div className={ `sider${open ? " open" : ""}`}>
            <Icon
            path={ siderIcon }
            size={ 1 }
            onClick={ ()=> toggleOpen(!open) }
            className="transition-color"
            style={ { position: "absolute", right: "0.2rem", top: 5, backgroundColor: theme.background.backgroundColor, borderRadius: '5px', color: "white", cursor: "pointer" }}
            />
            { children }
        </div>
    )
}