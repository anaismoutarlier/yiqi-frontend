import React, { useState, useContext } from 'react'

//STYLES____________________
import '../../App.css'
import defaultstyles from '../../defaultstyles'

//COMPONENTS___________________
import ClickableInput from '../ClickableInput'
import Toggle from '../Toggle'
import Modal from '../Modal'

//UI___________________________
import { Icon } from "@mdi/react"
import { mdiAccountSettingsOutline, mdiLockOutline, mdiBrush, mdiPencilOutline, mdiChevronDown } from '@mdi/js';

//HELPER FUNCTIONS___________________
import combineStyles from '../../helpers/combineStyles'

//CONTEXT____________________
import { ThemeContext, themes } from '../../hooks/theme-context'
import { MediaContext } from '../../hooks/media-context'

const Settings = () => {
    //DATA___________________________
    const colors = ['#FFADAD', '#FFD6A5', '#FDFFB6', '#CAFFBF', '#9BF6FF', '#A0C4FF', '#BDB2FF', '#BDB2FF', '#FFFFEB']

    //CONTEXT_______________________
    const { theme, changeTheme } = useContext(ThemeContext)
    const { media } = useContext(MediaContext)

    //STATE HOOKS______________________
    const [user, setUser] = useState({
        firstName: 'Anaïs',
        lastName: 'Moutarlier',
        username: 'anaism',
        email: 'anaism@gmail.com',
        phone: '0606060606',
        birthdate: "1994-12-31",
        password: 'test'
    })

    const [isModifying, setIsModifying] = useState(false)
    const [auth, setAuth] = useState(null)
    const [password, setPassword] = useState(null)
    const [testPassword, setTestPassword] = useState(null)
    
    const [isFocused, setIsFocused] = useState(null)

    const [modalVisible, setModalVisible] = useState(false)
    const [modalSelection, setModalSelection] = useState(null)

    const [selectedTab, setSelectedTab] = useState("general")

    //FUNCTIONS_____________________________
    const addData = (value, key) => {
        setUser({ ...user, [key]: value })
    }

    const checkPassword = (e) => {
        if (auth === user.password) {
            handlePress(e, 'password')
        }
    }

    const confirmPassword = () => {
        if (password === testPassword) {
            setUser({ ...user, password: password })
            setTimeout(()=>{
                setTestPassword(null)
                setPassword(null)
                setAuth(null)
                setIsModifying(false)
                setIsFocused(null)
            }, 500)
        }
    }

    const handlePress = (e, input) => {
        if (e.key === 'Enter' || e.key === 'Tab') {
            setIsFocused(input)
        }
    }

    const toggleModal = () => {
        setModalVisible(!modalVisible)
    }

    const openModal = selection => {
        setModalSelection(selection)
        toggleModal()
    }

    const toggleTabs = tab => {
        selectedTab === tab ? setSelectedTab(null) : setSelectedTab(tab) ;
    }

    return (
        <div style={ media === 'desktop' ? styles.content_container : combineStyles(styles.content_container_mobile, { maxHeight: window.innerHeight - 150 }) } className={ media !== 'desktop' && 'hide-scrollbar' }>
            <div style={ styles.section }>
                <div style={ styles.section_header }>
                    <Icon
                    path={ mdiAccountSettingsOutline }
                    color={ theme.foreground.color }
                    size={ media === 'desktop' ? 0.9 : 0.8 }
                    style={ { marginRight: 6 } } /> 
                    <h4 style={ defaultstyles.subtitle }>GÉNÉRAL</h4>
                    { media !== 'desktop' &&
                        <Icon
                        path={ mdiChevronDown }
                        color={ theme.foreground.color }
                        size={ 0.9 }
                        style={ { marginLeft: 6 } }
                        onClick={ ()=>toggleTabs('general') }
                        />
                    }
                </div>
                {   (media === 'desktop' || selectedTab === 'general') &&
                    <div style={ styles.section_body } className="hide-scrollbar">
                        <div style={ styles.settings_field }>
                            <h6 style={ defaultstyles.subtitle }>NOM</h6>
                            <ClickableInput
                            placeholder="NOM"
                            style={ styles.input }
                            name="lastName"
                            value={ user.lastName ? user.lastName : '' }
                            onChange={ addData }
                            next="firstName"
                            onKeyDown={ handlePress }
                            isFocused={ isFocused === 'lastName' ? true : false }
                            />
                        </div>
                        <div style={ styles.settings_field }>
                            <h6 style={ defaultstyles.subtitle }>PRÉNOM</h6>
                            <ClickableInput
                            placeholder="PRÉNOM"
                            style={ styles.input }
                            name="firstName"
                            value={ user.firstName ? user.firstName : '' }
                            onChange={ addData }
                            next="username"
                            onKeyDown={ handlePress }
                            isFocused={ isFocused === 'firstName' ? true : false }
                            />
                        </div>
                        <div style={ styles.settings_field }>
                            <h6 style={ defaultstyles.subtitle }>PSEUDO</h6>
                            <ClickableInput
                            placeholder="CE NOM SERA AFFICHER PUBLIQUEMENT"
                            style={ styles.input }
                            name="username"
                            value={ user.username ? user.username : '' }
                            onChange={ addData }
                            next="email"
                            onKeyDown={ handlePress }
                            isFocused={ isFocused === 'username' ? true : false }
                            />                            
                        </div>
                        <div style={ styles.settings_field }>
                            <h6 style={ defaultstyles.subtitle }>ADRESSE MAIL</h6>
                            <ClickableInput
                            placeholder="ADRESSE MAIL"
                            style={ styles.input }
                            name="email"
                            value={ user.email ? user.email : '' }
                            onChange={ addData }
                            next="phone"
                            onKeyDown={ handlePress }
                            isFocused={ isFocused === 'email' ? true : false }
                            />
                        </div>
                        <div style={ styles.settings_field }>
                            <h6 style={ defaultstyles.subtitle }>NUMÉRO DE TÉLÉPHONE</h6>
                            <ClickableInput
                            placeholder="NUMÉRO DE TÉLÉPHONE"
                            style={ styles.input }
                            name="phone"
                            value={ user.phone ? user.phone : '' }
                            onChange={ addData }
                            next="birthdate"
                            onKeyDown={ handlePress }
                            isFocused={ isFocused === 'phone' ? true : false }
                            />                            
                        </div>                    
                        <div style={ styles.settings_field }>
                            <h6 style={ defaultstyles.subtitle }>DATE DE NAISSANCE</h6>
                            <ClickableInput
                            type="date"
                            style={ styles.input }
                            name="birthdate"
                            value={ user.birthdate ? user.birthdate : new Date() }
                            onChange={ addData }
                            isFocused={ isFocused === 'birthdate' ? true : false }
                            />                              
                        </div>
                    </div>
                }
                </div> 
            <div style={ styles.section }>
                <div style={ styles.section_header }>
                    <Icon
                    path={ mdiLockOutline }
                    color={ theme.foreground.color }
                    size={ media === 'desktop' ? 0.9 : 0.7 }
                    style={ { marginRight: 6 } } /> 
                    <h4 style={ defaultstyles.subtitle }>SÉCURITÉ ET CONNEXION</h4>
                    { media !== 'desktop' &&
                        <Icon
                        path={ mdiChevronDown }
                        color={ theme.foreground.color }
                        size={ 0.9 }
                        style={ { marginLeft: 6 } }
                        onClick={ ()=>toggleTabs('security') }
                        />
                    }
                </div>
                { (media === 'desktop' || selectedTab === 'security') &&
                    <div style={ styles.section_body } className="hide-scrollbar">
                        <div style={ styles.settings_field }>
                            <h6 style={ defaultstyles.subtitle }>{ isModifying ? "CONFIRMER L'ANCIEN MOT DE PASSE" : "MOT DE PASSE" }</h6>
                            { !isModifying && 
                            <button style={ defaultstyles.button } onClick={ ()=>setIsModifying(true) }>MODIFIER</button>
                            }
                            { isModifying &&
                            <ClickableInput
                            type="password"
                            style={ styles.input }
                            name="auth"
                            value={ auth ? auth : '' }
                            onChange={ setAuth }
                            next="password"
                            onKeyDown={ checkPassword }
                            isFocused={ isFocused === 'auth' ? true : false }
                            isValidated={ auth === user.password }
                            useValidation
                            setFocus={ setIsFocused }
                            />
                            }                            
                        </div>
                        {   isModifying &&
                            <>
                            <div style={ styles.settings_field }>
                                <h6 style={ defaultstyles.subtitle }>NOUVEAU MOT DE PASSE</h6>
                                <ClickableInput
                                type="password"
                                style={ styles.input }
                                name="password"
                                value={ password ? password : '' }
                                onChange={ setPassword }
                                next="testPassword"
                                onKeyDown={ handlePress }
                                isFocused={ isFocused === 'password' ? true : false }
                                isValidated={ password ? true : false }
                                useValidation
                                />                              
                            </div>
                            <div style={ styles.settings_field }>
                                <h6 style={ defaultstyles.subtitle }>CONFIRMER LE MOT DE PASSE</h6>
                                <ClickableInput
                                type="password"
                                style={ styles.input }
                                name="testPassword"
                                value={ testPassword ? testPassword : '' }
                                onChange={ setTestPassword }
                                onKeyDown={ confirmPassword }
                                isFocused={ isFocused === 'testPassword' ? true : false }
                                isValidated={ testPassword && testPassword === password }
                                useValidation
                                />                           
                            </div>
                            <button style={ combineStyles(defaultstyles.button, { alignSelf: 'flex-end' }) } onClick={ ()=>confirmPassword() }>CONFIRMER</button>
                            </>
                        }
                        <div style={ styles.settings_field_column }>
                            <h6 style={ defaultstyles.subtitle }>ACTIVER L'AUTHENTIFICATION À 2 FACTEURS</h6>
                            <div style={ styles.toggle_container }>
                                <Toggle
                                size="large"
                                onColor={ theme.foreground.color }
                                offColor='#343a40'
                                onContent="par SMS"
                                offContent="par SMS"
                                />
                                <Toggle
                                size="large"
                                onColor={ theme.foreground.color }
                                offColor='#343a40'
                                onContent="par mail"
                                offContent="par mail"
                                />                        
                            </div>
                        </div>
                        <div style={ styles.settings_field_column }>
                            <h6 style={ defaultstyles.subtitle }>MODES DE CONTACT PRÉFÉRÉS</h6>
                            <div style={ styles.toggle_container }>
                                <Toggle
                                size="medium"
                                onColor={ theme.foreground.color }
                                offColor='#343a40'
                                onContent="SMS"
                                offContent="SMS"
                                />
                                <Toggle
                                size="medium"
                                onColor={ theme.foreground.color }
                                offColor='#343a40'
                                onContent="mail"
                                offContent="mail"
                                />
                                <Toggle
                                size="large"
                                onColor={ theme.foreground.color }
                                offColor='#343a40'
                                onContent="notification"
                                offContent="notification"
                                />
                            </div>
                        </div>
                    </div>
                }
            </div>
            <div style={ styles.section }>
                <div style={ styles.section_header }>
                    <Icon
                    path={ mdiBrush }
                    color={ theme.foreground.color }
                    size={ media === 'desktop' ? 0.9 : 0.7 }
                    style={ { marginRight: 6 } } /> 
                    <h4 style={ defaultstyles.subtitle }>PRÉFÉRENCES</h4>
                    { media !== 'desktop' &&
                        <Icon
                        path={ mdiChevronDown }
                        color={ theme.foreground.color }
                        size={ 0.9 }
                        style={ { marginLeft: 6 } }
                        onClick={ ()=>toggleTabs('preferences') }
                        />
                    }
                </div>
                {   (media === 'desktop' || selectedTab === 'preferences') &&
                    <div style={ styles.section_body } className="hide-scrollbar">
                        <div style={ combineStyles(styles.settings_field, { marginBottom: 0, paddingBottom: 0 }) }>
                            <h6 style={ defaultstyles.subtitle }>AVATAR</h6>
                            <button style={ defaultstyles.button }>MODIFIER</button>
                        </div>
                        <div style={ styles.settings_field_column }>
                            <h6 style={ defaultstyles.subtitle }>FOND D'ÉCRAN</h6>
                            <div style={ styles.background_preview } onClick={ ()=>openModal('background') }>
                                <Icon
                                path={ mdiPencilOutline }
                                size={ 1 }
                                color={ theme.foreground.color }
                                />
                            </div>
                        </div>
                        <div style={ styles.settings_field_column }>
                            <h6 style={ defaultstyles.subtitle }>THÈME</h6>
                            <div style={ styles.color_menu}>
                                { Object.values(themes).map((e, i) => 
                                    <div
                                        key={ i }
                                        style={ theme.name === e.name ? combineStyles(styles.color_option, themes[e.name].background, { border: '3px solid yellow' }) : combineStyles(styles.color_option, themes[e.name].background) }
                                        onClick={ () => { changeTheme(themes[e.name]) } }
                                    />
                                ) }
                            </div>
                        </div>
                    </div>
                }
            </div>
            <Modal open={ modalVisible } toggleModal={ toggleModal }>
                { 
                    modalSelection === 'background' ?
                    <div style={ styles.modal_body }>
                        <h6 style={ defaultstyles.subtitle }>CHOISISSEZ VOTRE NOUVEAU FOND D'ÉCRAN</h6>
                        <div style={ styles.background_selection }>
                            { colors.map((e, i) => <div key={ i } style={ combineStyles(styles.background_preview_small, { backgroundColor: e }) }></div>) }
                            <div style={ combineStyles(styles.background_preview_small, { backgroundImage: "url('/images/download.jpg')" }) }></div>
                            <div style={ combineStyles(styles.background_preview_small, { backgroundImage: "url('/images/ocean-3605547__480.webp')" }) }></div>
                            <div style={ combineStyles(styles.background_preview_small, { backgroundImage: "url('/images/c4848bd608919a3e309ec546252508f0.jpg')" }) }></div>
                            <div style={ combineStyles(styles.background_preview_small, { backgroundImage: "url('/images/camila-vignoni-fondo-hospital.jpg')" }) }></div>
                            <div style={ combineStyles(styles.background_preview_small, { backgroundImage: "url('/images/DM-Wallpaper-2001-4096x2304a.jpg')" }) }></div>
                            <div style={ styles.background_preview_small }>+</div>
                        </div>
                    </div>
                    : null
                }
            </Modal>
        </div>
    )
}
export default Settings;

