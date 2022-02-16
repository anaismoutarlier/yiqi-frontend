import { useState, useEffect, useContext } from 'react'

//NAVIGATION_______________________
// import { Link } from 'react-router-dom'

//REDUX___________________________
import { connect } from 'react-redux'

//HELPER FUNCTIONS__________________
import combineStyles from '../helpers/combineStyles'

//STYLES_________________________
import defaultstyles from '../defaultstyles'
import modalstyles from '../components/AddMenu/AddMenuModals/modalstyles'

//UI_____________________
import { mdiAttachment, mdiCellphone, mdiEmail, mdiLink, mdiMessageFlashOutline, mdiMessageText, mdiPin, mdiVideo } from '@mdi/js'
import Icon from '@mdi/react'

//COMPONENTS__________________
import Modal from '../components/Modal'
// import Button from '../components/Button'
import FloatingLabelInput from '../components/FloatingLabelInput'
import Select from './Select'
import Pin from './Pin'

//CONTEXT___________________
import { ThemeContext } from '../hooks/theme-context'

const ResponseModal = ({ open, pin, toggleModal, user }) => {
    //CONTEXT_______________________________
    const { theme } = useContext(ThemeContext)

    //STATE HOOKS___________________________
    const [circles, setCircles] = useState([])
    const [toTransfer, setToTransfer] = useState(false)
    const [circlesTransfer, setCirclesTransfer] = useState([]) 
    const [methodSelected, setMethodSelected] = useState('')
    const [notificationMethod, setNotificationMethod] = useState(false)
    const [notification, setNotification] = useState('')
    const [linkResponse, setLinkResponse] = useState('')
    const [fileAttached, setFileAttached] = useState(false)

    //EFFECT HOOKS_________________________
    useEffect(() => {
        const getDynamicCircles = async () => {
            const data = await fetch(`${global.BACKEND}/pins/sharecircles`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user._id })
            })

            const json = await data.json()

            if (json.result) {
                setCircles(json.circles)
            }
        }

        getDynamicCircles()
    }, [user._id])

    //FUNCTIONS_________________________
    const handleNotificationModification = content => {
        setNotification(content)
    }
    const handleLinkResponse = content => {
        setLinkResponse(content)
    }
    
    const handleLink = method => {
        console.log('Méthode sélectionnée : ', methodSelected === 1 ? 'Appel' : methodSelected === 2 ? 'Sms' : methodSelected === 3 ? 'Mail' : '')
    }
    
    const handleTransfer = value => {
        setCirclesTransfer(value)
    }

    const toggleResponseMethod = type => {
        return pin.response_methods.find(e => e.type === type) ? true : false
    }

    const validate = () => {

    }

    const discordLinks = ['https://discord.gg/2UZ6qZs99f', 'https://discord.gg/3XDhZCxcCK', 'https://discord.gg/5e2UqJXaHW', 'https://discord.gg/Nz4DuJYnuC', 'https://discord.gg/P8wVtPk3Ne', 'https://discord.gg/SKGc7dcu4U', 'https://discord.gg/ZXj3kzdPnr', 'https://discord.gg/p6HYmG44Wg', 'https://discord.gg/uVNJG9YK2V', 'https://discord.gg/w7c27s36Rn']

    //temporaire
    const data = [{value: 'cercle 1', label: 'cercle 1'}, {value: 'cercle 5', label: 'cercle 5'}, {value: 'cercle 2', label: 'cercle 2'}, {value: 'cercle 3', label: 'cercle 3'}, {value: 'cercle 4', label: 'cercle 4'}]
    useEffect(()=>{console.log(circlesTransfer)}, [circlesTransfer])
    useEffect(()=>{console.log(notification)}, [notification])

    return (
        <Modal open={open} toggleModal={toggleModal}>                             
            <div style={ combineStyles(modalstyles.body, {backgroundColor: 'rgba(255,255,255,0.93)', padding: 20}) } className="hide-scrollbar">
                <div style={combineStyles(modalstyles.modal_header, {marginBottom: 15})}>
                    <Icon
                        path={mdiPin}
                        rotate={45}
                        size={0.6}
                        color={theme.foreground.color}
                        style={{ marginRight: 8, marginTop: 2 }}
                    />
                    <h5 style={defaultstyles.subtitle}>Interagir avec {/*{ pin.creator.name } */}</h5>
                </div>
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
                        <Pin pin={ pin } preview />
                        {
                            pin.public &&
                            <>
                            {
                                !toTransfer ? 
                                <div style={{marginLeft: 20, borderLeft: '1px solid rgba(0,0,0,0.1)', padding: 10, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>    
                                    <h6 style={{margin: 10}}>{/* { pin.creator.name } */} souhaite que son mot soit diffusé largement.</h6>
                                    <h6 style={{margin: 10,}}>Tu penses à d'autres cercles qui pourraient être intéressés ?!</h6>
                                    <button style={combineStyles(defaultstyles.button, theme.background_transparent)} onClick={() => setToTransfer(true)}>Je passe le mot !</button>
                                </div>
                                :
                                <div style={{marginLeft: 20, borderLeft: '1px solid rgba(0,0,0,0.1)', padding: 10, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>    
                                    <h6 style={{margin: 10}}>Sélectionnez les cercles :</h6>
                                    <Select
                                        values={ circles }
                                        handleChange={(e)=>handleTransfer(e)}
                                        placeholder="Cercles"
                                        name="circles"
                                        style={{ marginBottom: '20px' }}
                                        multiple
                                        />
                                    {/* CERCLES DU USER */}
                                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
                                        <button style={combineStyles(defaultstyles.button)} onClick={() => setToTransfer(false)}>Annuler</button>
                                        <button style={combineStyles(defaultstyles.button, theme.background_transparent)} onClick={() => {console.log('Transfert effectué : cercles ', circlesTransfer.map((e)=>e.label)); setToTransfer(false)}}>Partager</button>
                                    </div>
                                </div>

                            }
                            </>
                        }
                    </div>
                    <div style={combineStyles(modalstyles.modal_header, {margin: '15px 0px'})}></div>

            
                {
                    pin.direct && 
                    <>
                        <h5 style={{margin: 10}}>Tu souhaites entrer en contact avec {/*{pin.creator.name}*/} par :</h5>

                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap'}} className="hide-scrollbar">
                            
                            { toggleResponseMethod('phone') && 
                                <span onClick={()=>{setNotificationMethod(false); setMethodSelected(1)}} style={combineStyles(methodSelected === 1 ? theme.background_transparent : theme.foreground, {boxShadow: '1px 1px 10px 1px rgba(0,0,0,0.2)', cursor: 'pointer', margin: 10, padding: '8px 15px', borderRadius: 20})}>
                                    <Icon
                                        path={mdiCellphone}
                                        size={0.6}
                                        color={methodSelected === 1 ? theme.background.color : theme.foreground.color}
                                        style={{ marginRight: 8, marginTop: 2 }}
                                    />
                                    Appel
                                </span>
                            }
                            {
                                toggleResponseMethod('text') && 
                                <span onClick={()=>{setNotificationMethod(false); setMethodSelected(2)}} style={combineStyles(methodSelected === 2 ? theme.background_transparent : theme.foreground, {boxShadow: '1px 1px 10px 1px rgba(0,0,0,0.2)', cursor: 'pointer', margin: 10, padding: '8px 15px', borderRadius: 20})}>
                                    <Icon
                                        path={mdiMessageText}
                                        size={0.6}
                                        color={methodSelected === 2 ? theme.background.color : theme.foreground.color}
                                        style={{ marginRight: 8, marginTop: 2 }}
                                    />
                                    SMS
                                </span>
                            }
                            {
                                toggleResponseMethod('email') && 
                                <span onClick={()=>{setNotificationMethod(false); setMethodSelected(3)}} style={combineStyles(methodSelected === 3 ? theme.background_transparent : theme.foreground, {boxShadow: '1px 1px 10px 1px rgba(0,0,0,0.2)', cursor: 'pointer', margin: 10, padding: '8px 15px', borderRadius: 20})}>
                                    <Icon
                                        path={mdiEmail}
                                        size={0.6}
                                        color={methodSelected === 3 ? theme.background.color : theme.foreground.color}
                                        style={{ marginRight: 8, marginTop: 2 }}
                                    />
                                    Mail
                                </span>
                            }
                            {
                                toggleResponseMethod('visio') &&
                                (methodSelected === 6 ?
                                    <a href={`${discordLinks[Math.floor(Math.random() * 10)]}`} rel="noreferrer" target="_blank" onClick={()=>{setNotificationMethod(false); setMethodSelected(6)}} style={combineStyles(methodSelected === 6 ? theme.background_transparent : theme.foreground, {textDecoration: 'none', boxShadow: '1px 1px 10px 1px rgba(0,0,0,0.2)', cursor: 'pointer', margin: 10, padding: '8px 15px', borderRadius: 20})}>Go to Discord !</a>
                                    :
                                    <span onClick={()=>{setNotificationMethod(false); setMethodSelected(6)}} style={combineStyles(methodSelected === 6 ? theme.background_transparent : theme.foreground, {boxShadow: '1px 1px 10px 1px rgba(0,0,0,0.2)', cursor: 'pointer', margin: 10, padding: '8px 15px', borderRadius: 20})}>
                                        <Icon
                                            path={mdiVideo}
                                            size={0.6}
                                            color={methodSelected === 6 ? theme.background.color : theme.foreground.color}
                                            style={{ marginRight: 8, marginTop: 2 }}
                                        />
                                        Visio
                                    </span>
                                )
                            }
                            {
                                toggleResponseMethod('link') &&
                                (methodSelected === 4 ?
                                    <a href={pin.response_method.canal.url} target="_blank" rel="noreferrer" onClick={()=>{setNotificationMethod(false); setMethodSelected(4)}} style={combineStyles(methodSelected === 4 ? theme.background_transparent : theme.foreground, {textDecoration: 'none', boxShadow: '1px 1px 10px 1px rgba(0,0,0,0.2)', cursor: 'pointer', margin: 10, padding: '8px 15px', borderRadius: 20})}>{pin.response_method.canal.url}</a>
                                    :
                                    <span onClick={()=>{setMethodSelected(4); setNotificationMethod(false)}} style={combineStyles(methodSelected === 4 ? theme.background_transparent : theme.foreground, {textDecoration: 'none', boxShadow: '1px 1px 10px 1px rgba(0,0,0,0.2)', cursor: 'pointer', margin: 10, padding: '8px 15px', borderRadius: 20})}>
                                        <Icon
                                            path={mdiLink}
                                            size={0.6}
                                            color={methodSelected === 4 ? theme.background.color : theme.foreground.color}
                                            style={{ marginRight: 8, marginTop: 2 }}
                                        />
                                        Lien
                                    </span>
                                )                                                                               
                            }
                            <span onClick={()=>{setMethodSelected(5); setNotificationMethod(true)}} style={combineStyles(methodSelected === 5 ? theme.background_transparent : theme.foreground, {boxShadow: '1px 1px 10px 1px rgba(0,0,0,0.2)', cursor: 'pointer', margin: 10, padding: '8px 15px', borderRadius: 20})}>
                                <Icon
                                    path={mdiMessageFlashOutline}
                                    size={0.6}
                                    color={methodSelected === 5 ? theme.background.color : theme.foreground.color}
                                    style={{ marginRight: 8, marginTop: 2 }}
                                />
                                Notification
                            </span>
                        </div>    
                </>
                }

                { !pin.direct && 
                <>
                    <h5 style={{margin: 10}}>Tu souhaites que {/* {pin.creator.name}*/} te recontacte par :</h5>
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap'}} className="hide-scrollbar">
                        
                        { 
                            toggleResponseMethod('phone') && 
                            <span onClick={()=>{setNotificationMethod(false); setMethodSelected(1)}} style={combineStyles(methodSelected === 1 ? theme.background_transparent : theme.foreground, {boxShadow: '1px 1px 10px 1px rgba(0,0,0,0.2)', cursor: 'pointer', margin: 10, padding: '8px 15px', borderRadius: 20})}>
                                <Icon
                                    path={mdiCellphone}
                                    size={0.6}
                                    color={methodSelected === 1 ? theme.background.color : theme.foreground.color}
                                    style={{ marginRight: 8, marginTop: 2 }}
                                />
                                Appel
                            </span>
                        }
                        {
                            toggleResponseMethod('text') && 
                            <span onClick={()=>{setNotificationMethod(false); setMethodSelected(2)}} style={combineStyles(methodSelected === 2 ? theme.background_transparent : theme.foreground, {boxShadow: '1px 1px 10px 1px rgba(0,0,0,0.2)', cursor: 'pointer', margin: 10, padding: '8px 15px', borderRadius: 20})}>
                                <Icon
                                    path={mdiMessageText}
                                    size={0.6}
                                    color={methodSelected === 2 ? theme.background.color : theme.foreground.color}
                                    style={{ marginRight: 8, marginTop: 2 }}
                                />
                                Sms
                            </span>
                        }
                        {
                            toggleResponseMethod('email') && 
                            <span onClick={()=>{setNotificationMethod(false); setMethodSelected(3)}} style={combineStyles(methodSelected === 3 ? theme.background_transparent : theme.foreground, {boxShadow: '1px 1px 10px 1px rgba(0,0,0,0.2)', cursor: 'pointer', margin: 10, padding: '8px 15px', borderRadius: 20})}>
                                <Icon
                                    path={mdiEmail}
                                    size={0.6}
                                    color={methodSelected === 3 ? theme.background.color : theme.foreground.color}
                                    style={{ marginRight: 8, marginTop: 2 }}
                                />
                                Mail
                            </span>
                        }
                        {
                            toggleResponseMethod('visio') &&
                            (methodSelected === 6 ?
                            <a href={`${discordLinks[Math.floor(Math.random() * 10)]}`} target="_blank" rel="noreferrer" onClick={()=>{setNotificationMethod(false); setMethodSelected(6)}} style={combineStyles(methodSelected === 6 ? theme.background_transparent : theme.foreground, {textDecoration: 'none', boxShadow: '1px 1px 10px 1px rgba(0,0,0,0.2)', cursor: 'pointer', margin: 10, padding: '8px 15px', borderRadius: 20})}>Go to Discord !</a>
                            :
                            <span onClick={()=>{setNotificationMethod(false); setMethodSelected(6)}} style={combineStyles(methodSelected === 6 ? theme.background_transparent : theme.foreground, {boxShadow: '1px 1px 10px 1px rgba(0,0,0,0.2)', cursor: 'pointer', margin: 10, padding: '8px 15px', borderRadius: 20})}>
                                <Icon
                                    path={mdiVideo}
                                    size={0.6}
                                    color={methodSelected === 6 ? theme.background.color : theme.foreground.color}
                                    style={{ marginRight: 8, marginTop: 2 }}
                                />
                                Visio
                            </span>
                            )
                        }
                        {
                            toggleResponseMethod('link') &&
                            (methodSelected === 4 ?
                            <a href={pin.response_method.canal.url} target="_blank" rel="noreferrer" onClick={()=>{setNotificationMethod(false); setMethodSelected(4)}} style={combineStyles(methodSelected === 4 ? theme.background_transparent : theme.foreground, {textDecoration: 'none', boxShadow: '1px 1px 10px 1px rgba(0,0,0,0.2)', cursor: 'pointer', margin: 10, padding: '8px 15px', borderRadius: 20})}>Discord</a>
                            :
                            <span onClick={()=>{setMethodSelected(4); setNotificationMethod(false)}} style={combineStyles(methodSelected === 4 ? theme.background_transparent : theme.foreground, {textDecoration: 'none', boxShadow: '1px 1px 10px 1px rgba(0,0,0,0.2)', cursor: 'pointer', margin: 10, padding: '8px 15px', borderRadius: 20})}>
                                <Icon
                                    path={mdiLink}
                                    size={0.6}
                                    color={methodSelected === 4 ? theme.background.color : theme.foreground.color}
                                    style={{ marginRight: 8, marginTop: 2 }}
                                />
                                Lien
                            </span>
                            )                                                                               
                        }
                        <span onClick={()=>{setMethodSelected(5); setNotificationMethod(true)}} style={combineStyles(methodSelected === 5 ? theme.background_transparent : theme.foreground, {boxShadow: '1px 1px 10px 1px rgba(0,0,0,0.2)', cursor: 'pointer', margin: 10, padding: '8px 15px', borderRadius: 20})}>
                            <Icon
                                path={mdiMessageFlashOutline}
                                size={0.6}
                                color={methodSelected === 5 ? theme.background.color : theme.foreground.color}
                                style={{ marginRight: 8, marginTop: 2 }}
                            />
                            Notification
                        </span>
                        {/* <span>modes de réponse en one select only (span qui devient theme.color quand selected + expand si nécessessaire - notif...) - prévoir le cas avec ou sans bouton valider (ehpad, enfants) </span> */}
                    </div>    
                </>
                }

                {
                    notificationMethod &&
                    <>
                        <div style={combineStyles(modalstyles.modal_header, {margin: '15px 0px'})}></div>
                        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                <FloatingLabelInput type="text-area" label={`Réponds brièvement à ${pin.creator.name} ou fais-lui passer un fichier ou un lien...`} height="5rem" value={ notification } name="content" onChange={ (e)=>handleNotificationModification(e) }/>
                                <div style={{width: '80%', display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
                                    <h5 style={{width: '10%', margin: 0, marginBottom: 20, marginRight: 10}}>Lien :</h5>
                                    <FloatingLabelInput type="text" label={`Copie/colle un lien pour ${pin.creator.name}...`} height="5rem" value={ linkResponse } name="content" onChange={ (e)=>handleLinkResponse(e) }/>
                                </div>
                                <Icon
                                    onClick={()=>setFileAttached(!fileAttached)}
                                    path={mdiAttachment}
                                    rotate={90}
                                    size={1}
                                    color={theme.foreground.color}
                                    style={{ cursor: 'pointer', boxShadow: '1px 1px 10px 1px rgba(0,0,0,0.2)', padding: 5, borderRadius: '50%', border: fileAttached ? `1px solid ${theme.foreground.color}` : '', marginRight: 8, marginTop: 2 }}
                                />
                        </div>
                    </>
                }
                <div style={combineStyles(modalstyles.modal_header, {margin: '15px 0px'})}></div>

                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
                    <button style={defaultstyles.button} onClick={() => toggleModal()}>Annuler</button>
                    <button style={combineStyles(defaultstyles.button, theme.background_transparent)} onClick={(method) => {handleLink(methodSelected); toggleModal()}}>{pin.direct ? `J'entre en contact avec ${''/*pin.creator.name*/} !` : `A tout à l'heure ${''/*pin.creator.name*/} !`}</button>
                </div>
            </div>
        </Modal>
    )
}

function mapStateToProps({ user }) {
    return { user }
}
export default connect(mapStateToProps, null)(ResponseModal)
