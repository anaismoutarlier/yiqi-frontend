import React, { useState, useContext } from 'react'

//STYLES____________________
import '../App.css'
import { defaultstyles } from '../styles'

//COMPONENTS______________________
import ScrollCarousel from '../components/ScrollCarousel'

//NAVIGATION_____________________
import { Redirect } from 'react-router-dom'

//HELPER FUNCTIONS_________________
import combineStyles from '../helpers/combineStyles';

//CONTEXT__________________________
import { ThemeContext } from '../hooks/theme-context';

//UI___________________________
import { Icon } from "@mdi/react"
import { mdiCircleSlice8, mdiHeart, mdiHeartOutline } from '@mdi/js';


const CardBoard = ({ board, displayCircle = false, item, toggleFavorite }) => {
    //CONTEXT_____________________
    const { theme } = useContext(ThemeContext)
    //STATE HOOKS__________________
    const [hover, setHover] = useState(false)
    const [isSelected, setIsSelected] = useState(false)

    //FUNCTIONS________________
    const toggleHover = () => setHover(!hover)

    const selectBoard = (e) => {
        if (e.target.parentElement.id === "background") {
            setIsSelected(true)
        }
    }
    
    //DISPLAY__________________
    const backgroundStyle = {
        backgroundImage: `radial-gradient(circle, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.4) 81%), url('/images/backgrounds/${board.background || 'download.jpg'}')`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    }

    return isSelected 
    ? <Redirect to={ `/board/public/${board._id}` } /> 
    : (
        <div
        id="background"
        item={ item }
        style={ combineStyles(styles.card_container, backgroundStyle) }
        onMouseEnter={ ()=>toggleHover() }
        onMouseLeave={ ()=>toggleHover() }
        onClick={ (e)=>selectBoard(e) }
        >
            <div style={ styles.top_menu }>
                <div style={ styles.title_wrapper }>
                    <h5 style={ styles.title }>{ board.name }</h5>
                    {   displayCircle &&
                        <h6 style={ combineStyles(defaultstyles.subtitle, { color: '#adb5bd' } ) }>{ board?.circles?.[0]?.name }</h6>
                    }
                </div>
                <div className="transition-color" style={ combineStyles(styles.avatar_container, theme.background_transparent) }>
                    <ScrollCarousel arrowColor="white" arrowSize={ 0.5 } style={ { width: '87%' } } scroll={ board.users.length > 3 }>
                        { board.users.map((user, i) =>
                        <img style={ combineStyles(styles.avatar, theme.foreground) } key={ i } alt="avatar" src={ user.avatar }></img>
                        ) }
                    </ScrollCarousel>
                    <div style={ combineStyles(styles.avatar_counter, theme.foreground) }>{ board.users.length }</div>
                </div>
            </div>
            <ScrollCarousel arrowColor={ theme.foreground.color } scroll={ board.pins.length > 3 }>
                { board.pins.map((pin, i) => 
                    <div style={ styles.pin_preview } key={ i }><p>{ pin.content }</p></div>
                ) }
            </ScrollCarousel>
            <div style={ styles.bottom_menu } item={ item }>
                { board.isActive && 
                    <Icon
                    path={ mdiCircleSlice8 }
                    size={ 0.8 }
                    color={ theme.background.backgroundColor }
                    style={ { marginRight: 4 } }
                    title="3 nouveaux pins"
                    />   
                }
                { (hover || board.isFavorite) &&
                    <Icon
                    path={ board.isFavorite ? mdiHeart : mdiHeartOutline }
                    size={ 0.8 }
                    color={ theme.background.backgroundColor }
                    onClick={ ()=>toggleFavorite(board, !board.isFavorite) }
                    />  
                }
            </div>
        </div>
    )
}

export default CardBoard;

const styles = {
    card_container: {
        height: '220px',
        width: '340px',
        boxShadow: '1px 3px 5px 1px rgba(0, 0 , 0, 0.4)',
        margin: 20,
        borderRadius: '5px',
        display: 'grid',
        gridTemplateRows: '60px 1fr 30px',
        cursor: 'pointer'
    },
    top_menu: {
        width: '100%',
        maxWidth: '100%',
        minWidth: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '5px 15px',
        boxSizing: 'border-box',
    },
    avatar_container: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',        
        display: 'flex',
        borderRadius: '20px',
        boxShadow: '1px 3px 5px 1px rgba(0, 0 , 0, 0.2)',
        padding: '1px 5px',
        maxWidth: '60%',
        minWidth: '40%'
    },
    avatar: {
        borderRadius: '50px',
        height: '22px',
        width: '22px',
        border: '1px solid grey',
        boxShadow: '1px 3px 5px 1px rgba(0, 0 , 0, 0.4)',
        margin: 4
    },
    avatar_counter: {
        borderRadius: '50px',
        height: '22px',
        width: '22px',
        border: '1px solid grey',
        boxShadow: '1px 3px 5px 1px rgba(0, 0 , 0, 0.4)',
        margin: 4,
        marginLeft: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        fontWeight: 'bold',
        fontSize: '0.7rem',
    },
    title: {
        fontSize: '1rem',
        margin: 0,
        textShadow: "1px 1px rgba(0, 0 , 0, 0.4)",
        color: 'white'
    },
    title_wrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    pin_preview: {
        height: '60px',   
        margin: "10px",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '1px',
        fontWeight: 'bold',
        fontSize: '0.6rem',
        padding: 15,
        textAlign: 'center',
        boxShadow: '1px 3px 5px 1px rgba(0, 0 , 0, 0.4)',
        color: '#343a40',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        maxWidth: '65px'
    },
    bottom_menu: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        zIndex: 1000,
        padding: '10px 15px'
    },
    carousel_container: {
        maxWidth: '50px'
    }
}