import React, { useState, useEffect, useContext } from 'react'

//REDUX_________________________
import { connect } from 'react-redux'

//STYLES____________________________
import defaultstyles from '../../defaultstyles';
import './home.css'
import '../../App.css'

//CONTEXT___________________
import { ThemeContext } from '../../hooks/theme-context';
import { MediaContext } from '../../hooks/media-context'

//HELPER FUNCTIONS______________
import combineStyles from '../../helpers/combineStyles';

//COMPONENTS______________
import CardBoardSimple from '../../components/CardBoardSimple';

//UI___________________________
import { Icon } from "@mdi/react"
import { mdiCircleSlice8, mdiWeatherSunset, mdiWeatherSunny, mdiWeatherNight, mdiChevronRight, mdiBlurRadial, mdiNewspaper, mdiEmailPlusOutline, mdiPinOutline  } from '@mdi/js';

const Home = ({ user, isLogged, loadBoards, boards }) => {
    //CONTEXT___________________________
    const { theme } = useContext(ThemeContext)
    const { media } = useContext(MediaContext)

    //STATE HOOKS_______________________
    const [sunData, setSunData] = useState({ sunset: 19, sunrise: 6 })
    
    const time = new Date().getHours()

    useEffect(() => {
        const getSunData = async() => {
            try {
                const data = await fetch('https://api.sunrise-sunset.org/json?lat=46.2276%lng=2.2137&formatted=0')
                const json = await data.json()

                if (json.status === 'OK') {
                    setSunData({ sunset: new Date(json.results.sunset).getHours(), sunrise: new Date(json.results.sunrise).getHours() })
                }
            } catch (error) {
                console.error(error)
            }
        }
        getSunData()
    }, [])

    //DATA
    let notifications = [
        {
            type: 'invitation',
            user: 'Julien',
            board: "Let's dance!",
            time: new Date(2020, 11, 12)
        },
        {
            type: 'invitation',
            user: 'Julien',
            board: "superbuddiez",
            time: new Date(2020, 10, 12)
        },
        {
            type: 'invitation',
            user: 'Julien',
            board: "Let's dance!",
            time: new Date(2020, 9, 12)
        },
        {
            type: 'invitation',
            user: 'Julien',
            board: "Let's dance!",
            time: new Date(2020, 8, 12)
        },
        {
            type: 'response',
            user: 'Quentin',
            time: new Date(2021, 5, 12)

        },
        {
            type: 'response',
            user: 'Quentin',
            time: new Date(2020, 4, 12)
        },
        {
            type: 'response',
            user: 'Quentin',
            time: new Date(2021, 1, 12)
        },
        {
            type: 'newPins',
            board: "superbuddiez",
            newPins: 4,
            time: new Date(2021, 5, 12)

        },
        {
            type: 'newPins',
            board: "étage 1",
            newPins: 4,
            time: new Date(2021, 1, 12)

        },
        
    ]

    //FUNCTIONS______________________________
    const sortBoards = (a, b) => {
        return (a.isActive && !b.isActive) ? -1
        : (b.isActive && !a.isActive) ? 1
        : 0 ;
    }

    const sortActivity = (a, b) => {
        return b.time - a.time;
    }

    return (
        <>
            <div style={ media === 'mobile' ? styles.page_header : combineStyles(styles.page_header) }>
                <Icon
                path={ time === sunData.sunrise || time === sunData.sunset ? mdiWeatherSunset : time > sunData.sunrise && time < sunData.sunset ? mdiWeatherSunny : mdiWeatherNight }
                size={ 1.2 }
                color={ theme.foreground.color }
                style={{ marginRight: 5 }}
                />
                <h2 style={ combineStyles(defaultstyles.subtitle, theme.foreground, { fontSize: '1.2rem' }) }><span>{ time > 7 && time < 17 ? "Bonjour" : "Bonsoir" }</span>, Anaïs!</h2>
            </div>
            { media !== 'mobile' &&
            <div className="hide-scrollbar" style={ combineStyles(styles.section_wrapper, { maxHeight: media !== 'desktop' ? `calc(${window.innerHeight} - 120px)` : `75vh`, paddingBottom: 60 }) }>
            <div style={ styles.header }>
                        <Icon
                            path={ mdiBlurRadial }
                            size={ 0.7 }
                            color={ theme.foreground.color }
                            style={{ marginRight: 5, marginTop: 2 }}
                            />
                        <h2 style={ defaultstyles.subtitle }>Mes cercles</h2>
                        <Icon
                            path={ mdiChevronRight }
                            size={ 0.8 }
                            color={ theme.foreground.color }
                            style={{ marginTop: 3 }}

                        />
                    </div>
                    <div className="hide-scrollbar cards-container" style={ styles.cards_container }>
                        { boards.sort(sortBoards).map((board, i) => <CardBoardSimple board={ board } key={ i } />) }
                    </div>
                </div>
            }
            <div className="hide-scrollbar" style={ combineStyles(styles.section_wrapper, { maxHeight: media !== 'desktop' ? `calc(${window.innerHeight} - 120px)` : `75vh` }) }>
                <div style={ styles.header }>
                    <Icon
                        path={ mdiNewspaper }
                        size={ 0.7 }
                        color={ theme.foreground.color }
                        style={{ marginRight: 5, marginTop: 2 }}
                    />
                    <h2 style={ defaultstyles.subtitle }>Activité récente</h2>
                    <Icon
                        path={ mdiChevronRight }
                        size={ 0.8 }
                        color={ theme.foreground.color }
                        style={{ marginTop: 3 }}
                    />
                </div>
                <div style={ styles.list } className="hide-scrollbar">
                    { notifications.sort(sortActivity).map((e, i) => 
                        <div style={ e.type === 'newPins' ? styles.list_item : combineStyles(styles.list_item, theme.foreground, { borderColor: '1px solid rgba(0, 0, 0, 0.1)' }) } key={ i }>
                            <Icon
                                path={ e.type === 'newPins' ? mdiCircleSlice8 : e.type === 'invitation' ? mdiEmailPlusOutline : e.type === 'response' ? mdiPinOutline : null }
                                size={ e.type === 'response' ? 0.7 : 0.6}
                                color={ e.type === "newPins" ? 'rgba(0, 0, 0, 0.4)' : theme.foreground.color }
                                style={ { marginTop: 4 } }
                                rotate={ e.type === 'response' ? 340 : 0 }
                                />
                            { e.type === 'newPins' ?
                            `${e.newPins} personnes ont postées un pin sur le board "${e.board}"`
                            : e.type === 'invitation' ?
                            `${e.user} t'invite à rejoindre le board "${e.board}"`
                            : e.type === 'response' ?
                            `${e.user} a répondu à ton pin`
                            : null
                            }
                        </div>
                    ) }
                </div>

            </div>
        </>
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

export default connect(MapStateToProps, mapDispatchToProps)(Home)

const styles = {
    page_header: {
        background: 'transparent',
        fontSize: '1.4rem',
        color: '#ffffff',
        fontWeight: 'bold',
        gridColumnStart: 1,
        gridColumnEnd: 'span 2',
        gridRowStart: 1,
        gridRowEnd: 'span 1',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        paddingLeft: 50,
    },
    content_container: {
        display: 'grid',
        gridTemplateColumns: '70% 30%',
        maxHeight: '85vh'
    },
    section_wrapper: {
        boxSizing: 'border-box',
        margin: '40px',
        borderRadius: '5px',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        height: '90%',
        display: 'grid',
        gridTemplateRows: '55px 1fr',
        padding: 10,
        minWidth: '350px',
        maxHeight: '75vh'
    },
    header: {
        borderBottom: '1px solid rgba(0, 0, 0, 0.2)',
        marginRight: 15,
        marginLeft: 15,
        display: 'flex',
        alignItems: 'center',
        marginBottom: 15,
        paddingTop: 15,
        paddingBottom: 10
    },
    menu: {
        display: 'flex'
    },
    title: {
        margin: "5px 2px 5px 5px",
        fontSize: '1rem',
        color: 'grey'
    },
    subtitle: {
        margin: 5,
        fontSize: '0.8rem',
        color: 'grey',
        cursor: 'pointer'
    },
    cards_container: {
        display: 'grid',
        gridTemplateColumns: "repeat(auto-fill, 320px)",
        gridTemplateRows: "repeat(auto-fill, 20px)",
        height: '100%',
        overflow: 'scroll',
        margin: 'auto',
        boxSizing: 'border-box',
        minWidth: '320px',
        maxWidth: '100%',
        marginTop: 20,
        marginBottom: 20,
        alignItems: 'center',
    },
    list: {
        padding: 15,
        overflow: 'scroll',
        paddingTop: 5
    },
    list_item: {
        display: 'grid',
        gridTemplateColumns: '25px 1fr',
        margin: 0,
        padding: 3,
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        borderColor: 'rgba(0, 0, 0, 0.1)',
        color: 'rgba(0, 0, 0, 0.4)',
        textAlign: 'right',
        height: '40px',
        alignItems: 'center',
        fontSize: '0.8rem',
        fontWeight: '600'
    },
    list_item_last: {
        display: 'grid',
        gridTemplateColumns: '25px 1fr',
        margin: 0,
        padding: 3,
        color: 'grey'
    },
}