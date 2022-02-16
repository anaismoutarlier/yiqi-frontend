import React, { useState, useContext } from 'react'
import '../App.css'

//REDUX___________________________________
import { connect } from 'react-redux'

//COMPONENTS____________________________________
import CardBoard2 from '../components/CardBoard2'
import MenuBadge from '../components/MenuBadge'

//UI___________________________
import { Icon } from "@mdi/react"
import { mdiHeartOutline, mdiAccountOutline, mdiBlurRadial, mdiCogOutline, mdiAccountGroupOutline, mdiBellOutline, mdiChevronDown } from '@mdi/js';

//CONTEXT__________________________
import { ThemeContext } from '../hooks/theme-context';
import { MediaContext } from '../hooks/media-context'

//HELPER FUNCTIONS_____________________________
import combineStyles from '../helpers/combineStyles'

export const Category = ({ title, icon, boards, isSelected, setSelected, name, toggleFavorite }) => {
    //CONTEXT______________________________
    const { theme } = useContext(ThemeContext)
    const { media } = useContext(MediaContext)

    return (
        <>
        {
            boards.length > 0 &&
            <div style={ styles.section }>
                <div style={ styles.header }>
                    <div 
                    style={ styles.header_title }
                    onClick={ ()=>setSelected(name) }
                    >
                        <Icon
                        path={ icon }
                        size={ 0.7 }
                        color={ theme.foreground.color }
                        style={ { marginRight: 4, marginTop: 2 } }
                        />
                        <h6 style={ styles.section_title }>{ title }</h6>
                        <Icon
                        path={ mdiChevronDown }
                        size={ 1 }
                        color={ theme.foreground.color }
                        style={ { marginLeft: 4, marginTop: 2 } }
                        />
                    </div>
                    {
                        title !== 'FAVORIS' &&
                        <div style={ styles.section_menu }>
                            <MenuBadge
                            icon={ mdiCogOutline }
                            iconRotate={ 90 }
                            iconSize={ 0.7 }
                            type="dark"
                            style={ { padding: 1 } }
                            />
                            <MenuBadge
                            icon={ mdiAccountGroupOutline }
                            rotate={ 1 }
                            iconSize={ 0.7 }
                            type="dark"
                            style={ { padding: 1 } }
                            />
                            <MenuBadge
                            icon={ mdiBellOutline }
                            rotate={ 1 }
                            iconRotate={ 19 }
                            iconSize={ 0.7 }
                            type="dark"
                            style={ { padding: 1 } }
                            />
                        </div>
                    }
                </div>
                { isSelected &&
                    <div style={ media === 'desktop' ? styles.cards_container : combineStyles(styles.cards_container, { justifyContent: 'center' }) } className="hide-scrollbar">
                        { boards.map((board, i) => 
                                <CardBoard2 
                                board={ board }
                                key={ i }
                                displayCircle={ name === 'favorites' }
                                toggleFavorite={ toggleFavorite }
                                />
                            ) }
                    </div>
                }
            </div>
        }
        </>
    )
}

const MyBoards = ({ boards, userCircle, user, loadBoards, circles }) => {
    //STATE HOOKS____________________________
    const [selectedTab, setSelectedTab] = useState('favorites')

    //FUNCTIONS___________________________________________
    const sortBoards = (a, b) => {
        return (a.isActive && !b.isActive) ? -1
        : (b.isActive && !a.isActive) ? 1
        : 0 ;
    }

    const setSelected = tab => selectedTab === tab ? setSelectedTab(null) : setSelectedTab(tab)

    const toggleFavorite = async (board, isFavorite) => {
        let endpoint;
        let options = {}

        if (isFavorite) {
            endpoint = `/boards/favorite`
            options = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token: user.token, boardId: board._id })
            }
        } else {
            endpoint = `/boards/favorite/${user.token}/${board._id}`
            options = {
                method: "DELETE"
            }
        }
        
        if (endpoint) {
            const data = await fetch(`${global.BACKEND}${endpoint}`, options)
            const { result } = await data.json()
    
            if (result) {
                let tempUser = { ...user }
                if (isFavorite) tempUser.favorites.push(board._id)
                else tempUser.favorites = tempUser.favorites.filter(e => e !== board._id)

                let temp = [ ...boards ]
    
                let index = temp.findIndex(e => e._id === board._id)
                temp[index].isFavorite = isFavorite

                loadBoards(temp, tempUser)
            }
        }
    }

    return (
        <div style={ styles.page_container } className='hide-scrollbar'>
            <Category 
            title="FAVORIS" 
            icon={ mdiHeartOutline } 
            isSelected={ selectedTab === 'favorites' } 
            setSelected={ setSelected } 
            boards={ boards.filter(e => e.isFavorite) }
            name="favorites"
            toggleFavorite={ toggleFavorite } />
            <Category 
            title="PERSO" 
            icon={ mdiAccountOutline } 
            isSelected={ selectedTab === 'personal' } 
            setSelected={ setSelected }  
            boards={ boards.filter(e => e.circles.map(e => e._id).includes(userCircle._id)).sort(sortBoards) }
            name="personal"
            toggleFavorite={ toggleFavorite } />
            {
                circles.filter(e => e._id !== userCircle._id).map((e, i) => 
                    <Category
                    title={ e.name.toUpperCase() }
                    icon={ mdiBlurRadial } 
                    isSelected={ selectedTab === e._id }
                    setSelected={ setSelected }
                    boards={ boards.filter(board => board.circles.map(circle => circle._id).includes(e._id)).sort(sortBoards) }
                    name={ e._id }
                    toggleFavorite={ toggleFavorite }
                    />
                )
            }
        </div>       
    )
}

function mapStateToProps({ boards, userCircle, user, circles }) {
    return {
        boards, userCircle, user, circles
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loadBoards: (boards, user) => {
            dispatch({ type: 'modifyUser', user })
            dispatch({ type: 'loadBoards', boards })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyBoards);

const styles = {
    page_container: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'scroll',
        maxHeight: '100vh',
        width: '100%'
    },
    section: {
        width: '100%',
        maxWidth: '100%',
        paddingLeft: 20,
        paddingRight: 20,
        boxSizing: 'border-box',
        display: 'grid',
        gridTemplateRows: "40px 1fr",
        marginBottom: 30
    },
    cards_container: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%',
        paddingTop: 20
    },
    section_title: {
        margin: 0,
        color: '#343a40',
        fontSize: '0.8rem'
    },
    header: {
        marginTop: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid rgba(0, 0, 0, 0.2)',
        height: '40px',
        marginRight: 20,
        marginLeft: 20,
    },
    section_menu: {
        display: 'flex',
        marginRight: 15
    },
    header_title: {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer'
    }
}