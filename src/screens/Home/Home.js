import { useState, useContext } from "react"

//STYLES______________________
import { defaultstyles } from "../../styles"

//REDUX________________________
import { useSelector, useDispatch } from "react-redux"

//ROUTER_______________________
import { Redirect } from "react-router-dom"

//CONTEXT_______________________
import { MediaContext } from '../../hooks/media-context'

//COMPONENTS____________________
import AddMenu from "../../components/AddMenu"
import ViewMenu from "./ViewMenu"
import MyBoard from "./MyBoard"
import Boards from "./Boards"
import Nav from "../../components/Nav"
import MobileNav from '../../components/MobileNav'

const Home = () => {
    //CONTEXT__________________
    const media = useContext(MediaContext)

    //STORE____________________
    const user = useSelector(({ user }) => user)
    const dispatch = useDispatch()

    //STATE____________________
    const [view, setView] = useState(user?.preferences?.view || "myBoard")

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

    const { mobile_nav_page, nav_page } = defaultstyles

    return !user ? <Redirect to="/" /> 
    : (
        <div style={ media === "desktop" ? nav_page : mobile_nav_page }>
            {
                media === "desktop"
                ? <Nav />
                : <MobileNav />
            }
            <>
            {/* <AddMenu /> */}
            <ViewMenu setView={ toggleView } />
            <AddMenu />
            { 
                view === "myBoard" 
                ? <MyBoard />
                : view === "allBoards"
                ? <Boards />
                : null
            }
            </>
        </div>
    )
}

export default Home