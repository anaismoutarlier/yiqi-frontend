import { useContext } from 'react'

//STYLED____________________________
import { StyledMenuBadge } from './MenuBadge.styled'

//CONTEXT___________________
import { ThemeContext } from '../../hooks/theme-context'

//HELPER FUNCTIONS______________
import combineStyles from '../../helpers/combineStyles';

//UI__________________________
import { Icon } from "@mdi/react"

const MenuBadge = ({ children, title, rotate, icon, iconSize, type, style = {}, scale, iconRotate, onClick, onMouseEnter, onMouseLeave, openable, content, rotated }) => {
    const { theme } = useContext(ThemeContext)
    return (
        <StyledMenuBadge
        rotated={ rotated }
        title={ title }
        rotate={ rotate }
        scale={ scale }
        onClick={ onClick ? onClick : null }
        onMouseEnter={ onMouseEnter ? onMouseEnter : null }
        onMouseLeave={ onMouseLeave ? onMouseLeave : null }
        openable={ openable }
        content={ content }
        style={ type === 'dark' ? combineStyles(theme.background, style) : combineStyles(theme.foreground, style) }>
            { icon && 
                <Icon
                    path={ icon }
                    size={ iconSize ? iconSize : 1 }
                    color={ type === 'dark' ? "white" : theme.foreground.color }
                    rotate={ iconRotate ? iconRotate : 0 }
                />
            }
            { children && children }
        </StyledMenuBadge>
    )
}

export default MenuBadge;