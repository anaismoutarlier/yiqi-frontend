import React, { useState, useContext } from 'react'

//STYLES_________________________
import { defaultstyles, modalstyles } from '../../../styles'
import '../../../App.css'

//COMPONENTS____________________
import FloatingLabelInput from '../../FloatingLabelInput'
import Select from '../../Select'
import Toggle from '../../Toggle'
import TypeInput from '../../TypeInput'
import Pin from '../../Pin'

//CONTEXT___________________
import { ThemeContext } from '../../../hooks/theme-context'

//HELPER FUNCTIONS______________
import combineStyles from '../../../helpers/combineStyles'

//UI_____________________________
import { mdiChevronDown, mdiChevronUp } from '@mdi/js';
import Icon from '@mdi/react'

//REDUX______________________________
import { connect } from 'react-redux'

//WEBSOCKETS_________________________
import { newPin } from '../../../sockets'

const AddPin = ({ toggleModal, boards, user }) => {
    //CONTEXT______________________________
    const { theme } = useContext(ThemeContext)
    //DATA__________________________________
    const dataSet=[{ value: 'service 1', label: 'Service 1'}, { value: "perso", label: 'Perso'}, {value : 'swing', label: "Swing blah blah blah"}, {value : 'swing1', label: "Swing 1"}, {value : 'swing2', label: "Swing 2"}, {value : 'swing3', label: "Swing 3"}, {value : 'swing4', label: "Swing 4"}, {value : 'swing5', label: "Swing 5"}]
    const colors = ["#FFEBEB", "#FFEDD6", "#FEFFEB", "#EEFFEB", "#EBFDFF", "#EBF2FF", "#DCD6FF", "#FFEBFF", '#FFFFFC']
    const timePickerData=[{ value: 1, label: 'heures' }, { value: 24, label: 'jours' }, { value: 168, label: 'semaines' }]

    //STATE HOOKS_________________________
    const [pin, setPin] = useState({
        content: null,
        response_methods: ['notification'],
        direct: false,
        public: false,
        color: colors[Math.floor(Math.random() * 5)],
        boards: [],
        delay: 12
    })

    const [isExpanded, setIsExpanded] = useState(false)
    const [step, setStep] = useState(1)

    //FUNCTIONS_________________________
    const handlePinModification = (value, name) => {
        setPin(Object.assign({ ...pin }, { [name]: value }))
    }

    const handleResponseMethodSelect = (e, onValue, offValue) => {
        if (e.target.checked) {
            pin.response_methods.find(e => e === onValue) ? handlePinModification(pin.response_methods.filter(e => e !== onValue), 'response_methods') : handlePinModification([ ...pin.response_methods, onValue ], 'response_methods')
        } else {
            pin.response_methods.find(e => e === offValue) ? handlePinModification(pin.response_methods.filter(e => e !== offValue), 'response_methods') : handlePinModification([ ...pin.response_methods, offValue ], 'response_methods')
        }
    }

    const handleSelectBoards = (data, name) => {
        pin.boards.find(e => e === data.value) ? handlePinModification(pin.boards.filter(e => e !== data.value), name) : handlePinModification([ ...pin.boards, data.value ], 'boards')
    }

    const handleToggle = (e, onValue, offValue, name) => {
        handlePinModification(e.target.checked, name)
    }

    const handleSetDelay = (value, type) => {
        handlePinModification(value * type.value, 'delay')
    }

    const validatePin = async () => {
        const data = await fetch(`${global.BACKEND}/pins/new`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ ...pin, creator: user._id })
        })
        const json = await data.json()

        if (json.result) {
            console.log(json)
            newPin(json)
            toggleModal()
        }
    }

    const savePreferences = e => {
        console.log(e.target.checked)
    }

    return (
        <div style={ modalstyles.content }>
            { step === 1 &&
                <div style={ modalstyles.body } className="hide-scrollbar">
                    <div style={ combineStyles(modalstyles.field, { paddingBottom: 0 }) }>
                        <h6 style={ combineStyles(modalstyles.modal_heading, {textAlign: 'justify'}) }>Une idée, un besoin, une question, une recherche d'informations, de contacts, de tuyaux, de partage d'expériences, d'un coup de pouce, d'un outil, de matériel, d'un local... ?</h6>
                        <FloatingLabelInput type="text-area" label="composer votre pin ici" height="5rem" value={ pin.content } name="content" onChange={ handlePinModification }/>
                    </div>
                    <div style={ modalstyles.field }>
                        <h6 style={ modalstyles.modal_heading }>Partager avec . . .</h6>
                        <Select 
                        values={ boards.map(e => { return { value: e._id, label: e.name } }) } 
                        handleChange={ handleSelectBoards } 
                        placeholder="Sélectionner un ou plusieurs boards"
                        name="boards"
                        multiple
                        />
                        <div style={ combineStyles(modalstyles.row_field, { paddingTop: 20 }) }>
                            <p style={ modalstyles.subheading }>Permettre aux autres de repartager mon pin.</p>
                            <Toggle
                            size="small"
                            onColor={ theme.background_transparent.backgroundColor }
                            offColor="#343a40"
                            onChange={ handleToggle }
                            isChecked={ pin.public }
                            name="public"
                            />
                        </div>
                        <div style={ combineStyles(modalstyles.row_field, { paddingTop: 20 }) }>
                            <p style={ modalstyles.subheading }>Permettre aux autres de me contacter directement à propos de ce pin.</p>
                            <Toggle
                            size="small"
                            onColor={ theme.background_transparent.backgroundColor }
                            offColor="#343a40"
                            onChange={ handleToggle }
                            isChecked={ pin.direct }
                            name="direct"
                            />
                        </div>
                        { pin.direct &&  
                        <div style={ combineStyles(modalstyles.field, { borderBottom: 'none', paddingBottom: 0 }) }>                 
                            <h6 style={ modalstyles.subheading }>J'accepte de recevoir des réponses par. . .</h6>
                            <div style={ modalstyles.toggle_container }>
                                <Toggle
                                size="medium"
                                onColor={ theme.background_transparent.backgroundColor }
                                offColor='#343a40'
                                onContent="SMS"
                                offContent="SMS"
                                onValue="text"
                                offValue="text"
                                onChange={ handleResponseMethodSelect }
                                isChecked={ pin.response_methods.includes('text') }
                                />
                                <Toggle
                                size="medium"
                                onColor={ theme.background_transparent.backgroundColor }
                                offColor='#343a40'
                                onContent="mail"
                                offContent="mail"
                                onValue="email"
                                offValue="email"
                                onChange={ handleResponseMethodSelect }
                                isChecked={ pin.response_methods.includes('email') }
                                />
                                <Toggle
                                size="large"
                                onColor={ theme.background_transparent.backgroundColor }
                                offColor='#343a40'
                                onContent="téléphone"
                                offContent="téléphone"
                                onValue="phone"
                                offValue="phone"
                                onChange={ handleResponseMethodSelect }
                                isChecked={ pin.response_methods.includes('phone') }
                                />
                                <Toggle
                                size="large"
                                onColor={ theme.background_transparent.backgroundColor }
                                offColor='#343a40'
                                onContent="notification"
                                offContent="notification"
                                onValue="notification"
                                offValue="notification"
                                onChange={ handleResponseMethodSelect }
                                isChecked={ pin.response_methods.includes('notification') }
                                />
                            </div>
                        </div>
                        }
                    </div>
                    <div style={ modalstyles.expand_menu_header } onClick={ ()=>setIsExpanded(!isExpanded) }>
                        <h6 style={ modalstyles.modal_heading }>Plus d'options . . .</h6>
                        <Icon
                        path={ isExpanded ? mdiChevronUp : mdiChevronDown }
                        size={ 1 }
                        color={ theme.foreground.color }
                        style={ { marginLeft: 5, marginTop: -2 } }
                        />
                    </div>
                    { isExpanded &&
                        <>
                            <div style={ modalstyles.section_row }>
                                <div>
                                    <h6 style={ modalstyles.modal_heading }>Delai</h6>
                                    <p style={ combineStyles(modalstyles.subheading, {textAlign: 'justify'}) }>Choissiez un delai pour votre pin. Le pin disparaîtra après cette pèriode de temps.</p>
                                </div>
                                <TypeInput types={ timePickerData } onChange={ handleSetDelay } defaultType={ timePickerData[0] } defaultValue={ pin.delay } />
                            </div>
                            <div style={ combineStyles(modalstyles.section_row, { borderBottom: 'none' }) }>
                                <h6 style={ combineStyles(modalstyles.modal_heading, { margin: 0 }) }>Choisissez une couleur de fond pour votre pin</h6>
                                <div style={ styles.color_menu }>
                                    { colors.map((e, i) => <div key={ i } style={ pin.color === e ? combineStyles(styles.color_option, { backgroundColor: e }, { ...styles.color_option_selected }) : combineStyles(styles.color_option, { backgroundColor: e }) } onClick={ ()=>handlePinModification(e, "color") }></div> )
                                    }
                                </div>
                            </div>
                        </>
                    }
            </div>
            }  
            { step === 2 &&
                <div style={ styles.pin_container }>
                    <Pin pin={ pin } preview />
                    <div style={ styles.preview_field }>
                        <h6 style={ combineStyles(modalstyles.modal_heading, { margin: 0, whiteSpace: 'no-wrap' }) }>Mode de réponse: { pin.direct ? 'direct' : 'indirect' }</h6>
                        <p style={ combineStyles(modalstyles.subheading, { textAlign: 'end', maxWidth: '60%' }) }>
                            { !pin.direct &&
                                `Vous allez recevoir une notification pour prendre contact quand quelqu'un répond à votre pin.`
                            }
                            { pin.direct &&
                                `Vous acceptez d'être contacter directement par les autres membres de la communauté.`
                            }
                            </p>
                    </div>
                    <div style={ styles.preview_field }>
                        <h6 style={ combineStyles(modalstyles.modal_heading, { margin: 0 }) }>Modes de contact</h6>
                        <p style={ combineStyles(modalstyles.subheading, { textAlign: 'end' }) }>
                        Vous acceptez d'être contacter par { pin.response_methods.map((e, i) => <span key={ i }>{ i === pin.response_methods.length - 1 ? `et ${ e }.` : `${ e }, ` }</span>) }
                        </p>
                    </div>
                    <div style={ styles.checkbox_container }>
                        <p style={ combineStyles(modalstyles.subheading, { textAlign: 'end' }) }>Sauvegarder mes préfèrences pour la prochaine fois.</p>
                        <input type="checkbox" style={ styles.checkbox } onChange={ (e)=>savePreferences(e) }></input>
                    </div>
                </div>
            }
            <div style={ modalstyles.footer }>
                <button style={ defaultstyles.button } onClick={ ()=>toggleModal() }>Annuler</button>
                { step === 1 ?
                <button style={ combineStyles(defaultstyles.button, theme.background_transparent) } onClick={ ()=>setStep(step + 1) }>Valider</button>
                : step === 2 ?
                <>
                    <button style={ combineStyles(defaultstyles.button, theme.background_transparent) } onClick={ ()=>setStep(step - 1) }>Modifier</button>
                    <button style={ combineStyles(defaultstyles.button, theme.background_transparent) } onClick={ ()=>validatePin() }>Ajouter</button>
                </>
                : null }
            </div>
        </div>
    )
}

