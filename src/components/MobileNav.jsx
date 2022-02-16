import { useContext } from 'react'

//REDUX____________________________
import { useSelector } from 'react-redux'

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
    mdiViewDashboardOutline
} from '@mdi/js'

const MobileNav = () => {
    //CONTEXT____________________
    const { theme } = useContext(ThemeContext)

    //REDUX____________________
    const user = useSelector(({ user }) => user)

    return (
        <div style={ combineStyles(styles.nav, theme.background) }>
            <div style={styles.logo_container}>
                YIQI
            </div>
            <div style={ styles.menu }>
                <Link to={ user ? `/board/user/${user.token}` : "#" }>
                    <Icon
                    path={ mdiViewDashboardOutline }
                    size={ 0.8 }
                    color="#ffffff"
                    />
                </Link>
                <Link to={ `/`}>
                    <Icon
                    path={ mdiNewspaper }
                    size={ 0.8 }
                    color="#ffffff"
                    />
                </Link>
                <Link to="/compte">
                    <Icon
                    path={ mdiHomeOutline }
                    size={ 0.9 }
                    color="#ffffff"
                    />
                </Link>
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
        padding: '0px 20px',
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
        width: '100px',
    }
}