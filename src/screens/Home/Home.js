import { useState, useContext, useEffect } from "react"

//STYLES______________________
import { defaultstyles } from "../../styles"

//REDUX________________________
import { useSelector, useDispatch } from "react-redux"

//ROUTER_______________________
import { Redirect } from "react-router-dom"

//CONTEXT_______________________
import { MediaContext } from '../../hooks/media-context'
import { ThemeContext } from '../../hooks/theme-context'

//UI___________________________
import { Icon } from "@mdi/react"
import { mdiWeatherSunset, mdiWeatherSunny, mdiWeatherNight } from '@mdi/js';

//HELPER FUNCTIONS___________________
import combineStyles from '../../helpers/combineStyles'

//COMPONENTS____________________
import AddMenu from "../../components/AddMenu"
import ViewMenu from "./ViewMenu"
import MyBoard from "./MyBoard"
import Boards from "./Boards"
import Nav from "../../components/Nav"
import MobileNav from '../../components/MobileNav'
import Sider from "../../components/Sider"

const Home = () => {
    //CONTEXT__________________
    const media = useContext(MediaContext)
    const { theme } = useContext(ThemeContext)

    //STORE____________________
    const user = useSelector(({ user }) => user)
    const dispatch = useDispatch()

    //STATE____________________
    const [view, setView] = useState(user?.preferences?.view || "myBoard")
    const [sunData, setSunData] = useState({ sunset: 19, sunrise: 6 })

    const time = new Date().getHours()

    //EFFECTS____________________
    useEffect(() => {
        const getSunData = async() => {
            try {
                const data = await fetch('https://api.sunrise-sunset.org/json?lat=46.2276%lng=2.2137&formatted=0')
                const { status, results: { sunset, sunrise } } = await data.json()

                if (status === 'OK') {
                    setSunData({ sunset: new Date(sunset).getHours(), sunrise: new Date(sunrise).getHours() })
                }
            } catch (error) {
                console.error(error)
            }
        }
        getSunData()
    }, [])

    //FUNCTIONS___________________
    const toggleView = async view => {
        const { token, preferences = {} } = user
        const data = await fetch(`${global.BACKEND}/users/account`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: token, key: "preferences", value: Object.assign({ ...preferences, view }) })
        })
        const { result, user: newUser } = await data.json()

        if (result) dispatch({ type: "modifyUser", user: newUser })

        setView(view)
    }

    if (!user) <Redirect to="/" /> 

    const weatherIcon = time === sunData.sunrise || time === sunData.sunset ? mdiWeatherSunset : time > sunData.sunrise && time < sunData.sunset ? mdiWeatherSunny : mdiWeatherNight

    const { container } = styles
    const { mobile_nav_page, nav_page, subtitle, menu_header } = defaultstyles

    const background = combineStyles(container, { background: `url(${user?.preferences?.background})`, backgroundPosition: "cover" })
    
    return (
        <div style={ media === "desktop" ? nav_page : mobile_nav_page }>
            {
                media === "desktop"
                ? <Nav />
                : <MobileNav />
            }
            {/* <AddMenu /> */}
            <ViewMenu setView={ toggleView } />
            <AddMenu />
            <div style={ background }>
                <Sider>
                    <div style={ combineStyles(menu_header, { borderBottom: `1px solid ${theme.foreground.color}`}) }>
                        <Icon
                        path={ weatherIcon }
                        size={ 0.8 }
                        color={ theme.foreground.color }
                        style={{ marginRight: 5 }}
                        />
                        <h2 style={ combineStyles(subtitle, theme.foreground) }><span>{ time > 7 && time < 17 ? "Bonjour" : "Bonsoir" }</span>, Anaïs!</h2>
                    </div>
                </Sider>
                { 
                    view === "myBoard" 
                    ? <MyBoard />
                    : view === "allBoards"
                    ? <Boards />
                    : null
                }
            </div>
        </div>
    )
}

export default Home

const styles = {
    container: {
        display: "grid",
        boxSizing: 'border-box',
        height: '100%',
        maxHeight: '100%',
        gridTemplateColumns: 'auto 1fr'
    },
}