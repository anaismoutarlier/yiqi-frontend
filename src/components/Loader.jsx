import { useEffect, useContext } from 'react'

//CONTEXT_______________________
import { ThemeContext } from '../hooks/theme-context'

//NAVIGATION_________________________
import { Redirect } from 'react-router-dom'

//REDUX______________________________
import { useDispatch, useSelector } from 'react-redux'

//COOKIES_______________________________
import Cookie from 'universal-cookie'

const cookies = new Cookie()

function Loader() {
    //CONTEXT_______________________
    const { changeTheme } = useContext(ThemeContext)

    //STORE__________________________
    const user = useSelector(({ user }) => user)
    const dispatch = useDispatch()

    //EFFECT HOOKS______________________
    useEffect(() => {
        const fetchUser = async () => {
            console.log(global.BACKEND)
            const data = await fetch(`${global.BACKEND}/users/account`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token })
                })
    
            const { result, user, circle, circles }  = await data.json()

            if (result) {
                loginUser(user, true, circle, circles)
                changeTheme(user.preferences.theme)
            }
        }

        let token = cookies.get('token')    
        if (token) {
            fetchUser()
        }
    }, [])


    //FUNCTIONS________________________
    const loginUser = (user, bool, circle, circles) => {
        dispatch({ type: 'loginUser', user })
        dispatch({ type: 'setIsLogged', isLogged: bool })
        dispatch({ type: 'setUserCircle', circle })
        dispatch({ type: "setCircleList", circles })
    }

    return user ? 
    <Redirect to="/" /> : <></>
}

export default Loader