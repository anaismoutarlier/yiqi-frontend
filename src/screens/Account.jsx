import React, { useState, useContext } from 'react'
import '../App.css'

//REDUX_______________________________
import { useSelector } from 'react-redux'

//COMPONENTS___________________________
import Circles from '../components/dashboardviews/Circles'
import Settings from '../components/dashboardviews/Settings'
import Network from '../components/dashboardviews/Network'
//import Account from '../components/dashboardviews/Account'
import AddMenu from '../components/AddMenu'

//HELPER FUNCTIONS___________________
import combineStyles from '../helpers/combineStyles'

//CONTEXT____________________
import { ThemeContext } from '../hooks/theme-context'
import { MediaContext } from '../hooks/media-context'

//UI___________________________
import { Icon } from "@mdi/react"
import { mdiCogOutline, mdiBlurRadial, mdiAccountGroup, mdiCrownOutline, mdiPencilOutline } from '@mdi/js';


const Account = () => {
    //CONTEXT______________________________
    const { theme } = useContext(ThemeContext)
    const { media } = useContext(MediaContext)

    //STATE HOOKS___________________________
    const [selectedTab, setSelectedTab] = useState('settings')
    const user = useSelector(({ user }) => user)

    return (
        <div style={ media === 'desktop' ? styles.page_container : styles.page_container_mobile }>
            { media === 'desktop' && <AddMenu /> }
            <div style={ styles.banner }>
                <div style={ styles.banner_content }>
                    <div style={ media === 'desktop' ? combineStyles(styles.avatar, { backgroundImage: `url(${user.avatar})` }) : combineStyles(styles.avatar, styles.avatar_mobile, { backgroundImage: `url(${user.avatar})`}) }>
                        {
                            (selectedTab === 'settings' && media === 'desktop') &&
                            <Icon
                            path={ mdiPencilOutline }
                            color={ theme.foreground.color }
                            size={ 0.8 }
                            rotate={ -8 }
                            style={ { cursor: 'pointer', position: 'absolute', bottom: 15, right: 15 } }
                            className="transition-color"
                            />
                        }
                    </div>
                    <h2 style={ combineStyles(styles.title, theme.foreground) }>{ user.username }</h2>
                </div>
                <div style={ styles.tab_menu }>
                    <div 
                    style={ selectedTab === 'settings' ? combineStyles(styles.tab, theme.foreground, styles.selected_tab) : combineStyles(styles.tab, theme.foreground) }
                    onClick={ ()=>setSelectedTab('settings') }
                    className="transition-color">
                        <Icon
                        path={ mdiCogOutline }
                        color={ theme.foreground.color }
                        size={ 0.8 }
                        style={ { marginTop: 1, marginRight: 3 } }
                        className="transition-color"
                        />
                        { media === 'desktop' && 'Paramètres' }
                    </div>
                    <div 
                    style={ selectedTab === 'circles' ? combineStyles(styles.tab, theme.foreground, styles.selected_tab) : combineStyles(styles.tab, theme.foreground) }
                    onClick={ ()=>setSelectedTab('circles') }
                    className="transition-color">
                        <Icon
                        path={ mdiBlurRadial }
                        color={ theme.foreground.color }
                        size={ 0.8 }
                        style={ { marginTop: 1, marginRight: 3 } }
                        className="transition-color"
                        />
                        { media === 'desktop' && 'Circles' }
                    </div>
                    <div
                    style={ selectedTab === 'network' ? combineStyles(styles.tab, theme.foreground, styles.selected_tab) : combineStyles(styles.tab, theme.foreground) }
                    onClick={ ()=>setSelectedTab('network') }
                    className="transition-color">
                        <Icon
                        path={ mdiAccountGroup }
                        color={ theme.foreground.color }
                        size={ 0.8 }
                        style={ { marginTop: 1, marginRight: 3 } }
                        className="transition-color"
                        />
                        { media === 'desktop' && 'Communauté' }
                    </div>
                    <div
                    style={ selectedTab === 'account' ? combineStyles(styles.tab, theme.foreground, styles.selected_tab) : combineStyles(styles.tab, theme.foreground) }
                    onClick={ ()=>setSelectedTab('account') }
                    className="transition-color">
                        <Icon
                        path={ mdiCrownOutline }
                        color={ theme.foreground.color }
                        size={ 0.8 }
                        style={ { marginTop: 1, marginRight: 3 } }
                        className="transition-color"
                        />
                        { media === 'desktop' && 'Espace client' }
                    </div>
                </div>
            </div>
            {
                selectedTab === 'circles' ?
                <Circles />
                : selectedTab === 'settings' ?
                <Settings />
                : selectedTab === 'network' ?
                <Network />
                : selectedTab === 'account' ?
                //<Account />
                null
                : null
            }
        </div>
    )
}

export default Account;

const styles = {
    page_container: {
        display: 'grid',
        gridTemplateRows: '200px 1fr',
        maxHeight: '100vh',
        width: '100%',
        height: '100vh'
    },
    page_container_tablet: {
        display: 'grid',
        gridTemplateRows: '100px 1fr',
        height: '100%',
        width: '100%',
        maxHeight: '100%',
        boxSizing: 'border-box',
    },
    page_container_mobile: {
        display: 'grid',
        gridTemplateRows: '100px 1fr',
        height: '100%',
        width: '100%',
        maxHeight: '100%',
        boxSizing: 'border-box',
    },
    banner: {
        backgroundImage: `radial-gradient(circle, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.2) 81%), url('/images/download.jpg')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '1px 2px 5px 1px rgba(0, 0 , 0, 0.2)',
        position: 'relative',
        marginBottom: 10
    },
    banner_content: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: 25
    },
    body: {
        maxHeight: '100%',
        width: '100%'
    },
    avatar: {
        height: '100px',
        width: '100px',
        borderRadius: '50%',
        boxShadow: '1px 3px 5px 1px rgba(0, 0 , 0, 0.4)',
        backgroundImage: `url('/images/anais.jpg')`,
        backgroundSize: 'cover',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        position: 'relative'
    },
    avatar_mobile: {
        height: '45px',
        width: '45px'
    },
    title: {
        marginLeft: 10,
        fontSize: '1.1rem'
    },
    tab_menu: {
        display: 'flex',
        zIndex: 1000,
        justifyContent: 'center',
        boxSizing: 'border-box',
        position: 'absolute',
        bottom: -10
    },
    tab: {
        cursor: 'pointer',
        borderTopLeftRadius: '5px',
        borderTopRightRadius: '5px',
        margin: 3,
        padding: '5px 20px 5px 20px',
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'flex-start',
        fontWeight: 'bold',
        height: '30px',
        borderRight: '1px solid rgba(0, 0 , 0, 0.4)',
        borderLeft: '1px solid rgba(0, 0 , 0, 0.4)',
        borderTop: ' 1px solid rgba(0, 0 , 0, 0.4)',
        backgroundColor: 'rgba(255, 255, 255, 0.2)'
    },
    selected_tab: {
        height: '36px',
        backgroundColor: '#ffffff'
    }
}