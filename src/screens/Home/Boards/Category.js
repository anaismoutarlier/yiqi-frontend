import React, { useContext } from 'react'
import '../../../App.css'

//COMPONENTS____________________________________
import CardBoard from '../../../components/CardBoard'
import MenuBadge from '../../../components/MenuBadge'

//UI___________________________
import { Icon } from "@mdi/react"
import { mdiCogOutline, mdiAccountGroupOutline, mdiBellOutline, mdiChevronDown } from '@mdi/js';

//CONTEXT__________________________
import { ThemeContext } from '../../../hooks/theme-context';
import { MediaContext } from '../../../hooks/media-context'

//HELPER FUNCTIONS_____________________________
import combineStyles from '../../../helpers/combineStyles'

const Category = ({ title, icon, boards, isSelected, setSelected, name, favorite }) => {
    //CONTEXT______________________________
    const { theme } = useContext(ThemeContext)
    const media = useContext(MediaContext)

    const { section, section_title, header, section_menu, header_title, cards_container } = styles

    return (
        <>
        {
            boards.length > 0 &&
            <div style={ section }>
                <div style={ header }>
                    <div 
                    style={ header_title }
                    onClick={ ()=>setSelected(name) }
                    >
                        <Icon
                        path={ icon }
                        size={ 0.7 }
                        color={ theme.foreground.color }
                        style={ { marginRight: 4, marginTop: 2 } }
                        />
                        <h6 style={ section_title }>{ title }</h6>
                        <Icon
                        path={ mdiChevronDown }
                        size={ 1 }
                        color={ theme.foreground.color }
                        style={ { marginLeft: 4, marginTop: 2 } }
                        />
                    </div>
                    {
                        title !== 'FAVORIS' &&
                        <div style={ section_menu }>
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
                    <div style={ media === 'desktop' ? cards_container : combineStyles(cards_container, { justifyContent: 'center' }) } className="hide-scrollbar">
                        { boards.map((board, i) => 
                                <CardBoard 
                                board={ board }
                                key={ i }
                                displayCircle={ name === 'favorites' }
                                favorite={ favorite }
                                />
                            ) }
                    </div>
                }
            </div>
        }
        </>
    )
}

export default Category

const styles = {
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
    },
    cards_container: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        width: '100%',
        paddingTop: 20
    }
}