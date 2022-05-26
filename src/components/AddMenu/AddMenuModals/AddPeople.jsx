import React, { useState, useEffect, useContext } from 'react'

//STYLES_________________________
import { defaultstyles, modalstyles } from '../../../styles'
import '../../../App.css'

//COMPONENTS____________________
import FloatingLabelInput from '../../FloatingLabelInput'
import Select from '../../Select'
import Toggle from '../../Toggle'

//CONTEXT___________________
import { ThemeContext } from '../../../hooks/theme-context'

//HELPER FUNCTIONS______________
import combineStyles from '../../../helpers/combineStyles'

//UI_____________________________
import { mdiAccountMultiple, mdiArrowRight, mdiEarth, mdiChevronUp, mdiChevronDown } from '@mdi/js';
import Icon from '@mdi/react'

const AddPeople = ({ toggleModal }) => {
    const { theme } = useContext(ThemeContext)
    const peopleList = [
        {
            _id: 1,
            firstname: 'John',
            lastname: 'McLane',
            username: 'Jojo',
            birthDate: '18/10/1985',
            avatar: '/images/anais.jpg',
        },
        {
            _id: 2,
            firstname: 'Bozzo',
            lastname: 'Garfield',
            username: 'Bobo',
            birthDate: '18/10/2001',
            avatar: '/images/quentin.jpg',
        },
        {
            _id: 3,
            firstname: 'Francis',
            lastname: 'Lalanière',
            username: 'Lala',
            birthDate: '18/10/1982',
            avatar: '/images/CatPNG.png',
        },
        {
            _id: 4,
            firstname: 'John',
            lastname: 'McLane',
            username: 'Jojo',
            birthDate: '18/10/1990',
            avatar: '/images/maxime.jpg',
        },
        {
            _id: 5,
            firstname: 'Perceval',
            lastname: 'Karadok',
            username: 'PK',
            birthDate: '18/10/1990',
            avatar: '/images/CatPNG.png',
        },
        {
            _id: 6,
            firstname: 'Monti',
            lastname: 'Piton',
            username: 'MP',
            birthDate: '18/10/1990',
            avatar: '/images/quentin.jpg',
        },
    ]

    const spheresList = [
        {
            _id: 8,
            name: 'Service 1',
            status: 'Active',
            sphere_parent: 'Batiment Laenec',
            rank: 3,
            admin: [1],
            operator: [6],
            access: [2, 3, 4]
        },
        {
            _id: 9,
            name: 'Hôpital',
            status: 'Active',
            sphere_parent: null,
            rank: 1,
            admin: [4],
            operator: [1],
            access: [2, 3]
        },
        {
            _id: 10,
            name: 'Batiment Laenec',
            status: 'Active',
            sphere_parent: 'Hôpital',
            rank: 2,
            admin: [4],
            operator: [1],
            access: [2, 3]
        },
        {
            _id: 13,
            name: 'Batiment Hamburger',
            status: 'Active',
            sphere_parent: 'Hôpital',
            rank: 2,
            admin: [4],
            operator: [1],
            access: [2, 3]
        },
        {
            _id: 14,
            name: 'Service 7',
            status: 'Active',
            sphere_parent: 'Batiment Hamburger',
            rank: 2,
            admin: [4],
            operator: [1],
            access: [2, 3]
        },
        {
            _id: 11,
            name: 'Professionnel.le.s',
            status: 'Closed',
            sphere_parent: null,
            rank: 1,
            admin: [4],
            operator: [1],
            access: [2, 3]
        },
        {
            _id: 12,
            name: 'Partie B',
            status: 'Active',
            sphere_parent: 'Service 1',
            rank: 6,
            admin: [4],
            operator: [6],
            access: [2, 3]
        },
    ]

    const [spheresListState, setSpheresListState] = useState(spheresList)
    const [peopleListState, setPeopleListState] = useState(peopleList)
    const [spheresListStateR, setSpheresListStateR] = useState(spheresList)
    const [peopleListStateR, setPeopleListStateR] = useState(peopleList)

    const [listNewPeople, setListNewPeople] = useState([])
    const [emailNew, setEmailNew] = useState('')
    const [listNewPeopleR, setListNewPeopleR] = useState([])

    const [isNewExpanded, setIsNewExpanded] = useState(false)
    const [isOldExpanded, setIsOldExpanded] = useState(false)
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')

    useEffect(() => {
        let arrR = listNewPeople.map((mail) => {
            return { value: mail, label: mail }
        })
        setListNewPeopleR(arrR)
  
    }, [listNewPeople])



    useEffect(() => {
        setSpheresListState(spheresList)
//        console.log('spheresListState : ', spheresListState)
    }, [])

    useEffect(() => {
        setPeopleListState(peopleList)
//        console.log('peopleListState : ', peopleListState)
    }, [])

    useEffect(() => {
        const spheresListRevised = spheresListState.map((sphere) => {
            return { value: sphere.name, label: sphere.name }
        })
        setSpheresListStateR(spheresListRevised)
    }, [])

    useEffect(() => {
        const peopleListRevised = peopleListState.map((person) => {
            return { value: person._id, label: `${person.firstname} ${person.lastname}` }
        })
        setPeopleListStateR(peopleListRevised)
    }, [])

    const addMail = () => {
//        console.log('PEOPLELISTR BEFORE : ', listNewPeople)
        let arrCopy = [...listNewPeople];
        arrCopy.push(emailNew);
//        console.log('PEOPLELISTR AFTER : ', arrCopy)
        setListNewPeople(arrCopy)
        setEmailNew('')

    }

    return (
        <div style={ modalstyles.content }>
            <div style={ modalstyles.body } className="hide-scrollbar">
                <div onClick={() => { setIsNewExpanded(!isNewExpanded); isOldExpanded && setIsOldExpanded(false) }} style={combineStyles(modalstyles.field, { border: !isNewExpanded ? 'none' : modalstyles.field.border, cursor: 'pointer', paddingBottom: 0, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' })}>
                    <div style={ {paddingLeft: 20, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' } }>
                            
                    <Icon
                        path={mdiArrowRight}
                        size={0.6}
                        color={theme.foreground.color}
                        style={{ marginRight: 8, marginTop: 2 }}
                    />
                    <h5 style={defaultstyles.subtitle}>Inviter des personnes à s'enregistrer</h5>
                    </div>
                    <Icon
                        path={isNewExpanded ? mdiChevronUp : mdiChevronDown}
                        size={1}
                        color={theme.foreground.color}
                        style={{ marginLeft: 5, marginTop: -2 }}
                    />
                </div>

                <div style={combineStyles(modalstyles.field, { display: isNewExpanded ? 'block' : 'none', paddingBottom: 0 })}>
                    <h6 style={modalstyles.modal_heading}>Saisissez l'e-mail des personnes à inviter :</h6>

                    <FloatingLabelInput
                        type="text"
                        label="E-mail"
                        name="e-mail"
                        value={emailNew}
                        onChange={(e) => setEmailNew(e)}
                    />
                    <button style={combineStyles(defaultstyles.button, theme.background_transparent)} onClick={() => addMail()}>Ajouter</button>

                    <div style={combineStyles(modalstyles.field, { paddingBottom: 0, borderBottom: 'rgba(0,0,0,0)' })}>
                        <Select
                            values={listNewPeopleR}
                            handleChange={(e) => console.log(e)}
                            placeholder="Personnes invitées"
                            name="people"
                            style={{ marginBottom: '20px' }}
                            multiple

                        />
                    </div>
                </div>
                <div onClick={() => { setIsOldExpanded(!isOldExpanded); isNewExpanded && setIsNewExpanded(false) }} style={combineStyles(modalstyles.field, {border: !isNewExpanded ? 'none' : modalstyles.field.border, cursor: 'pointer', paddingBottom: 0, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' })}>
                    <div style={ {paddingLeft: 20, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' } }>
                    <Icon
                        path={mdiArrowRight}
                        size={0.6}
                        color={theme.foreground.color}
                        style={{ marginRight: 8, marginTop: 2 }}
                    />
                    <h5 style={defaultstyles.subtitle}>Choisir des personnes à lier à des sphères</h5>
                    </div>
                    <Icon
                        path={isOldExpanded ? mdiChevronUp : mdiChevronDown}
                        size={1}
                        color={theme.foreground.color}
                        style={{ marginLeft: 5, marginTop: -2 }}
                    />
                </div>

                <div style={combineStyles(modalstyles.field, { display: isOldExpanded ? 'block' : 'none', paddingBottom: 0 })}>
                    <h6 style={modalstyles.modal_heading}>Sélectionnez les personnes :</h6>
                    <Select
                        values={peopleListStateR}
                        handleChange={(e) => console.log(e)}
                        placeholder="Personnes invitées"
                        name="people"
                        style={{ marginBottom: '20px' }}
                        multiple
                    />
                </div>

                <div style={ combineStyles(modalstyles.modal_header, { marginTop: 20 }) }>
                    <Icon
                        path={ mdiEarth }
                        size={ 0.6 }
                        color={ theme.foreground.color }
                        style={ { marginRight: 8, marginTop: 2 } }
                    />
                    <h5 style={ combineStyles(defaultstyles.subtitle, { marginBottom: 0 }) }>Lier à une ou plusieurs cercles</h5>
                </div>

                <div style={ combineStyles(modalstyles.field, { borderBottom: 'none' }) }>
                    <h6 style={ modalstyles.modal_heading }>Sélectionnez les sphères auxquelles rattacher ces personnes :</h6>
                    <Select
                        values={ spheresListStateR }
                        handleChange={(e) => console.log(e)}
                        placeholder="Sphères disponibles"
                        name="people"
                        style={ { marginBottom: '20px' } }
                        multiple

                    />
                </div>
            </div>
            <div style={ modalstyles.footer }>
                <button style={ defaultstyles.button } onClick={() => toggleModal()}>Annuler</button>
                <button style={ combineStyles(defaultstyles.button, theme.background_transparent) } onClick={ () => toggleModal() }>Valider</button>
            </div>
        </div>
    )
}
export default AddPeople;