const styles = {
    content_container: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        width: '100%',
        height: '100%',
        paddingTop: 30,
        boxSizing: 'border-box',
    },
    content_container_mobile: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        width: '100vw',
        height: '100%',
        marginTop: 15,
        maxHeight: '100% !important',
        overflow: 'scroll',
        boxSizing: 'border-box',
    },
    section: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        margin: '10px auto',
        maxWidth: '100%',
        boxSizing: 'border-box',
        width: '100%',
    },
    section_header: {
        display: 'flex',
        alignItems: 'center',
        width: '86%',
        borderBottom: '1px solid rgba(0, 0, 0, 0.2)',
        paddingBottom: 5,
        boxSizing: 'border-box',
    },
    section_body: {
        border: '1px solid rgba(0, 0 , 0, 0.2)',
        display: "flex",
        flexDirection: 'column',
        margin: "25px 20px 0 20px",
        padding: 15,
        backgroundColor: 'rgba(0, 0 , 0, 0.06)',
        borderRadius: '5px',
        width: '86%',
        height: '65%',
        justifyContent: 'space-between',
        boxSizing: 'border-box',
        minHeight: '440px',
        paddingBottom: 15
    },
    settings_field: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 0
    },
    input: {
        width: '70%',
        fontWeight: 600
    },
    toggle_container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20
    },
    settings_field_column: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        padding: 10,
        margin: 0
    },
    background_preview: {
        width: '80%',
        maxWidth: '300px',
        height: '170px',
        boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.2)',
        borderRadius: '5px',
        marginTop: 20,
        backgroundImage: `url('/images/download.jpg')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        paddingBottom: 10,
        paddingRight: 10,
        cursor: 'pointer'
    },
    color_option: {
        borderRadius: '50px',
        border: '1px solid white',
        height: '25px',
        width: '25px',
        margin: 2,
        boxShadow: '1px 3px 5px 1px rgba(0, 0 , 0, 0.4)',
        cursor: 'pointer',
        boxSizing: 'border-box'
    },
    color_menu: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 20
    },
    background_selection: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    background_preview_small: {
        width: '100px',
        height: '60px',
        boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.2)',
        borderRadius: '5px',
        margin: 20,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '2rem',
        fontWeight: 'bold'
    },
    modal_body: {
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        maxWidth: '500px',
        display: "flex",
        flexDirection: 'column',
        paddingTop: 10,
        alignItems: 'center'
    }
}