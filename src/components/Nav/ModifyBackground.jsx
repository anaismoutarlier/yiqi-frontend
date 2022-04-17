import React from 'react'

//STYLES__________________________
import { defaultstyles } from '../../styles'

//COMPONENTS______________________
// import Modal from './Modal'

//HELPER FUNCTIONS___________________
import combineStyles from '../../helpers/combineStyles'

//REDUX________________________________
import { connect } from 'react-redux'

const ModifyBackground = ({ open, toggleModal, mode, board, user, modifyUser }) => {
    //DATA___________________________
    const colors = ['#FFADAD', '#FFD6A5', '#FDFFB6', '#CAFFBF', '#9BF6FF', '#A0C4FF', '#BDB2FF', '#BDB2FF', '#f8f9fa']

    //FUNCTIONS______________________
    const changeBackground = async background => {
        if (mode === 'user') {
            const data = await fetch(`${global.BACKEND}/users/account`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({ token: user.token, key: "preferences", value: Object.assign({ ...user.preferences, background }) })
            })
        
            const json = await data.json()
        
            if (json.result) {
                modifyUser(json.user)
            }
        } else if (mode === 'board') {
            console.log('modify board')
        }
    }

    return (
        <>
            {/* <Modal open={ open } toggleModal={ toggleModal }>
                <div style={ styles.modal_body }>
                    <h6 style={ defaultstyles.subtitle }>{ mode === 'user' ? "CHOISISSEZ VOTRE NOUVEAU FOND D'ÉCRAN" : mode === 'board' ? "CHOISISSEZ UN NOUVEAU FOND POUR VOTRE BOARD" : '' }</h6>
                    <div style={ styles.background_selection }>
                        { colors.map((e, i) => <div key={ i } style={ combineStyles(styles.background_preview_small, { background: e }) } onClick={ () => changeBackground(e) }></div>) }
                        <div style={ combineStyles(styles.background_preview_small, { backgroundImage: "url('/images/download.jpg')" }) } onClick={ () => changeBackground("url('/images/download.jpg')") }></div>
                        <div style={ combineStyles(styles.background_preview_small, { backgroundImage: "url('/images/ocean-3605547__480.webp')" }) } onClick={ () => changeBackground("url('/images/ocean-3605547__480.webp')") }></div>
                        <div style={ combineStyles(styles.background_preview_small, { backgroundImage: "url('/images/c4848bd608919a3e309ec546252508f0.jpg')" }) } onClick={ () => changeBackground("url('/images/c4848bd608919a3e309ec546252508f0.jpg')") }></div>
                        <div style={ combineStyles(styles.background_preview_small, { backgroundImage: "url('/images/camila-vignoni-fondo-hospital.jpg')" }) } onClick={ () => changeBackground("url('/images/camila-vignoni-fondo-hospital.jpg')" ) }></div>
                        <div style={ combineStyles(styles.background_preview_small, { backgroundImage: "url('/images/DM-Wallpaper-2001-4096x2304a.jpg')" }) } onClick={ () => changeBackground("url('/images/DM-Wallpaper-2001-4096x2304a.jpg')") }></div>
                        <div style={ combineStyles(styles.background_preview_small, { backgroundImage: "url('/images/corkboardbackground.jpg')" }) } onClick={ () => changeBackground("url('/images/corkboardbackground.jpg')") }></div>
                        <div style={ styles.background_preview_small }>+</div>
                    </div>
                </div>
            </Modal> */}
        </>
    )
}


function mapStateToProps(state) {
    return {
        user: state.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        modifyUser: user => {
        dispatch({ type: 'modifyUser', user })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModifyBackground)

const styles = {
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
        // boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.2)',
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