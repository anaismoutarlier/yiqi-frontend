import { useContext } from 'react'

//HELPER FUNCTIONS______________________
import combineStyles from '../../helpers/combineStyles'

//CONTEXT_______________________
import { ThemeContext } from '../../hooks/theme-context'

const Tooltip = ({ children, content, type, menuOpen, openMenu, closeMenuDelay }) => {
    const { theme } = useContext(ThemeContext)
    return (
        <div
        style={ styles.tooltip_wrapper }
        onMouseEnter={ openMenu }
        onMouseLeave={ closeMenuDelay }
        >
            { children }
            { menuOpen && 
            <div
            style={ styles.tooltip }>
                <div style={ type === 'menu' ? styles.tip : combineStyles(styles.tip, { borderRight: `14px solid ${theme.background.backgroundColor}` }) }>
                </div>
                <div style={ type === 'menu' ? styles.body : combineStyles(styles.body, theme.background) }>
                    { content }
                </div>
            </div>
            }
        </div>
    )
}
export default Tooltip;

const styles = {
    tooltip_wrapper: {
        display: 'inline-block',
        position: 'relative'
    },
    tooltip: {
        position: 'absolute',
        left: 45,
        top: '50%',
        transform: "translateX(0) translateY(-50%)",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    tip: {
        width: 0,
        height: 0,
        borderTop: "14px solid transparent",
        borderBottom: "14px solid transparent",
        borderRight: `14px solid rgba(255, 255, 255, 0.7)`,
        marginRight: '-0.1%',
    },
    body: {
        borderRadius: '15px',
        color: '#ffffff',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: 5,
        minHeight: '30px',
        boxShadow: '2px 2px 6px -4px rgba(0, 0, 0, 0.6)'
    },
    content_container: {
        marginLeft: 8,
        padding: '10px 7px 10px 0px'
    }
}