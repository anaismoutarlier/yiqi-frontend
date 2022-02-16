import React, { useState, useContext } from 'react'

//STYLES___________________________
import defaultstyles from '../defaultstyles';

//NAVIGATION_________________________
import { Redirect } from 'react-router-dom';

//HELPER FUNCTIONS_________________
import combineStyles from '../helpers/combineStyles';

//CONTEXT__________________________
import { ThemeContext } from '../hooks/theme-context';

//UI___________________________
import { Icon } from "@mdi/react"
import { mdiCircleSlice8, mdiHeart, mdiHeartOutline, mdiChevronDown, mdiPin, mdiChevronUp } from '@mdi/js';

//REDUX_____________________________
import { connect } from 'react-redux'

const CardBoardSimple = ({ board, user, addFavorite, deleteFavorite, boards }) => {
    //CONTEXT_____________________
    const { theme } = useContext(ThemeContext)
    //STATE HOOKS__________________
    const [hover, setHover] = useState(false)
    const [isExpanded, setIsExpanded] = useState(false)

    const [isSelected, setIsSelected] = useState(false)

    //FUNCTIONS________________
    const toggleHover = () => {
        setHover(!hover)
    }

    
    const selectBoard = (e, option) => {
        if (e.target.parentElement.id === "background" || option) {
            setIsSelected(true)
        }
    }

    const favorite = async () => {
        const data = await fetch(`${global.BACKEND}/boards/favorite`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ token: user.token, boardId: board._id })
        })
        const { result } = await data.json()

        if (result) {
            let tempUser = { ...user }
            tempUser.favorites.push(board._id)

            let temp = [ ...boards ]

            let index = temp.findIndex(e => e._id === board._id)
            
            temp[index].isFavorite = true

            addFavorite(tempUser, temp)
        }
    }

    const unfavorite = async () => {
        const data = await fetch(`${global.BACKEND}/boards/favorite/${user.token}/${board._id}`, { method: 'DELETE' })
        const json = await data.json()

        if (json.result) {
            let tempUser = { ...user }
            tempUser.favorites = tempUser.favorites.filter(e => e._id !== board._id)

            let temp = [ ...boards ]

            let index = temp.findIndex(e => e._id === board._id)
            
            temp[index].isFavorite = false

            deleteFavorite(tempUser, temp)
        }
    }

    const handleFavorite = () => {
        board.isFavorite ? unfavorite() : favorite()
    }

    //DISPLAY__________________
    const backgroundStyle = {
        backgroundImage: `radial-gradient(circle, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.4) 81%), url('/images/backgrounds/${board.background || 'download.jpg'}')`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    }
    return isSelected ? <Redirect to={`/board/public/${board._id}`} /> :
        (
            <div
            style={ isExpanded ? combineStyles(styles.card_container, styles.card_container_expanded) : styles.card_container }
            onMouseEnter={ ()=>toggleHover() }
            onMouseLeave={ ()=>toggleHover() }
            onClick={ (e)=>selectBoard(e) }
            >
                <div style={ backgroundStyle } id="background">
                    <div className="transition-color" style={styles.top_menu}>
                        <div>
                            { board.isActive && 
                                <Icon
                                path={ mdiCircleSlice8 }
                                size={0.9}
                                color={ theme.background.backgroundColor }
                                style={ { marginRight: 4 } }
                                title="3 nouveaux pins"
                                />   
                            }
                            { (hover || board.isFavorite) &&
                                <Icon
                                path={ board.isFavorite ? mdiHeart : mdiHeartOutline }
                                size={0.9}
                                color={ theme.background.backgroundColor }
                                onClick={ ()=>handleFavorite() }
                                />  
                            }
                        </div>
                    </div>
                    <div style={ styles.body_container}>
                        <div style={ styles.title_wrapper }>
                            <h5 style={ styles.title }>{ board.name }</h5>
                            {/* {   board.isFavorite &&
                                <h6 style={ combineStyles(defaultstyles.subtitle, { color: '#adb5bd' }) }>{ board.circle }</h6>
                            } */}
                        </div>
                        <div className="transition-color" style={ combineStyles(styles.avatar_container, theme.background_transparent) }>
                            { board.users.map((user, i) => <img style={ combineStyles(styles.avatar, theme.foreground) } key={ i } alt={ user.username || 'avatar'} src={ user.avatar || '/images/avatar/avatar1.png' } />) }
                            <div style={combineStyles(styles.avatar_counter, theme.foreground)}>{ board.users.length }</div>
                        </div>
                        <Icon
                            path={ isExpanded ? mdiChevronUp : mdiChevronDown }
                            size={1.2}
                            color={ theme.background.backgroundColor }
                            style={ { alignSelf: 'center' } }
                            onClick={ ()=>setIsExpanded(!isExpanded) }
                        />
                    </div>
                </div>
                { isExpanded &&
                    <div style={ styles.expanded_view } onClick={ (e)=>selectBoard(e, true) }>
                        <div style={ styles.list }>
                            {   
                                board.pins.length === 0 ?
                                <div style={ combineStyles(styles.list_item, theme.foreground, { border: 'none' } ) }>
                                    Aucun pin déposé sur ce board. Rentrer dans le board pour ajouter le premier pin!
                                </div>
                                :
                                board.pins.map((e, i) =>
                                <div style={ combineStyles(styles.list_item, theme.foreground ) } key={ i }>
                                    <Icon
                                        path={ mdiPin }
                                        size={ 0.8 }
                                        color={ theme.background.backgroundColor }
                                        rotate={ 330 }
                                    />
                                    { e.content }
                                    <img style={ combineStyles(styles.avatar, theme.foreground, { height: '20px', width: '20px' }) } alt={ e.creator.username || 'avatar '} src={ e.creator.avatar || '/images/avatar/avatar1.png' }></img>
                                </div>
                            ) }
                        </div>
                        <div style={ combineStyles(styles.list_item, { ...styles.list_item_last, ...theme.foreground }) }>
                            <div style={combineStyles(styles.pin_counter, theme.background)} className="transition-color">{ board.pins.length }</div>
                        </div>
                    </div>
                }
            </div>
    )
}

