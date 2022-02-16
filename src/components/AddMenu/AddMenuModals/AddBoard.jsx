import React, { useState, useEffect, useContext } from 'react'

//STYLES_________________________
import defaultstyles from '../../../defaultstyles'
import modalstyles from './modalstyles'
import '../../../App.css'

//REDUX_________________________
import { connect } from 'react-redux'

//COMPONENTS____________________
import FloatingLabelInput from '../../FloatingLabelInput'
import Select from '../../Select'
import Toggle from '../../Toggle'

//CONTEXT___________________
import { ThemeContext } from '../../../hooks/theme-context'

//HELPER FUNCTIONS______________
import combineStyles from '../../../helpers/combineStyles'

//UI_____________________________
import { mdiChevronUp, mdiChevronDown } from '@mdi/js';
import Icon from '@mdi/react'

const AddBoard = ({ toggleModal, user }) => {
    //CONTEXT__________________________
    const { theme } = useContext(ThemeContext)

    //STATE HOOKS_______________________
    const [isExpanded, setIsExpanded] = useState(false)

    const [circles, setCircles] = useState([])
    const [board, setBoard] = useState({
        exclusivity: 'inclusive',
        circles: [],
        name: '',
        background: 'download.jpg',
        creator: user?._id || null
    })
    const [error, setError] = useState(null)

    //EFFECT HOOKS_____________________
    useEffect(() => {
        const fetchCircles = async () => {
            const data = await fetch(`${global.BACKEND}/circles/${user._id}`)
            const json = await data.json()

            if(json.result) setCircles(json.circles)
        }

        if (user) fetchCircles()
    }, [user])

    //FUNCTIONS_________________________
    const handleBoardModification = (value, name) => {
        setBoard(Object.assign({ ...board }, { [name]: value }))
    }

    const handleModeSelect = (e, onValue, offValue) => {
        e.target.checked ? handleBoardModification(onValue, 'exclusivity') : handleBoardModification(offValue, 'exclusivity')
    }

    const handleCirclesSelect = (data, name) => {
        board.circles.find(e => e._id === data.value) ? handleBoardModification(board.circles.filter(e => e._id !== data.value), name) : handleBoardModification([ ...board.circles, data.value ], name)
    }

    const validateBoard = async () => {
        const data = await fetch(`${global.BACKEND}/boards`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(board)
        })
        const json = await data.json()

        json.result ? toggleModal() : setError(json.error)
    }

    return (
        <div style={ modalstyles.content }>
            <div style={ modalstyles.body } className="hide-scrollbar">
                <div style={ modalstyles.section_row}>
                    <h6 style={ modalstyles.modal_heading }>Nom</h6>
                    <FloatingLabelInput type="text" value={ board.name } name="name" onChange={ handleBoardModification } label="e.g. 'Swing Dance', 'Étage 1', 'Belleville' . . ."/>
                </div>
                <div style={ modalstyles.field }>
                    <h6 style={ modalstyles.modal_heading }>Partagez votre board avec une ou plusieurs de vos communautés</h6>
                    <div style={ modalstyles.row_field }>
                        <p style={ modalstyles.subheading }>Mode</p>
                        <Toggle
                        size="medium"
                        onColor={ theme.background_transparent.backgroundColor }
                        offColor={ theme.background_transparent.backgroundColor }
                        onContent="inclusif"
                        onValue="inclusive"
                        offContent="exclusif"
                        offValue="exclusive"
                        onChange={ handleModeSelect }
                        isChecked={ board.exclusivity === 'inclusive' }
                        />
                    </div>
                    <p style={ combineStyles(modalstyles.subheading, { maxWidth: '100%' }) }>Sur un board inclusif, tous ce qui font partie des cercles selectionnées aurons accès au pins sur le board. Sur un board exclusif, seuls ceux qui appartienent à tout les cercles sélectionnées aurons accès.</p>
                    <Select
                    values={ circles.map(e => ({ value: e._id, label: e.name })) }
                    handleChange={ handleCirclesSelect }
                    placeholder="choisissez vos cercles"
                    name="circles"
                    multiple
                    />
                </div>
                <div style={ modalstyles.field }>
                    <h6 style={ modalstyles.modal_heading }>Déco</h6>
                    <p style={ modalstyles.subheading }>Choisissez un fond pour votre board.</p>
                    <div style={ styles.background_container }>
                        <div onClick={ ()=>handleBoardModification("download.jpg", "background") } style={ combineStyles(styles.background_preview, { backgroundImage: "url('/images/download.jpg')" }) }></div>
                        <div onClick={ ()=>handleBoardModification("ocean-3605547__480.webp", "background") } style={ combineStyles(styles.background_preview, { backgroundImage: "url('/images/ocean-3605547__480.webp')" }) }></div>
                        <div onClick={ ()=>handleBoardModification("c4848bd608919a3e309ec546252508f0.jpg", "background") } style={ combineStyles(styles.background_preview, { backgroundImage: "url('/images/c4848bd608919a3e309ec546252508f0.jpg')" }) }></div>
                        <div onClick={ ()=>handleBoardModification("camila-vignoni-fondo-hospital.jpg", "background") } style={ combineStyles(styles.background_preview, { backgroundImage: "url('/images/camila-vignoni-fondo-hospital.jpg')" }) }></div>
                        <div onClick={ ()=>handleBoardModification("DM-Wallpaper-2001-4096x2304a.jpg", "background") } style={ combineStyles(styles.background_preview, { backgroundImage: "url('/images/DM-Wallpaper-2001-4096x2304a.jpg')" }) }></div>
                        <div onClick={ ()=>handleBoardModification("ocean-3605547__480.webp", "background") } style={ styles.background_preview }>+</div>
                    </div>
                </div>
                <div style={ modalstyles.expand_menu_header } onClick={ ()=>setIsExpanded(!isExpanded) }>
                    <h6 style={ modalstyles.modal_heading }>Plus d'options. . .</h6>
                    <Icon
                    path={ isExpanded ? mdiChevronUp : mdiChevronDown }
                    size={ 1 }
                    color={ theme.foreground.color }
                    style={ { marginLeft: 5, marginTop: -2 } }
                    />
                </div>
            {/* nom du board
            circles
            circle => liste des personnes (choix des admins + operators)
            fond d'écran
                */}
            </div>
            <div style={ modalstyles.footer }>
                <button style={ defaultstyles.button } onClick={ ()=>toggleModal() }>Annuler</button>
                <button style={ combineStyles(defaultstyles.button, theme.background_transparent) } onClick={ ()=>validateBoard() }>Valider</button> 
            </div>
        </div>
    )
}

function mapStateToProps({ user }) {
    return { user }
}

export default connect(mapStateToProps, null)(AddBoard)

const styles = {
    background_container: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    background_preview: {
        width: '120px',
        height: '80px',
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
        fontWeight: 'bold',
        color: '#343a40',
    }
}