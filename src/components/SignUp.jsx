import React, { useState } from 'react'

//REDUX________________
import { connect } from 'react-redux'

//STYLES____________________________
import defaultstyles from '../defaultstyles';

//HELPER FUNCTIONS___________________
import combineStyles from '../helpers/combineStyles';

//NAVIGATION____________________
import { Redirect } from 'react-router';

//UI____________________________
import { mdiArrowRightThick } from '@mdi/js';
import Icon from '@mdi/react'

//COMPONENTS______________________________
import FloatingLabelInput from './FloatingLabelInput';
import Toggle from './Toggle'

//COOKIES___________________________________
import Cookie from 'universal-cookie'
const cookies = new Cookie()

function SignUp({ loginUser, isLogged }) {
    //STATE HOOKS_________________
    const [step, setStep] = useState(1)
    const [user, setUser] = useState({})
    const [isFocused, setIsFocused] = useState('email')
    const [acceptCookies, setAcceptCookies] = useState(false)

    //FUNCTIONS______________________
    const handleClick = () => {
        if (step <= 3) {
            step === 3 ? handleSignUp() : setStep(step + 1) ;
        }
    }

    const addData = (value, key) => {
        setUser({ ...user, [key]: value })
    }

    const handleSignUp = async () => {
        const data = await fetch(`${global.BACKEND}/users/account`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        })
        const json = await data.json()

        if (json.result) {
            let days = 14;
            if (acceptCookies) cookies.set('token', json.userSaved.token, { path: '/', maxAge: days * 24 * 60 * 60 })

            loginUser(json.userSaved, true)
        }
    }

    const handleEnterPress = (e) => {
        if (e.key === 'Enter' || e.key === 'Tab') {
            if (step < 3) {
                if (step === 1) {
                    setIsFocused('username')
                } else if (step === 2) {
                    setIsFocused('password')
                }
                setStep(step + 1)
            } else {
                handleSignUp()
            }
        }
    }

    const handleCookieToggle = (e) => {
        setAcceptCookies(e.target.checked)
    }

    return isLogged ? <Redirect to="/myboards" /> : (
        <>
            <h1 style={ combineStyles(defaultstyles.title, { marginBottom: 15 }) }>CRÉER UN COMPTE</h1>
            {   
                step === 1 ?
                <FloatingLabelInput
                name="email"
                type="text"
                value={ user.email ? user.email : '' }
                label="AdRESSE MAIL"
                onChange={ addData } 
                onKeyDown={ handleEnterPress }
                isFocused={ isFocused === 'email' } 
                />
                : step === 2 ?
                <FloatingLabelInput
                name="username"
                type="text"
                value={ user.username ? user.username : '' }
                label="USERNAME"
                onChange={ addData }
                onKeyDown={ handleEnterPress }
                isFocused={ isFocused === 'username' }
                />
                : step === 3 ?
                <FloatingLabelInput
                name="password"
                type="password"
                value={ user.password ? user.password : '' }
                label="MOT DE PASSE"
                onChange={ addData }
                onKeyDown={ handleEnterPress }
                isFocused={ isFocused === 'password' }
                />
                : null
            }
            <div style={ styles.cookie_container }>
            <p style={ combineStyles(defaultstyles.subtitle, { marginRight: 10, verticalAlign: 'top' }) }>Se souvenir de moi</p>
            <Toggle
            onChange={ handleCookieToggle }
            offColor="#343a40"
            />
            </div>
            <button style={ combineStyles(defaultstyles.button, { width: '100%' }) } onClick={ ()=>handleClick() }>
                {step < 3 ? 'PROCHAINE ÉTAPE' : "S'INSCRIRE" }
                <Icon
                    path={ mdiArrowRightThick }
                    size={0.7}
                    color="white"
                    style={ { paddingLeft: 5 } }  
                />
            </button>
        </>
    )
}

function mapStateToProps(state) {
    return {
        isLogged: state.isLogged,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loginUser: (user, bool) => {
            dispatch({ type: 'loginUser', user })
            dispatch({ type: 'setIsLogged', isLogged: bool })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

const styles = {
    cookie_container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '100%'
    }
}