function mapStateToProps({ user, boards }) {
    return { user, boards }
}

function mapDispatchToProps(dispatch) {
    return {
        addFavorite: (user, boards) => {
            dispatch({ type: 'modifyUser', user })
            dispatch({ type: 'loadBoards', boards })
        },
        deleteFavorite: (user, boards) => {
            dispatch({ type: 'modifyUser', user })
            dispatch({ type: 'loadBoards', boards })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardBoardSimple);

const styles = {
    card_container: {
        height: '200px',
        width: '300px',
        boxShadow: '1px 3px 5px 1px rgba(0, 0 , 0, 0.4)',
        margin: '10px',
        borderRadius: '5px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        cursor: 'pointer',
        gridRowEnd: 'span 11',
        boxSizing: 'border-box'
    },
    card_container_expanded: {
        height: '340px',
        gridRowEnd: 'span 18'
    },
    top_menu: {
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        padding: '5px 4px',
        boxSizing: 'border-box',
        paddingTop: 5,
        height: '30px'
    },
    avatar: {
        borderRadius: '50px',
        height: '30px',
        width: '30px',
        border: '1px solid grey',
        boxShadow: '1px 3px 5px 1px rgba(0, 0 , 0, 0.4)',
        margin: 3
    },
    avatar_counter: {
        borderRadius: '50px',
        height: '30px',
        width: '30px',
        border: '1px solid grey',
        boxShadow: '1px 3px 5px 1px rgba(0, 0 , 0, 0.4)',
        margin: 3,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        fontWeight: 'bold',
        fontSize: '0.8rem',
        marginLeft: 16
    },
    avatar_container: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',        
        display: 'flex',
        borderRadius: '20px',
        boxShadow: '1px 3px 5px 1px rgba(0, 0 , 0, 0.2)',
        marginTop: 20,
        marginBottom: 10
    },
    title: {
        fontSize: '1.1rem',
        margin: 0,
        textShadow: "1px 1px rgba(0, 0 , 0, 0.4)",
        color: 'white'
    },
    title_wrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginLeft: 10
    },
    body_container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        padding: 10,
        paddingBottom: 2,
        height: '170px',
        boxSizing: 'border-box'
    },
    expanded_view: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'rgba(248, 237, 235, 1)',
        height: '140px',
        position: 'relative',
        paddingTop: 15
    },
    list_item: {
        margin: 'auto',
        padding: 3,
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        width: '90%',
        display: 'flex',
        alignItems: 'center',
        fontSize: '0.7rem',
        justifyContent: 'space-between',
        fontWeight: '700'
    },
    list_item_last: {
        borderBottom: 'none',
        fontWeight: 'bold',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 10,
    },
    list: {
        display: 'grid',
        gridTemplateRows: 'repeat(auto-fill, 40px)',
        width: '100%'
    },
    pin_counter: {
        borderRadius: '50%', 
        padding: 4, 
        fontSize: 12, 
        boxShadow: '1px 1px 5px 1px rgba(0, 0 , 0, 0.4)', 
        marginTop: 5,
        width: 14,
        height: 14,
        textAlign: 'center'
    }
}