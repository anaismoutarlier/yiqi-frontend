import React, { useState, useContext } from 'react'

//STYLES_______________________________
import defaultstyles from '../../defaultstyles'
import './nav.css'

//HELPER FUNCTIONS___________________
import combineStyles from '../../helpers/combineStyles'

//CONTEXT____________________
import { ThemeContext, themes } from '../../hooks/theme-context'

//NAVIGATION____________________
import { Link } from 'react-router-dom'

//REDUX___________________________
import { connect } from 'react-redux'

//UI_____________________
import Icon from '@mdi/react'
import {
    mdiHomeOutline,
    mdiFormatPaint,
    mdiDotsHorizontalCircleOutline,
    mdiViewDashboardOutline,
    mdiNewspaper,
    mdiLocationExit
} from '@mdi/js'

//COMPONENTS_________________
import Tooltip from './Tooltip'
import IconSlider from '../IconSlider'
import ModifyBackground from '../ModifyBackground'

//COOKIES_____________________
import Cookie from 'universal-cookie'

const cookies = new Cookie()

const Nav = ({ page, user, modifyUser, isLogged, logoutUser }) => {
    //CONTEXT___________________
    const { theme, changeTheme } = useContext(ThemeContext)

    //STATE HOOKS______________
    const [menuOpen, setMenuOpen] = useState(false)
    const [logoutMenuOpen, setLogoutMenuOpen] = useState(false)

    const [modalVisible, setModalVisible] = useState(false)

    //FUNCTIONS______________________
    const openMenu = () => {
        setMenuOpen(true)
    }

    const closeMenuDelay = () => {
        setTimeout(() => setMenuOpen(false), 20000)
    }

    const closeMenu = () => {
        setMenuOpen(false)
    }

    const toggleModal = () => {
        setModalVisible(!modalVisible)
    }

    const openLogoutMenu = () => {
        setLogoutMenuOpen(true)
    }

    const closeLogoutMenuDelay = () => {
        setTimeout(()=>setLogoutMenuOpen(false), 5000 )
    }

    const logout = () => {
        cookies.remove('token')
        logoutUser(false)
    }

    return (
        <div className="transition-color" style={combineStyles(styles.nav_container, theme.background)}>
            <div style={styles.logo_container}>
                YIQI
            </div>
            <div style={styles.menu_container}>
                <div style={ styles.menu_wrapper }>
                    <Link to={ user ? `/board/user/${user.token}`: "#" } style={{ color: 'white' }}>
                        <IconSlider name="Mon Board">
                            <Icon
                                path={mdiViewDashboardOutline}
                                size={0.8}
                                color="white"
                            />
                        </IconSlider>
                    </Link>
                    <Link to="/">
                        <IconSlider name="Recent">
                            <Icon
                                path={mdiNewspaper}
                                size={0.8}
                                color="white"
                            />
                        </IconSlider>
                    </Link>
                    <Link to="/compte">
                        <IconSlider name="Dashboard">
                            <Icon
                                path={mdiHomeOutline}
                                size={0.9}
                                color="white"
                            />
                        </IconSlider>
                    </Link>
                </div>
                <div style={ styles.bottom_menu }>
                    <Tooltip
                        type="menu"
                        menuOpen={ menuOpen }
                        openMenu={ openMenu }
                        closeMenuDelay={ closeMenuDelay }
                        content={
                            <div style={ styles.tooltip_container }>
                                <div style={styles.color_menu}>
                                { Object.values(themes).map((e, i) => 
                                <div
                                    key={ i }
                                    style={ theme.name === e.name ? combineStyles(styles.color_option, themes[e.name].background, { border: '3px solid yellow' }) : combineStyles(styles.color_option, themes[e.name].background) }
                                    onClick={ () => { changeTheme(e.name, 'update'); closeMenu(); } }
                                />
                                ) }
                                </div>
                                { page === 'board' &&
                                    <button style={ styles.menu_button } onClick={ ()=>toggleModal() }>
                                        <Icon
                                            path={ mdiDotsHorizontalCircleOutline }
                                            size={ 1 }
                                            color="#343a40"
                                        />
                                    </button>
                                }
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
                    { isLogged &&
                        <Tooltip
                        type="menu"
                        menuOpen={ logoutMenuOpen }
                        openMenu={ openLogoutMenu }
                        closeMenuDelay={ closeLogoutMenuDelay }
                        content={
                            <div style={ styles.logout_tooltip } onClick={ ()=>logout() }>
                                <Icon
                                path={ mdiLocationExit }
                                size={ 0.8 }
                                color={ theme.foreground.color }
                                style={ { marginRight: 3 } }
                                />
                                <p style={ combineStyles(defaultstyles.subtitle, theme.foreground) }>Déconnexion</p>
                            </div>
                        }
                        >
                            <div style={ styles.avatar_container }>
                                <img src={ user?.avatar ? user.avatar : '' } alt={ user?.username ? user.username : 'avatar' } style={ styles.avatar }/>
                            </div>
                        </Tooltip>
                    }
                </div>
            </div>
                <ModifyBackground open={ modalVisible } toggleModal={ toggleModal } mode="board" />
        </div>
    )
}

function mapStateToProps({ user, isLogged }) {
    return {
        user,
        isLogged
    }
}

function mapDispatchToProps(dispatch) {
    return {
        modifyUser: user => {
            dispatch({ type: 'modifyUser', user })
        },
        logoutUser: bool => {
            dispatch({ type: 'logoutUser' })
            dispatch({ type: 'setIsLogged', isLogged: bool })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav)

const styles = {
    nav_container: {
        display: 'grid',
        gridTemplateRows: '60px 1fr',
        height: '100vh',
        boxShadow: '1px 3px 5px 1px rgba(0, 0 , 0, 0.4)',
        zIndex: 6000
    },
    logo_container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ffffff',
        width: '100%',
        fontWeight: 'bold',
        fontSize: "1.4rem"
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
    menu_button: {
        border: 'none',
        background: 'transparent',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatar_container: {
        height: '35px',
        width: '35px',
        borderRadius: '50%',
        boxShadow: '1px 3px 5px 1px rgba(0, 0 , 0, 0.4)',
        overflow: 'hidden',
        cursor: 'pointer'
    },
    avatar: {
        objectFit: 'fill',
        height: '100%',
        width: '100%'
    },
    bottom_menu: {
        paddingBottom: '20px',
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