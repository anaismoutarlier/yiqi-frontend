import React, { useState } from 'react'

//STYLES_______________________
import defaultstyles from '../defaultstyles'

//HELPER FUNCTIONS_________________
import combineStyles from '../helpers/combineStyles'

//NAVIGATION___________________
import { Redirect } from 'react-router-dom'

//REDUX______________________________
import { connect } from 'react-redux'

//UI____________________________
import { mdiArrowRightThick } from '@mdi/js'
import Icon from '@mdi/react'

//COMPONENTS______________________________
import FloatingLabelInput from './FloatingLabelInput'
import Toggle from './Toggle'

//COOKIES___________________________________
import Cookie from 'universal-cookie'

//CONTEXT_________________________
import { themes } from '../hooks/theme-context'

const cookies = new Cookie()

const SignIn = ({ isLogged, loginUser, changeTheme }) => {
    //STATE HOOKS_______________________
    const [user, setUser] = useState({})
    const [isFocused, setIsFocused] = useState('email')
    const [acceptCookies, setAcceptCookies] = useState(false)

    //FUNCTIONS_________________
    const addData = (value, key) => {
        setUser({ ...user, [key]: value })
    }

    const handleSignIn = async () => {
        const data = await fetch(`${global.BACKEND}/users/account`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        })

        const { result, user: newUser, circle, circles } = await data.json()

        if (result) {
            let days = 14;
            if (acceptCookies) cookies.set('token', newUser.token, { path: '/', maxAge: days * 24 * 60 * 60 })
            changeTheme(newUser.preferences.theme)
            loginUser(newUser, true, circle, circles)
        }
    }

    const handleEnterPress = (e) => {
        if (e.key === 'Enter' || e.key === 'Tab') {
            if (isFocused === 'email') {
                setIsFocused('password')
            } else {
                handleSignIn()
            }
        }
    }

    const handleCookieToggle = (e) => {
        setAcceptCookies(e.target.checked)
    }

    return isLogged ? <Redirect to="/" /> : (
        <>
            <h1 style={ combineStyles(defaultstyles.title, { marginBottom: 15 }) }>CONNEXION</h1>
            <FloatingLabelInput
            value={ user.email ? user.email : '' }
            name="email"
            type="text"
            label="ADRESSE MAIL"
            onChange={ addData }
            isFocused={ isFocused === 'email' }
            onKeyDown={ handleEnterPress }
            />
            <FloatingLabelInput
            value={ user.password ? user.password : '' }
            name="password"
            type="password"
            label="MOT DE PASSE"
            onChange={ addData }
            isFocused={ isFocused === 'password' } 
            onKeyDown={ handleEnterPress }
            />
            <div style={ styles.cookie_container }>
            <p style={ combineStyles(defaultstyles.subtitle, { marginRight: 10, verticalAlign: 'top' }) }>Se souvenir de moi</p>
            <Toggle
            onChange={ handleCookieToggle }
            offColor="#343a40"
            />
            </div>
            <button style={ combineStyles(defaultstyles.button, { width: '81%' }) } onClick={ ()=>handleSignIn() }>
                CONNEXION
                <Icon
                    path={ mdiArrowRightThick }
                    size={ 0.7 }
                    color="white"
                    style={ { paddingLeft: 5 } }  
                />
            </button>
        </>
    )
}

function mapStateToProps({ isLogged }) {
    return {
        isLogged
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

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)

const styles = {
    cookie_container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '100%'
    }
}