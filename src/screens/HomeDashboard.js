import React, { useState, useEffect, useContext } from 'react'

//REDUX__________________________
import { connect } from 'react-redux'

//NAVIGATION________________________
import { Redirect } from 'react-router-dom'

//STYLES____________________________
import defaultstyles from '../defaultstyles';
import './Home/home.css'
import '../App.css'

//CONTEXT___________________
import { ThemeContext } from '../hooks/theme-context'
import { MediaContext } from '../hooks/media-context'

//VIEWS______________________
import Home from './Home'
import MyBoards from './MyBoards'

//COMPONENTS______________________
import AddMenu from "../components/AddMenu"

//UI_____________________
import Icon from '@mdi/react'
import {
    mdiViewDashboardOutline,
    mdiNewspaper
} from '@mdi/js'

const HomeDashboard = ({ user, isLogged, boards, loadBoards }) => {
    //STYLES__________________________________
    const { page_container, page_container_mobile, page_container_tablet, page_myBoards, menu, icon } = styles

    //CONTEXT______________________________
    const { theme } = useContext(ThemeContext)
    const { media } = useContext(MediaContext)

    //STATE HOOKS______________________________
    const [view, setView] = useState(user?.preferences?.view || "recent")
    const [dataLoading, setDataLoading] = useState(false)

    //EFFECT HOOKS______________________________
    useEffect(() => {
        const fetchBoards = async () => {
            let data = await fetch(`${global.BACKEND}/boards/userboards/${user._id}`)
            let json = await data.json()

            if (json.result) {
                loadBoards(json.boards)
                setDataLoading(false)
            }
        }
        
        if (user) {
            setDataLoading(true)
            fetchBoards()
        }
    }, [user])

    const toggleView = async (val) => {
        const data = await fetch(`${global.BACKEND}/users/account`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ token: user.token, key: "preferences", value: Object.assign({ ...user.preferences, view: val }) })
        })

        const { result } = await data.json()

    }

    return !isLogged 
    ? <Redirect to='/connexion' /> 
    : (
        <div className={ media !== 'desktop' ? 'hide-scrollbar' : '' } style={ view === "boards" ? page_myBoards : media === 'mobile' ? page_container_mobile : media === 'tablet' ? page_container_tablet : page_container }>
            <AddMenu />

            <div style={ menu }>
                <Icon
                    path={mdiNewspaper}
                    size={0.8}
                    color="white"
                    onClick={ () => setView("recent") }
                    style={ { backgroundColor: "rgba(0,0,0, 0.2)", borderRadius: '3px', margin: 4, padding: 4, cursor: 'pointer' } }
                />
                <Icon
                    path={mdiViewDashboardOutline}
                    size={0.8}
                    color="white"
                    onClick={ () => setView('boards') }
                    style={ { backgroundColor: "rgba(0,0,0, 0.2)", borderRadius: '3px', margin: 4, padding: 4, cursor: 'pointer' } }
                />
            </div>
            {
                view === 'recent' &&
                <Home />
            }
            {
                view === 'boards' &&
                <MyBoards />
            }
        </div>
    )
}

function MapStateToProps({ user, isLogged, boards }) {
    return {
        user,
        isLogged,
        boards
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loadBoards: boards => {
            dispatch({ type: 'loadBoards', boards })
        }
    }
}

export default connect(MapStateToProps, mapDispatchToProps)(HomeDashboard)


const styles = {
    page_container: {
        backgroundImage: `url('/images/DM-Wallpaper-2001-4096x2304a.jpg')`,
        backgroundSize: 'cover',
        display: 'grid',
        gridTemplateRows: "15% 85%",
        gridTemplateColumns: '1fr 420px',
        height: '100vh',
        zIndex: '0 !important',
        position: "relative",
    },
    page_container_mobile: {
        backgroundImage: `url('/images/DM-Wallpaper-2001-4096x2304a.jpg')`,
        backgroundSize: 'cover',
        height: '100vh',
        maxHeight: '100%',
        display: 'grid',
        gridTemplateRows: '60px 1fr',
        position: "relative",
    },
    page_container_tablet: {
        backgroundImage: `url('/images/DM-Wallpaper-2001-4096x2304a.jpg')`,
        backgroundSize: 'cover',
        height: '100vh',
        maxHeight: '100%',
        display: 'grid',
        gridTemplateRows: '60px 1fr',
        gridTemplateColumns: '1fr 1fr',
        position: "relative",
    },
    page_myBoards: {
        backgroundSize: 'cover',
        height: '100vh',
        zIndex: '0 !important',
        position: "relative",
        paddingTop: 50,
        boxSizing:'border-box'
    },
    menu: {
        position: 'absolute',
        left: 30,
        top: 30
    },
    icon: {
        backgroundColor: "rgba(0,0,0, 0.2)",
        borderRadius: '3px',
        margin: 4,
        padding: 4
    }
}