import { useState, useEffect, useContext } from 'react'

//STYLES_________________________
import defaultstyles from '../../../defaultstyles'
import modalstyles from './modalstyles'
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
import { mdiAccount, mdiAccountMultiple, mdiBlurRadial } from '@mdi/js';
import Icon from '@mdi/react'

const AddCircle = ({ toggleModal }) => {
    //CONTEXT___________________
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

    const circlesList = [
        {
        _id: 8,
        name: 'Service 1',
        status: 'Active',
        circle_parent: 'Batiment Laenec',
        rank: 3,
        admin: [1],
        operator: [6],
        access: [2, 3, 4]
        },
        {
        _id: 9,
        name: 'Hôpital',
        status: 'Active',
        circle_parent: null,
        rank: 1,
        admin: [4],
        operator: [1],
        access: [2, 3]
        },
        {
        _id: 10,
        name: 'Batiment Laenec',
        status: 'Active',
        circle_parent: 'Hôpital',
        rank: 2,
        admin: [4],
        operator: [1],
        access: [2, 3]
        },
        {
        _id: 13,
        name: 'Batiment Hamburger',
        status: 'Active',
        circle_parent: 'Hôpital',
        rank: 2,
        admin: [4],
        operator: [1],
        access: [2, 3]
        },
        {
        _id: 14,
        name: 'Service 7',
        status: 'Active',
        circle_parent: 'Batiment Hamburger',
        rank: 2,
        admin: [4],
        operator: [1],
        access: [2, 3]
        },
        {
        _id: 11,
        name: 'Professionnel.le.s',
        status: 'Closed',
        circle_parent: null,
        rank: 1,
        admin: [4],
        operator: [1],
        access: [2, 3]
        },
        {
        _id: 12,
        name: 'Partie B',
        status: 'Active',
        circle_parent: 'Service 1',
        rank: 6,
        admin: [4],
        operator: [6],
        access: [2, 3]
        },
    ]

    const sens = [{value: 'horizontal', label: 'Horizontal'}, {value: 'vertical', label: 'Vertical'}]

    const [circlesListState, setCirclesListState] = useState(circlesList)
    const [peopleListState, setPeopleListState] = useState(peopleList)
    const [circlesListStateR, setCirclesListStateR] = useState(circlesList)
    const [peopleListStateR, setPeopleListStateR] = useState(peopleList)

    useEffect(()=>{
        setCirclesListState(circlesList)
        console.log('circlesListState : ', circlesListState)
    }, [])
    useEffect(()=>{
        setPeopleListState(peopleList)
        console.log('peopleListState : ', peopleListState)
    }, [])

            useEffect(()=>{
            const circlesListRevised = circlesListState.map((circle)=>{
                return {value: circle.name, label: circle.name}
            })
            setCirclesListStateR(circlesListRevised)
            }, [])

            useEffect(()=>{
            const peopleListRevised = peopleListState.map((person)=>{
                return {value: person._id, label: `${person.firstname} ${person.lastname}`}
            })
            setPeopleListStateR(peopleListRevised)
            }, [])


    const [intitule, setIntitule] = useState('')
    const [parent, setParent] = useState('')
    const [orientation, setOrientation] = useState('')
    const [impossible, setImpossible] = useState([])

    useEffect(()=>{console.log('intitule : ', intitule)}, [intitule])
    useEffect(()=>{console.log('parent : ', parent)}, [parent])
    useEffect(()=>{console.log('orientation : ', orientation)}, [orientation])

    const createCircle = () => {
        let arrCopy = [...circlesListState]
        if(circlesListState.find(e=>e.name === parent).rank > 5) {let impCopy = [...impossible]; impCopy.push('Niveau maximum de cercle atteint !'); setImpossible(impCopy)} else {
        arrCopy.push({name: intitule, parent: parent ? parent : null, orientation: orientation, status: 'Active', rank: circlesListState.find(e=>e.name === parent) ? circlesListState.find(e=>e.name === parent).rank <=5 && circlesListState.find(e=>e.name === parent).rank + 1 : 1})
        setCirclesListState(arrCopy)
        toggleModal()
        console.log(arrCopy)
    }
    }


    return (
        <div style={ modalstyles.content }>
            <div id="body" style={ modalstyles.body } className="hide-scrollbar">
                <div style={ combineStyles(modalstyles.field, { paddingBottom: 0 }) }>
                    <h6 style={ modalstyles.modal_heading }>Saisissez l'intitulé du cercle à créer :</h6>

                    <FloatingLabelInput
                            type="text"
                            label="Intitulé"
                            name="Intitulé"
                            value={intitule}
                            onChange={(e)=>setIntitule(e)}                                                    
                    />
                </div>                       
                <div style={ modalstyles.field }>
                    <h6 style={ modalstyles.modal_heading }>Sélectionner une cercle parent si souhaité . . .</h6>
                <Select 
                    values={ circlesListStateR } 
                    handleChange={ (e)=>setParent(e.value) } 
                    placeholder="Sélectionner un cercle parent (facultatif)"
                    name="circles"
                    style={{marginBottom: 20}}

                />
                </div>
                <div style={ modalstyles.field }>
                    <h6 style={ modalstyles.modal_heading }>Sélectionner le sens d'affichage souhaité des cercles contenues dans celle-ci :</h6>
                <Select 
                    values={ sens } 
                    handleChange={ (e)=>setOrientation(e.value) } 
                    placeholder="Sélectionner le sens d'affichage souhaité"
                    name="circles"
                    style={{marginBottom: 20}}
                />
                </div>
                <span style={theme.foreground}>{impossible.map((err)=>{return err})}</span>

            </div>
            <div style={ combineStyles(modalstyles.field, { borderBottom: 'none' }) }>
                <h5 style={ modalstyles.modal_heading }>Intégrer des personnes</h5>
                <h6 style={ modalstyles.subheading }>Sélectionner la ou les personnes à intégrer au cercle, si souhaité . . .</h6>
                <Select 
                    values={ peopleListStateR } 
                    handleChange={ (e)=>setParent(e.value) } 
                    placeholder="Sélectionner la ou les personnes (facultatif)"
                    name="people"
                    style={{margin: '20px 0px'}}
                    multiple
                />
            </div>
            <div style={ modalstyles.footer }>
                <button style={ defaultstyles.button } onClick={ ()=>toggleModal() }>Annuler</button>
                <button style={ combineStyles(defaultstyles.button, theme.background_transparent) } onClick={ ()=>{createCircle() }}>Valider</button> 
            </div>
        </div>
    )
}
export default AddCircle;