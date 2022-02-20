import { useState, useContext } from 'react'

//CONTEXT_______________________
import { MediaContext } from '../../hooks/media-context'

//STYLES___________________________
import { defaultstyles } from '../../styles'
import combineStyles from '../../helpers/combineStyles'

//REDUX_____________________________
import { useSelector, useDispatch } from 'react-redux'

//COMPONENTS______________________
import FloatingLabelInput from "../../components/FloatingLabelInput"
import Toggle from "../../components/Toggle"

//UI_____________________
import Icon from '@mdi/react'
import { mdiArrowRightThick } from '@mdi/js'

//NAVIGATION__________________
import { Redirect } from "react-router-dom"

//COOKIES__________________________
import Cookie from "universal-cookie"

const cookies = new Cookie()


export default function SignUp({ setDisplay }) {
    //CONTEXT_____________________
    const media = useContext(MediaContext)

    //STORE_______________________
    const userState = useSelector(({ user }) => user)
    const dispatch = useDispatch()

    //STATE HOOKS_________________
    const [user, setUser] = useState({})
    const [acceptCookies, setAcceptCookies] = useState(false)
    
    //FUNCTIONS____________________
    const setUserData = (key, value) => setUser({ ...user, [key]: value })

    const signin = user => dispatch({ type: 'loginUser', user })

    const handleSignUp = async () => {
        const data = await fetch(`${global.BACKEND}/users/account`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        })
        const { result, userSaved } = await data.json()

        if (result) {
            let days = 14;
            if (acceptCookies) cookies.set('token', userSaved.token, { path: '/', maxAge: days * 24 * 60 * 60 })

            signin(userSaved)
        }
    }

    const toggleCookies = e => setAcceptCookies(e.target.checked)

    const { title, subtitle, button } = defaultstyles
    const { cookie_container, wrapper, text_wrapper } = styles

    const wrapperStyle = { 
        width: media === "mobile" ? '100%' : media === "tablet" ? "80%" : "500px", 
        height: media === "mobile" ? '100%' : media === "tablet" ? "90%" : "auto", 
        borderRadius: media === "mobile" ? "0px" : "10px" 
    }

    return userState.token ? <Redirect to="/home" /> : (
        <div style={ combineStyles(wrapper, wrapperStyle)}>
            <h1 style={ combineStyles(title, { marginBottom: 10 }) }>Créer un compte</h1>
            <form>
                <FloatingLabelInput
                name="email"
                type="text"
                value={ user.email || '' }
                label="ADRESSE MAIL"
                onChange={ setUserData } 
                />
                <FloatingLabelInput
                name="username"
                type="text"
                value={ user.username || '' }
                label="USERNAME"
                onChange={ setUserData }
                />
                <FloatingLabelInput
                name="password"
                type="password"
                value={ user.password || '' }
                label="MOT DE PASSE"
                onChange={ setUserData }
                />
                <div style={ cookie_container }>
                    <p style={ combineStyles(subtitle, { marginRight: 10, verticalAlign: 'top' }) }>Se souvenir de moi</p>
                    <Toggle
                    onChange={ toggleCookies }
                    offColor="#343a40"
                    />
                </div>
                <button type="submit" style={ combineStyles(button, { width: '81%' }) } onClick={ handleSignUp }>
                    s'inscrire
                    <Icon
                        path={ mdiArrowRightThick }
                        size={ 0.7 }
                        color="white"
                        style={ { paddingLeft: 5 } }  
                    />
                </button>
            </form>
            <div style={ text_wrapper }>
                <p style={ combineStyles(subtitle, { textDecoration: "underline" }) } onClick={ ()=>setDisplay('signin') }>Vous avez déjà un compte? Connectez-vous</p>
            </div>
        </div>
    )
}


const styles = {
    cookie_container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '100%'
    },
    wrapper: {
        width: '400px',
        borderRadius: '10px',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: 40,
        display: 'flex',
        flexDirection: "column",
        justifyContent: "center"
    },
    text_wrapper: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        paddingTop: 10
    },
}