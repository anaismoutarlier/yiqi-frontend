import React, { useState, useEffect, useContext } from 'react'

//STYLES_________________________
import '../../App.css'
import "./addmenu.css"

//NAVIGATION_________________________
import { Link } from 'react-router-dom'

//COMPONENTS____________________
import MenuBadge from '../MenuBadge'
import Drawer from '../Drawer'
import Header from './Header'

//MODALS______________________
import AddPin from './AddMenuModals/AddPin'
import AddBoard from './AddMenuModals/AddBoard'
import AddPeople from './AddMenuModals/AddPeople'
import AddCircle from './AddMenuModals/AddCircle'

//CONTEXT___________________
import { MediaContext } from '../../hooks/media-context'

//UI_____________________________
import { mdiPlusCircleOutline, mdiAccountMultiple , mdiPinOutline, mdiViewDashboardOutline, mdiBlurRadial } from '@mdi/js';
import Icon from '@mdi/react'

export const Option = ({ content, icon, type, iconRotate, onClick }) => {
    return (
        <div style={ styles.icon_wrapper }>
            <MenuBadge
            scale={ 1.1 }
            rotate={ Math.floor(Math.random() * 2) === 1 ? 1 : -1 }
            icon={ icon }
            iconSize={ 1 }
            iconRotate={ iconRotate }
            style={ styles.icon }
            type={ type }
            openable
            content={ content }
            onClick={ onClick }
            >
            </MenuBadge>
        </div>
    )
}

const AddMenu = () => {
    const { media } = useContext(MediaContext)

    //STATE HOOKS_____________________
    const [menuOpen, setMenuOpen] = useState(false)
    const [habilitation, setHabilitation] = useState('admin')
    const [selected, setSelected] = useState(null)
    const [modalVisible, setModalVisible] = useState(false)
    
    
    //modal Circle
    const [currentIntitule, setCurrentIntitule] = useState('')
    const [currentParent, setCurrentParent] = useState('')
    const [currentOrientation, setCurrentOrientation] = useState('')
    const [currentEmail, setCurrentEmail] = useState('')

    useEffect(()=>{console.log(currentIntitule, currentParent, currentOrientation)}, [currentIntitule, currentParent, currentOrientation])
    useEffect(()=>{console.log(currentIntitule, currentParent, currentOrientation)}, [currentIntitule, currentParent, currentOrientation])
    
    const resetModalCircle = () => {
        setCurrentOrientation('')
        setCurrentParent('')
        setCurrentIntitule('')
    }

    //modal People

    const resetPeopleCircle = () => {
        setCurrentEmail('')
    }

    let timeout;

    //FUNCTIONS_______________________
    const toggleMenu = option => {
        if (menuOpen) {
            if (option === 'click') {
                if(modalVisible) {
                    setModalVisible(false)
                }
                
                setMenuOpen(false)
            } else {
                timeout = setTimeout(() => {
                setMenuOpen(false)
                }, 5000)
            }
        } else {
            setMenuOpen(true)
        }
        
    }

    const toggleModal = selection => {
        if (selection) setSelected(selection)
        if (!selection || selection === selected) setModalVisible(!modalVisible)
        else {
            if (!modalVisible) setModalVisible(true)
        }
        clearTimeout(timeout)
        setMenuOpen(false)
    }

    return (
        <>
            <div className={ `add-menu ${modalVisible ? "open": ""}`}>
                <MenuBadge
                title="Add"
                scale={ 1.1 }
                rotate={ 45 }
                icon={ mdiPlusCircleOutline }
                iconSize={ 1.4 }
                rotated={ menuOpen }
                type="dark"
                style={ styles.add_button }
                onClick={ ()=>toggleMenu('click') }
                onMouseEnter={ media === 'desktop' && toggleMenu }
                onMouseLeave={ media === 'desktop' && toggleMenu }
                />
                { menuOpen &&
                    <>
                        <Option
                        content="Pin"
                        icon={ mdiPinOutline }
                        type="dark"
                        iconRotate={ 39 }
                        onClick={ ()=>toggleModal('pin') }
                        />
                        <Option
                        content="Board"
                        icon={ mdiViewDashboardOutline }
                        type="dark"
                        onClick={ ()=>toggleModal('board') }
                        />                                    
                        <Option
                        content="People"
                        icon={ mdiAccountMultiple }
                        type="dark"
                        onClick={ ()=>toggleModal('people') }
                        />
                        {   habilitation === 'admin' &&
                            <Option
                            content="Cercle"
                            icon={ mdiBlurRadial }
                            type="dark"
                            onClick={ ()=>toggleModal('circle') }
                            />
                        }
                    </>
                }
            </div>
            <Drawer 
            open={ modalVisible }
            bodyStyle={ styles.scroll }
            header={ () => {
                let icon = selected === "pin" 
                ? mdiPinOutline 
                : selected === "board" 
                ? mdiViewDashboardOutline 
                : selected === "circle"
                ? mdiBlurRadial
                : selected === "people"
                ? mdiAccountMultiple
                : null
                
                let title = selected === "pin" 
                ? "Déposer un pin" 
                : selected === "board" 
                ? "Réunir un board" 
                : selected === "circle"
                ? "Créer un cercle"
                : selected === "people"
                ? "Intégrer des contacts"
                : null
                return <Header icon={ icon } title={ title } /> 
            }
            }>
                {
                    selected === 'pin' ?
                    <AddPin toggleModal={ toggleModal } />
                    : selected === 'board' ?
                    <AddBoard toggleModal={ toggleModal } />
                    : selected === 'people'?
                    <AddPeople toggleModal={ toggleModal } />
                    : selected === 'circle' ?
                    <AddCircle toggleModal={ toggleModal } />
                    : null
                }
            </Drawer>
        </>
    )
}
export default AddMenu;

const styles = {
    menu_container: {
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        position: 'absolute',
        right: 25,
        top: 20,
        zIndex: 2000
    },
    menu_container_mobile: {
        flexDirection: 'column-reverse',
        right: 25,
        bottom: 25,
        top: 'auto'
    },
    add_button: {
        marginBottom: 15,
        marginRight: -3
    },
    icon: {
        marginBottom: 5
    },
    icon_wrapper: {
        height: '45px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modal_body: { 
        backgroundColor: 'rgba(255, 255, 255, 0.93)', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        padding: 40, 
        maxWidth: '500px',
        maxHeight: '90vh',
        minWidth: '350px'
    },
    scroll: {
        height: 'calc(100% - 80px)',
        maxHeight: 'calc(100% - 80px)',
        minHeight: 'calc(100% - 80px)'
    }
}