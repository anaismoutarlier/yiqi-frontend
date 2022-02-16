import React, { useState, useEffect, useContext } from 'react'

//STYLES______________________________
import './connection.css'
import defaultstyles from '../../defaultstyles'

//HELPER FUNCTIONS_________________________
import combineStyles from '../../helpers/combineStyles'

//COMPONENTS_____________________________
import SignIn from '../../components/SignIn'
import SignUp from '../../components/SignUp'

//LOGIN________________________
import FacebookLogin from 'react-facebook-login'
import GoogleLogin from 'react-google-login'

//CONTEXT________________________
import { MediaContext } from '../../hooks/media-context'
import { ThemeContext } from '../../hooks/theme-context'

const Connection = ({ toggleNav }) => {
    //CONTEXT______________________________
    const { changeTheme } = useContext(ThemeContext)
    const { media } = useContext(MediaContext)

    //STATE HOOKS________________
    const [display, setDisplay] = useState('signup')

    //EFFECT HOOKS_____________________
    useEffect(() => {
        toggleNav(false)
        
        return () => toggleNav(true)
    }, [toggleNav])

    //FUNCTIONS_____________________
    const responseFacebook = response => {
        console.log(response)
    }

    const responseGoogle = response => {
        console.log(response)
    }

    return (
        <div style={ styles.page_container }>
            <div style={ media === 'mobile' ? combineStyles(styles.wrapper, styles.wrapper_mobile) : styles.wrapper }>
                <div style={ styles.content_container }>
                    { display === 'signup' ? <SignUp /> : <SignIn changeTheme={ changeTheme }/> }
                    <div style={ styles.divider_container }>
                        <div style={ styles.divider_wrapper }>
                            <div style={ styles.divider }></div>
                        </div>
                        <div style={ styles.divider_content_wrapper }>
                            <h2 style={ { margin: 0, fontSize: '1rem' } }>OU</h2>
                        </div>
                        <div style={ styles.divider_wrapper }>
                            <div style={ styles.divider }></div>
                        </div>
                    </div>
                    <FacebookLogin
                        appId=''
                        autoLoad={true}
                        fields="name,email,picture"
                        callback={responseFacebook}
                        language="fr_FR"
                        textButton="SE CONNECTER AVEC FACEBOOK"
                        cssClass="facebook_button"
                    />
                    <GoogleLogin
                        clientId=''
                        buttonText='SE CONNECTER AVEC GOOGLE'
                        onSuccess={ responseGoogle }
                        onFailure={ responseGoogle }
                        cookiePolicy={ 'single_host_origin' }
                        className="google_button"
                    />
                </div>
                <div style={ styles.menu }>
                    {
                        display === 'signup' ?
                        <button style={ media === 'mobile' ? combineStyles(defaultstyles.button, { width: '260px' }) : defaultstyles.button } onClick={ ()=>setDisplay('signin') }>Vous avez déjà un compte? Connectez-vous</button>
                        : <button style={ defaultstyles.button } onClick={ ()=>setDisplay('signup') }>Pas encore de compte? Inscrivez-vous</button>
                    }
                </div>
            </div>
        </div>
    )
}

export default Connection;

const styles = {
    page_container: {
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: `url('/images/homeR.png')`,
        backgroundSize: 'cover',
    },
    wrapper: {
        width: '400px',
        display: 'grid',
        gridTemplateRows: '1fr 90px',
        borderRadius: '10px',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: 40
    },
    wrapper_mobile: {
        width: '340px',
        margin: 'auto',
        padding: '15px 10px',
        boxSizing: 'border-box'
    },
    menu: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    divider_container: {
        display: 'grid',
        gridTemplateColumns: '1fr 35px 1fr',
        width: '80%',
        height: '35px',
        color: '#6c757d',
        marginTop: 20,
        marginBottom: 20
    },
    divider_wrapper: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center'
    },
    divider: {
        height: '1px',
        width: '100%',
        backgroundColor: '#6c757d'
    },
    divider_content_wrapper: {
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    content_container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%'
    },
    nav_button: {
        backgroundColor: '#343a40',
        color: '#fff',
        height: '2rem',
        padding: 5,
        boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.4)',
        borderRadius: '3px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        margin: 5
    },
}