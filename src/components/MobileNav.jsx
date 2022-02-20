import { useContext } from 'react'

//REDUX____________________________
import { useDispatch } from 'react-redux'

//HELPER FUNCTIONS___________________
import combineStyles from '../helpers/combineStyles'

//CONTEXT____________________
import { ThemeContext } from '../hooks/theme-context'

//NAVIGATION____________________
import { Link } from 'react-router-dom'

//UI_____________________
import Icon from '@mdi/react'
import {
    mdiHomeOutline,
    mdiNewspaper,
    mdiLocationExit
} from '@mdi/js'

//COOKIES_____________________
import Cookie from 'universal-cookie'

const cookies = new Cookie()

const MobileNav = () => {
    //CONTEXT____________________
    const { theme } = useContext(ThemeContext)

    //STORE_______________________
    const dispatch = useDispatch()

    //FUNCTIONS____________________
    const logout = () => {
        console.log("logout")
        cookies.remove('token')
        dispatch({ type: "logoutUser" })
    }

    const { nav, logo_container, menu, link } = styles
    return  (
        <div style={ combineStyles(nav, theme.background) }>
            <div style={ logo_container }>
                YIQI
            </div>
            <div style={ menu }>
                <Link to={ `/` } style={ link }>
                    <Icon
                    path={ mdiNewspaper }
                    size={ 0.7 }
                    color="#ffffff"
                    />
                </Link>
                <Link to="/account" style={ link }>
                    <Icon
                    path={ mdiHomeOutline }
                    size={ 0.8 }
                    color="#ffffff"
                    />
                </Link>
                <Icon
                    path={ mdiLocationExit }
                    size={ 0.7 }
                    color="#ffffff"
                    style={ { marginLeft: 10, cursor: "pointer" } }
                    onClick={ logout }
                    />
            </div>
        </div>
    )
}

export default MobileNav;

const styles = {
    nav: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0px 10px',
        boxShadow: '1px 3px 5px 1px rgba(0, 0 , 0, 0.4)',
        zIndex: 6000,
        boxSizing: 'border-box',
        position: 'relative',
        width: '100vw'
    },
    logo_container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: "1rem",
    },
    menu: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100%',
        width: '80px',
    },
    link: {
        height: '100%',
        display: "flex",
        alignItems: 'center'
    }
}