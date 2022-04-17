import React from 'react'

const Modal = ({ children, open, toggleModal }) => {
    //FUNCTIONS_______________________________
    const closeModal = (e) => {
        if (e.target.id === 'background') {
            toggleModal()
        }
    }

    return open ? (
        <div id="background" style={ styles.background  } onClick={ (e)=>closeModal(e) }>
            <div style={ styles.modal_body }>
                    { children }
            </div>
        </div>
    )
    : <></> ;
} 
export default Modal;

const styles = {
    background: {
        zIndex: 10000,
        minHeight: '100vh',
        minWidth: '100vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        position: 'absolute',
        left: 0,
        top: 0
    },
    modal_body: {
        zIndex: 11000,
        borderRadius: 3,
        boxShadow: '0px 2px 10px 2px rgba(0, 0, 0, 0.4)',
        overflow: 'hidden',
    },
}