function mapStateToProps({ boards, user }) {
    return { boards, user }
}

export default connect(mapStateToProps, null)(AddPin)

const styles = {
    color_menu: {
        display: 'flex',
        alignItems: 'center'
    },
    color_option: {
        height: '20px',
        width: '20px',
        margin: 3,
        borderRadius: 3,
        // boxShadow: '1px 1px 1px rgba(0, 0, 0, 0.2)',
        boxSizing: 'border-box'
    },
    color_option_selected: {
        border: '2px solid #1368aa'
    },
    input: {
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        width: '50px',
        paddingLeft: 12,
        boxSizing: 'border-box',
        lineHeight: 1,
        border: 'none'
    },
    timepicker_label: {
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        lineHeight: 1,        
        boxSizing: 'border-box',
        fontSize: '0.7rem',
        width: '80px',
        borderLeft: '1px solid rgba(0, 0, 0, 0.2)',
        display: 'flex',
        alignItems: 'center',
        color: '#343a40',
        paddingRight: 8,
        position: 'relative',
        textAlign: 'right'
    },
    timepicker_container: {
        height: '1.8rem',
        borderRadius: '3px',
        // boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.2)',
        overflow: 'hidden',
        display: 'flex',
        marginRight: 4
    },
    pin_container: {
        padding: '20px 10px',
        boxSizing: 'border-box',
        maxWidth: '100%'
    },
    preview_field: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 20,
        paddingBottom: 10
    },
    checkbox_container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingTop: 40,
    },
    checkbox: {
        marginTop: 7
    }
}
