import { useState, useContext } from 'react'

//STYLES_______________________________
import { defaultstyles } from '../../styles'
import './nav.css'

//HELPER FUNCTIONS___________________
import combineStyles from '../../helpers/combineStyles'

//CONTEXT____________________
import { ThemeContext, themes } from '../../hooks/theme-context'

//NAVIGATION____________________
import { Link } from 'react-router-dom'

//REDUX___________________________
import { useSelector, useDispatch } from 'react-redux'

//UI_____________________
import Icon from '@mdi/react'
import {
    mdiHomeOutline,
    mdiFormatPaint,
    mdiNewspaper,
    mdiLocationExit
} from '@mdi/js'

//COMPONENTS_________________
import Tooltip from './Tooltip'
import Slider from '../Slider'

//COOKIES_____________________
import Cookie from 'universal-cookie'

const cookies = new Cookie()

export default function Nav() {
    //CONTEXT___________________
    const { theme, changeTheme } = useContext(ThemeContext)

    //STORE_______________________
    const user = useSelector(({ user }) => user)
    const dispatch = useDispatch()

    //STATE_______________________
    const [colorMenuOpen, setColorMenuOpen] = useState(false)
    const [userMenuOpen, setUserMenuOpen] = useState(false)

    //FUNCTIONS____________________
    const logout = () => {
        cookies.remove('token')
        dispatch({ type: "logoutUser" })
    }
    
    const openColorMenu = () => setColorMenuOpen(true)

    const closeColorMenu = delay => setTimeout(() => setColorMenuOpen(false), delay)

    const openUserMenu = () => setUserMenuOpen(true)

    const closeUserMenu = delay => setTimeout(() => setUserMenuOpen(false), delay)

    const handleThemeChange = theme => {
        changeTheme(theme)
        closeColorMenu()
    }

    const { subtitle } = defaultstyles
    const { avatar_container, avatar, bottom_menu, logout_tooltip, nav_container, logo_container, menu_container, menu_wrapper, tooltip_container, color_menu, color_option } = styles
    
    return (
        <div className="transition-color" style={ combineStyles(nav_container, theme.background) }>
            <div style={ logo_container }>
                YIQI
            </div>
            <div style={ menu_container }>
                <div style={ menu_wrapper }>
                    <Link to="/">
                        <Slider name="Home" color={ theme.background.backgroundColor }>
                            <Icon
                                path={ mdiNewspaper }
                                size={0.6}
                                color="white"
                            />
                        </Slider>
                    </Link>
                    <Link to="/compte">
                        <Slider name="Compte" color={ theme.background.backgroundColor }>
                            <Icon
                                path={ mdiHomeOutline }
                                size={0.7}
                                color="white"
                            />
                        </Slider>
                    </Link>
                </div>
            </div>
            <div style={ bottom_menu }>
                <Tooltip
                    type="menu"
                    menuOpen={ colorMenuOpen }
                    openMenu={ openColorMenu }
                    closeMenuDelay={ () => closeColorMenu(2000) }
                    content={
                        <div style={ tooltip_container }>
                            <div style={ color_menu }>
                            { Object.values(themes).map((e, i) => 
                            <div
                                key={ e.name }
                                style={ theme.name === e.name ? combineStyles(color_option, themes[e.name].background, { border: '3px solid yellow' }) : combineStyles(color_option, themes[e.name].background) }
                                onClick={ () => handleThemeChange(e.name) }
                            />
                            ) }
                            </div>
                            {/* { page === 'board' &&
                                <button style={ menu_button }>
                                    <Icon
                                        path={ mdiDotsHorizontalCircleOutline }
                                        size={ 1 }
                                        color="#343a40"
                                    />
                                </button>
                            } */}
                        </div>
                    }
                >
                    <Icon
                        path={mdiFormatPaint}
                        size={ 0.7 }
                        color="white"
                        style={{cursor: 'pointer'}}
                    />
                </Tooltip>
                { user &&
                    <Tooltip
                    type="menu"
                    menuOpen={ userMenuOpen }
                    openMenu={ openUserMenu }
                    closeMenuDelay={ () => closeUserMenu(2000) }
                    content={
                        <div style={ logout_tooltip } onClick={ ()=>logout() }>
                            <Icon
                            path={ mdiLocationExit }
                            size={ 0.8 }
                            color={ theme.foreground.color }
                            style={ { marginRight: 3 } }
                            />
                            <p style={ combineStyles(subtitle, theme.foreground) }>Déconnexion</p>
                        </div>
                    }
                    >
                        <div style={ avatar_container }>
                            <img src={ user?.avatar || '' } alt={ user?.username || 'avatar' } style={ avatar }/>
                        </div>
                    </Tooltip>
                }
            </div>
        </div>
    )
}


const styles = {
    nav_container: {
        display: 'grid',
        gridTemplateRows: '60px 1fr',
        height: '100vh',
        boxShadow: '1px 3px 5px 1px rgba(0, 0 , 0, 0.4)',
        zIndex: 6000,
        boxSizing: "border-box"
    },
    logo_container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: "center",
        color: '#ffffff',
        width: '100%',
        fontWeight: 'bold',
        fontSize: "1.1rem"
    },
    menu_container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    menu_wrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: '210px',
        boxSizing: 'border-box'
    },
    tooltip_container: {
        background: 'transparent',
        display: 'flex',
        justifyContent: 'space-between',
    },
    color_menu: {
        padding: 5,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        minWidth: '100px'
    },
    color_option: {
        borderRadius: '50px',
        border: '1px solid white',
        height: '20px',
        width: '20px',
        margin: 2,
        boxShadow: '1px 3px 5px 1px rgba(0, 0 , 0, 0.4)',
        cursor: 'pointer',
        boxSizing: 'border-box'
    },
    avatar_container: {
        height: '20px',
        width: '20px',
        borderRadius: '50%',
        boxShadow: '1px 3px 5px 1px rgba(0, 0 , 0, 0.4)',
        overflow: 'hidden',
        cursor: 'pointer',
    },
    avatar: {
        objectFit: 'fill',
        height: '100%',
        width: '100%'
    },
    bottom_menu: {
        paddingBottom: '10px',
        height: '75px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    logout_tooltip: {
        display: 'flex',
        alignItems: 'center',
        verticalAlign: 'middle',
        padding: '12px 4px',
        cursor: 'pointer'
    }
}