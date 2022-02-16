import React, { useEffect } from 'react'

//CONTEXT_______________________
import { themes } from '../hooks/theme-context'

//NAVIGATION_________________________
import { Redirect } from 'react-router-dom'

//REDUX______________________________
import { connect } from 'react-redux'

//COOKIES_______________________________
import Cookie from 'universal-cookie'

const cookies = new Cookie()

function Loader({ loginUser, isLogged, changeTheme }) {
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

    return isLogged ? 
    <Redirect to="/" /> : <></>
}

function mapStateToProps(state) {
    return {
        isLogged: state.isLogged
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loginUser: (user, bool, circle, circles) => {
            dispatch({ type: 'loginUser', user })
            dispatch({ type: 'setIsLogged', isLogged: bool })
            dispatch({ type: 'setUserCircle', circle })
            dispatch({ type: "setCircleList", circles })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Loader)