import React, { useState, useEffect } from 'react'
import './TransferList.css'

//CONTEXT____________________
import { ThemeContext } from '../../hooks/theme-context'
import { MediaContext } from '../../hooks/media-context'

//styles_________
import '../../App.css'
import defaultstyles from '../../defaultstyles';

//HELPER FUNCTIONS__________________
import combineStyles from '../../helpers/combineStyles'

//UI_____________________
import Icon from '@mdi/react'
import {
    mdiAccountStarOutline,
    mdiArrowLeftBoldCircle,
    mdiArrowRightBoldCircle,
    mdiClose,
    mdiShieldAccountOutline,
    mdiTrashCanOutline,
    mdiBlurRadial,
    mdiArrowRightBottomBold,
    mdiSubdirectoryArrowRight,
    mdiIframeParenthesesOutline,
    mdiPlusCircleOutline,
    mdiAccountCheck,
    mdiAccountCheckOutline,
    mdiDatabaseImportOutline,
    mdiDownloadCircleOutline
} from '@mdi/js'

const TransferList = ({user, users, architectures}) => {

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
        rank: 4,
        admin: [4],
        operator: [6],
        access: [2, 3]
        },
    ]



    const [tabDataPeople, setTabDataPeople] = useState(peopleList)

    const [tabDataCircles, settabDataCircles] = useState(circlesList)
    const [tabDataCirclesRevised, settabDataCirclesRevised] = useState(null)
    const [tabCirclesUserSelectedRevised, setTabCirclesUserSelectedRevised] = useState(null)
    const [tabOtherCirclesRevised, setTabOtherCirclesRevised] = useState(null)
    
    const [currentSelectionCircle, setcurrentSelectionCircle] = useState(null)
    const [currentSelectionPeople, setCurrentSelectionPeople] = useState(null)
    
    const [tabCirclesUserSelected, setTabCirclesUserSelected] = useState(null)

    const [tabAdminsCircle, setTabAdminsCircle] = useState (null)
    const [tabOperatorsCircle, setTabOperatorCircle] = useState (null)
    const [tabAccessCircle, setTabAccessCircle] = useState (null)

    const [tabOtherPeople, setTabOtherPeople] = useState(null)
    const [tabOtherCircles, setTabOtherCircles] = useState(null)
    
    const [currentSelectionList, setCurrentSelectionList] = useState(null)

    useEffect(()=>{
        console.log('currentSelectionPeople : ', currentSelectionPeople)


        if(currentSelectionPeople) {
            
            let circleList = []
            tabDataCircles.forEach((circle, i)=>{
                
                if(circle.status === 'Active') {
                let isAdmin = circle.admin.find(e=>e === currentSelectionPeople)
                let isOperator = circle.operator.find(e=>e === currentSelectionPeople)
                let isAccess = circle.access.find(e=>e === currentSelectionPeople)
                if(isAdmin || isOperator || isAccess) {
                    circleList.push(circle)
                }
            }
            })
            setTabCirclesUserSelected(circleList)

            //trouver tous autres circles (sans la personne dedans)
            let listOfOthers = []
            tabDataCircles.forEach((circle)=>{
                if(circle.status === 'Active') {
                let isAdmin = circle.admin.find(e=>e === currentSelectionPeople)
                let isOperator = circle.operator.find(e=>e === currentSelectionPeople)
                let isAccess = circle.access.find(e=>e === currentSelectionPeople)
                if(!isAdmin && !isOperator && !isAccess) {listOfOthers.push(circle)}
            }})
            setTabOtherCircles(listOfOthers)
            console.log('listOfOthersCircles : ', listOfOthers)

        }
    }, [currentSelectionPeople, tabDataCircles])

    useEffect(()=>{
        //détermination des tableaux des admin, operator et access de la cercle sélectionnée pour maps ensuite
        if(currentSelectionCircle) {
        console.log('currentSelectionCircle : ', currentSelectionCircle)

        let circleSelected = tabDataCircles.find(e=>e._id === currentSelectionCircle)
        console.log('circle : ', circleSelected)
        
        let admins;
        let operators;
        let access;
        
         admins = circleSelected.admin
         operators = circleSelected.operator
         access = circleSelected.access
        
        console.log('step 1 : ', admins, operators, access)

        let tabAdmins = admins.map((admin)=>{
            return peopleList.find(e=>e._id === admin)
        })

        let tabOperators = operators.map((operator)=>{
            return peopleList.find(e=>e._id === operator)
        })

        let tabAccess = access.map((access)=>{
            return peopleList.find(e=>e._id === access)
        })

        tabAdmins.sort()
        tabOperators.sort()
        tabAccess.sort()

        console.log('step 2 : ', tabAdmins, tabOperators, tabAccess)

        setTabAdminsCircle(tabAdmins)
        setTabOperatorCircle(tabOperators)
        setTabAccessCircle(tabAccess)


        //trouver tous autres people (ni access, ni admin, ni operator donc)
        let listOfOthers = []
        tabDataPeople.forEach((person)=>{
            let isAdmin = tabAdmins.find(e=>e._id === person._id)
            let isOperator = tabOperators.find(e=>e._id === person._id)
            let isAccess = tabAccess.find(e=>e._id === person._id)
            if(!isAdmin && !isOperator && !isAccess) {listOfOthers.push(person)}
        })
        setTabOtherPeople(listOfOthers)

    }

if(!currentSelectionCircle) {
    setTabAdminsCircle(null)
    setTabOperatorCircle(null)
    setTabAccessCircle(null)
    setTabOtherPeople(null)
}
}, [currentSelectionCircle, tabDataCircles])


useEffect(()=>{
    // remaniement du tableau OTHERS CIrCLES du user pour affichage hiérarchisé des cercles
    var newTab = {}
        if(tabOtherCircles) {
        newTab['rank1'] = tabOtherCircles.filter(e=>e.rank === 1)
        // tabParent
        let tabParent = tabOtherCircles.map((e)=>e.name);

        // identification des parents solo de plus bas niveau
        tabOtherCircles.forEach((circle)=>{
            if(circle.circle_parent) {
                if(!tabOtherCircles.find(e=>e.name === circle.circle_parent))
                {newTab['rank1'].push(circle)}
            }      
        })

        // mise en objet
        tabParent.forEach((e)=>{
            if (e) {
            newTab[e] = tabOtherCircles.filter(f=>f.circle_parent === e)
        }})
        setTabOtherCirclesRevised(newTab)

    }
}, [tabOtherCircles])

useEffect(()=>{
    // remaniement du tableau CIRCLES DU USER pour affichage hiérarchisé des cercles
    var newTab = {}
        if(tabCirclesUserSelected) {
        newTab['rank1'] = tabCirclesUserSelected.filter(e=>e.rank === 1)
        let tabParent = tabCirclesUserSelected.map((e)=>e.name);


        // identification des parents solo de plus bas niveau
        tabCirclesUserSelected.forEach((circle)=>{
            if(circle.circle_parent) {
                if(!tabCirclesUserSelected.find(e=>e.name === circle.circle_parent))
                {newTab['rank1'].push(circle)}
            }      
        })

        //mise en objet
        tabParent.forEach((e)=>{
            if (e) {
            newTab[e] = tabCirclesUserSelected.filter(f=>f.circle_parent === e)
        }})
        setTabCirclesUserSelectedRevised(newTab)
    }
}, [tabCirclesUserSelected])

    useEffect(()=>{
        // remaniement du tableau CIRCLES pour affichage hiérarchisé des cercles
        var newTab = {}
        
            newTab['rank1'] = tabDataCircles.filter(e=>e.rank === 1)
            let tabParent = tabDataCircles.map((e)=>e.name);
            tabParent.forEach((e)=>{
                if (e) {
                newTab[e] = tabDataCircles.filter(f=>f.circle_parent === e)
            }})

            settabDataCirclesRevised(newTab)

    }, [tabDataCircles])
   

        //toggle selection

        const toggleSelectionList = (id) => currentSelectionList === id ? setCurrentSelectionList(null) : setCurrentSelectionList(id)
        const toggleSelectionCircle = (id) => currentSelectionCircle === id ? (setcurrentSelectionCircle(null), setTabOtherPeople(null), setCurrentSelectionList(null)) : setcurrentSelectionCircle(id)
        const toggleSelectionPeople = (id) => currentSelectionPeople === id ? (setCurrentSelectionPeople(null), setTabOtherCircles(null), setCurrentSelectionList(null)) : setCurrentSelectionPeople(id)

        // functions 'extract' and 'include' Person

        const extractPerson = (id) => {

            if(currentSelectionList) {
                //find right tab
                let isAdmin = tabAdminsCircle.find(e=>e._id === id)
                let isOperator = tabOperatorsCircle.find(e=>e._id === id)
                let isAccess = tabAccessCircle.find(e=>e._id === id)            
                console.log('isAdmin ; ', isAdmin, ' - isOperator : ', isOperator, ' - isAccess : ', isOperator)
                //find
    
                let arrDepartCopy;
                if(isAdmin) {arrDepartCopy = [...tabAdminsCircle]} else if(isOperator){ arrDepartCopy = [...tabOperatorsCircle]} else if(isAccess) { arrDepartCopy = [...tabAccessCircle]}
    

                let arrArrivalCopy = [...tabOtherPeople]
                if(isAdmin) {arrArrivalCopy.push(isAdmin)} else if(isOperator){ arrArrivalCopy.push(isOperator)} else if(isAccess) { arrArrivalCopy.push(isAccess)}
                console.log('arrArrivalCopy : ', arrArrivalCopy)
                setTabOtherPeople(arrArrivalCopy)


                let index = arrDepartCopy.findIndex(e=>e._id === id)
                arrDepartCopy.splice(index, 1)
    
                if(isAdmin) {setTabAdminsCircle(arrDepartCopy)} else if(isOperator){setTabOperatorCircle(arrDepartCopy)} else { setTabAccessCircle(arrDepartCopy)}
                console.log('arrDepartCopy : ', arrDepartCopy)
                }
        }

        const includePerson = (id) => {
            if(currentSelectionList) {
                let arrDepartCopy = [...tabOtherPeople];
                let arrArrivalCopy = [...tabAccessCircle];
                let person = tabOtherPeople.find(e=>e._id === id)

                arrArrivalCopy.push(person)

                let index = arrDepartCopy.findIndex(e=>e._id === id)
                arrDepartCopy.splice(index, 1)

                setTabOtherPeople(arrDepartCopy)
                setTabAccessCircle(arrArrivalCopy)
        }}

        // functions 'extract' and 'include' Persons

        const extractCircle = (id) => { // A FINIR
            console.log('ID currentselection list : ', id)
            if(currentSelectionList) {
                //find the circle and the habilitation
                let arrCopy = [...tabDataCircles]
               
                let circle = arrCopy.find(e=>e._id === id)

                    let isAdmin = circle.admin.find(e=>e === currentSelectionPeople)
                    let isOperator = circle.operator.find(e=>e === currentSelectionPeople)
                    let isAccess = circle.access.find(e=>e === currentSelectionPeople)

                    console.log('les is machin : ', isAdmin, isOperator, isAccess)

                //find index to suppress
                let indexId;
                if(isAdmin){console.log('isAdmin'); indexId = circle.admin.findIndex(e=>e === currentSelectionPeople)} else if(isOperator){console.log('isOperator'); indexId = circle.operator.findIndex(e=>e === currentSelectionPeople)} else if(isAccess){console.log('isAccess'); indexId = circle.access.findIndex(e=>e === currentSelectionPeople)}
                if(isAdmin){circle.admin.splice(indexId, 1)} else if (isOperator) {circle.operator.splice(indexId, 1)} else if (isAccess) {circle.access.splice(indexId, 1)}  
                settabDataCircles(arrCopy)
                
                //find children index to suppress

                if(tabCirclesUserSelectedRevised[circle.name]) {

                    tabCirclesUserSelectedRevised[circle.name].forEach((item)=>{
                        let circleChild = tabDataCircles.find(e=>e.name === item.name)
                        extractCircle(circleChild._id)
                    })

                }
                }
                };

        const includeCircle = (id) => { // A FINIR
            if(currentSelectionList) {
                console.log('ID : ', id)
                //find le cercle dans tabDataCircle
                let arrCopy = [...tabDataCircles]
               
                let circle = arrCopy.find(e=>e._id === id)
                console.log('circle concernée : ', circle)
                console.log('circle.access before : ', circle.access)
                console.log('tabOtherCirclesRevised : ', tabOtherCirclesRevised)

                //ajout id de la personne dans access de la circle
                circle.access.push(currentSelectionPeople)
                console.log('circle.access after : ', circle.access)

                settabDataCircles(arrCopy)

                //rappel de la fonction pour tous les enfants (condition if children)
                if (tabCirclesUserSelectedRevised[circle.name]) {
                tabCirclesUserSelectedRevised[circle.name].forEach((item)=>{
                    let circleChild = tabDataCircles.find(e=>e.name === item.name)
                    extractCircle(circleChild._id)
                })

            }

                // setters

        }}

        const giveAdmin = async id => {
            if(currentSelectionList) {
                
                let isAdmin = tabAdminsCircle.find(e=>e._id === id)
                let isOperator = tabOperatorsCircle.find(e=>e._id === id)
                let isAccess = tabAccessCircle.find(e=>e._id === id)

                if(!isAdmin){
                if(isOperator || isAccess) {
                    
                let arrDepartCopy;                
                if(isAdmin) {arrDepartCopy = [...tabAdminsCircle]} else if(isOperator){ arrDepartCopy = [...tabOperatorsCircle]} else if(isAccess) { arrDepartCopy = [...tabAccessCircle]}
                
                let arrArrivalCopy = [...tabAdminsCircle];
                if(isAdmin) {arrArrivalCopy.push(isAdmin)} else if(isOperator){ arrArrivalCopy.push(isOperator)} else if(isAccess) { arrArrivalCopy.push(isAccess)}
                setTabAdminsCircle(arrArrivalCopy)

                let index = arrDepartCopy.findIndex(e=>e._id === id)
                arrDepartCopy.splice(index, 1)

                if(isAdmin) {setTabAdminsCircle(arrDepartCopy)} else if(isOperator){setTabOperatorCircle(arrDepartCopy)} else { setTabAccessCircle(arrDepartCopy)}
                }
            }
            }
        }

        const giveOperator = (id) => {
            if(currentSelectionList) {
                
                let isAdmin = tabAdminsCircle.find(e=>e._id === id)
                let isOperator = tabOperatorsCircle.find(e=>e._id === id)
                let isAccess = tabAccessCircle.find(e=>e._id === id)

                if(!isOperator){
                if(isAdmin || isAccess) {
                    
                let arrDepartCopy;                
                if(isAdmin) {arrDepartCopy = [...tabAdminsCircle]} else if(isOperator){ arrDepartCopy = [...tabOperatorsCircle]} else if(isAccess) { arrDepartCopy = [...tabAccessCircle]}
                
                let arrArrivalCopy = [...tabOperatorsCircle];
                if(isAdmin) {arrArrivalCopy.push(isAdmin)} else if(isOperator){ arrArrivalCopy.push(isOperator)} else if(isAccess) { arrArrivalCopy.push(isAccess)}
                setTabOperatorCircle(arrArrivalCopy)

                let index = arrDepartCopy.findIndex(e=>e._id === id)
                arrDepartCopy.splice(index, 1)

                if(isAdmin) {setTabAdminsCircle(arrDepartCopy)} else if(isOperator){setTabOperatorCircle(arrDepartCopy)} else { setTabAccessCircle(arrDepartCopy)}
                }
            }
            }  
        }

        const giveAccess = (id) => {
            if(currentSelectionList) {
                
                let isAdmin = tabAdminsCircle.find(e=>e._id === id)
                let isOperator = tabOperatorsCircle.find(e=>e._id === id)
                let isAccess = tabAccessCircle.find(e=>e._id === id)

                if(!isAccess){
                if(isAdmin || isOperator) {
                    
                let arrDepartCopy;                
                if(isAdmin) {arrDepartCopy = [...tabAdminsCircle]} else if(isOperator){ arrDepartCopy = [...tabOperatorsCircle]} else if(isAccess) { arrDepartCopy = [...tabAccessCircle]}
                
                let arrArrivalCopy = [...tabAccessCircle];
                if(isAdmin) {arrArrivalCopy.push(isAdmin)} else if(isOperator){ arrArrivalCopy.push(isOperator)} else if(isAccess) { arrArrivalCopy.push(isAccess)}
                setTabAccessCircle(arrArrivalCopy)

                let index = arrDepartCopy.findIndex(e=>e._id === id)
                arrDepartCopy.splice(index, 1)

                if(isAdmin) {setTabAdminsCircle(arrDepartCopy)} else if(isOperator){setTabOperatorCircle(arrDepartCopy)} else { setTabAccessCircle(arrDepartCopy)}
                }
            }
            }
        }

    return (

        <MediaContext.Consumer>
            { ({ media }) =>
                <ThemeContext.Consumer>
                    {({ theme }) =>
        <div className="list-container" style={{height: '100%', width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', boxSizing: 'border-box', paddingTop: 20}}>

            <div id="people-list" className="hide-scrollbar" style={combineStyles(theme.foreground, styles.sideContainer)}>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <h4 style={combineStyles(theme.foreground, {margin: 12})}>Contacts</h4>
                                    <div>
                                    <Icon
                                        path={mdiPlusCircleOutline}
                                        title='Ajouter'
                                        size={1}
                                        color={theme.foreground.color}
                                        style={{padding: 10, cursor: 'pointer'}}
                                        onClick={()=>console.log('to the right')}
                                    />
                                    <Icon
                                        path={mdiDownloadCircleOutline}
                                        title='Import .csv'
                                        size={1}
                                        color={theme.foreground.color}
                                        style={{padding: 10, cursor: 'pointer'}}
                                        onClick={()=>console.log('to the right')}
                                    />
                                    <Icon
                                        path={mdiTrashCanOutline}
                                        title='Supprimer'
                                        size={1}
                                        color={theme.foreground.color}
                                        style={{padding: 10, cursor: 'pointer'}}
                                        onClick={()=>console.log('to the right')}
                                    />
                                    </div>
                        </div>


            <div style={{width: '100%', marginBottom: 20, border: '1px solid rgba(0,0,0,0.3'}}></div>

            {
            peopleList.map((person, i)=>{

                return <div onClick={()=>{toggleSelectionPeople(person._id); toggleSelectionCircle(null)}} style={currentSelectionPeople === person._id ? styles.itemPeopleSelected : styles.itemPeople}>
                            <img style={styles.avatar} src={person.avatar}/>
                            {person.firstname} {person.lastname}
                        </div>

            })
            }

            </div>

                                  
            {(currentSelectionCircle || currentSelectionPeople) &&                
            <div style={combineStyles(theme.background, styles.centerContainer, {height: '70%', minWidth: '20%'})}>
                <h4 style={{margin: 5, color: '#fff'}}>Inclus</h4>
                <div className="hide-scrollbar" style={{overflowY: 'scroll', borderRadius: 3, width: '80%', height: '80%', margin: '0px 20px 20px 20px', backgroundColor: '#fff', color: '#333'}}>
                <>
                    {                        
                        currentSelectionCircle &&
                                                                                        

        tabAdminsCircle &&
        tabAdminsCircle.map((admin)=>{
            return <div onClick={()=>toggleSelectionList(admin._id)} style={currentSelectionList === admin._id ? styles.itemPeopleListSelected : styles.itemPeopleList}>
                <img style={styles.avatar} src={admin.avatar}/>
                {admin.firstname} {admin.lastname}
                <Icon
                    path={mdiShieldAccountOutline}
                    size={0.7}
                    color="black"
                    style={{marginLeft: 10, cursor: 'pointer'}}
                />
            </div>     
        })}


        {tabOperatorsCircle &&
        tabOperatorsCircle.map((operator)=>{
            return <div onClick={()=>toggleSelectionList(operator._id)} style={currentSelectionList === operator._id ? styles.itemPeopleListSelected : styles.itemPeopleList}>
                <img style={styles.avatar} src={operator.avatar}/>
                {operator.firstname} {operator.lastname}
                <Icon
                    path={mdiAccountStarOutline}
                    size={0.7}
                    color={"black"}
                    style={{marginLeft: 10, cursor: 'pointer'}}                    
                />
            </div>    
        })}


        {tabAccessCircle &&
        tabAccessCircle.map((access)=>{
            return <div onClick={()=>toggleSelectionList(access._id)} style={currentSelectionList === access._id ? styles.itemPeopleListSelected : styles.itemPeopleList}>
                <img style={styles.avatar} src={access.avatar}/>
                {access.firstname} {access.lastname}
            </div>   
        })}

                                
                            
                            
                       {(currentSelectionPeople && tabCirclesUserSelectedRevised) &&
                                tabCirclesUserSelectedRevised['rank1'].map( (circle, i) => {
                                    var enfant1 = tabCirclesUserSelectedRevised[circle.name].map((circle, j)=>{
                                        var enfant2 = tabCirclesUserSelectedRevised[circle.name].map((circle, k)=>{
                                            var enfant3 = tabCirclesUserSelectedRevised[circle.name].map((circle, l)=>{
                                                var enfant4 = tabCirclesUserSelectedRevised[circle.name].map((circle, m)=>{
                                                    var enfant5 = tabCirclesUserSelectedRevised[circle.name].map((circle, n)=>{

                                return <div style={currentSelectionList === circle._id ? styles.itemPeopleListSelected : styles.itemPeopleList}>
                                <div onClick={()=>{toggleSelectionList(circle._id)}}>
                                                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                                                    <Icon
                                                        path={mdiSubdirectoryArrowRight}
                                                        title='Niveau 6'
                                                        size={0.8}
                                                        color={theme.foreground.color}
                                                        style={{marginLeft: 50, marginRight: 5, cursor: 'pointer'}}
                                                    />   
                                                    <span>{circle.name}</span>
                                                    <Icon
                                                path={mdiShieldAccountOutline}
                                                title='Admin'
                                                size={0.7}
                                                color='#333'
                                                style={{display: circle.admin.find(e=>e === currentSelectionPeople) ? 'inline' : 'none', marginLeft: 10, cursor: 'pointer'}}
                                            />
                                            <Icon
                                                path={mdiAccountStarOutline}
                                                title='Opérateur'
                                                size={0.7}
                                                color='#333'
                                                style={{display: circle.operator.find(e=>e === currentSelectionPeople) ? 'inline' : 'none', marginLeft: 10, cursor: 'pointer'}}
                                            />
                                                    
                                                </div>
                                            </div>
                                        </div>
                                
                            })
                       
                                        return <>
                                    <div style={currentSelectionList === circle._id ? styles.itemPeopleListSelected : styles.itemPeopleList}>
                                        <div onClick={()=>{toggleSelectionList(circle._id)}}>
                                            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                                                <Icon
                                                    path={mdiSubdirectoryArrowRight}
                                                    title='Niveau 5'
                                                    size={0.8}
                                                    color={theme.foreground.color}
                                                    style={{marginLeft: 40, marginRight: 5, cursor: 'pointer'}}
                                                />   
                                                <span>{circle.name}</span>
                                                <Icon
                                                path={mdiShieldAccountOutline}
                                                title='Admin'
                                                size={0.7}
                                                color='#333'
                                                style={{display: circle.admin.find(e=>e === currentSelectionPeople) ? 'inline' : 'none', marginLeft: 10, cursor: 'pointer'}}
                                            />
                                            <Icon
                                                path={mdiAccountStarOutline}
                                                title='Opérateur'
                                                size={0.7}
                                                color='#333'
                                                style={{display: circle.operator.find(e=>e === currentSelectionPeople) ? 'inline' : 'none', marginLeft: 10, cursor: 'pointer'}}
                                            />
                                            </div>
                                        </div>
                                    </div>
                                                <div>
                                                {enfant5}
                                                </div>
                                                </>
                            
                                        })
                                        return <>
                                    <div style={currentSelectionList === circle._id ? styles.itemPeopleListSelected : styles.itemPeopleList}>
                                        <div onClick={()=>{toggleSelectionList(circle._id)}}>
                                            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                                                <Icon
                                                    path={mdiSubdirectoryArrowRight}
                                                    title='Niveau 4'
                                                    size={0.8}
                                                    color={theme.foreground.color}
                                                    style={{marginLeft: 30, marginRight: 5, cursor: 'pointer'}}
                                                />   
                                                <span>{circle.name}</span>
                                                <Icon
                                                path={mdiShieldAccountOutline}
                                                title='Admin'
                                                size={0.7}
                                                color='#333'
                                                style={{display: circle.admin.find(e=>e === currentSelectionPeople) ? 'inline' : 'none', marginLeft: 10, cursor: 'pointer'}}
                                            />
                                            <Icon
                                                path={mdiAccountStarOutline}
                                                title='Opérateur'
                                                size={0.7}
                                                color='#333'
                                                style={{display: circle.operator.find(e=>e === currentSelectionPeople) ? 'inline' : 'none', marginLeft: 10, cursor: 'pointer'}}
                                            />
                                            </div>
                                        </div>
                                    </div>
                                                <div>
                                                {enfant4}
                                                </div>
                                                </>

                                    })
                                    return <>
                                    <div style={currentSelectionList === circle._id ? styles.itemPeopleListSelected : styles.itemPeopleList}>
                                    <div onClick={()=>{toggleSelectionList(circle._id)}}>
                                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                                            <Icon
                                                path={mdiSubdirectoryArrowRight}
                                                title='Niveau 3'
                                                size={0.8}
                                                color={theme.foreground.color}
                                                style={{marginLeft: 20, marginRight: 5, cursor: 'pointer'}}
                                            />   
                                            <span>{circle.name}</span>
                                            <Icon
                                                path={mdiShieldAccountOutline}
                                                title='Admin'
                                                size={0.7}
                                                color='#333'
                                                style={{display: circle.admin.find(e=>e === currentSelectionPeople) ? 'inline' : 'none', marginLeft: 10, cursor: 'pointer'}}
                                            />
                                            <Icon
                                                path={mdiAccountStarOutline}
                                                title='Opérateur'
                                                size={0.7}
                                                color='#333'
                                                style={{display: circle.operator.find(e=>e === currentSelectionPeople) ? 'inline' : 'none', marginLeft: 10, cursor: 'pointer'}}
                                            />
                                        </div>
                                    </div>
                                    </div>
                                    <div>
                                    {enfant3}
                                    </div>
                                    </>
                                    })
                                    return <>
                                    <div style={currentSelectionList === circle._id ? styles.itemPeopleListSelected : styles.itemPeopleList}>
                                    <div onClick={()=>{toggleSelectionList(circle._id)}}>
                                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                                            <Icon
                                                path={mdiSubdirectoryArrowRight}
                                                title='Niveau 2'
                                                size={0.8}
                                                color={theme.foreground.color}
                                                style={{marginLeft: 10, marginRight: 5, cursor: 'pointer'}}
                                            />   
                                            <span>{circle.name}</span>
                                            <Icon
                                                path={mdiShieldAccountOutline}
                                                title='Admin'
                                                size={0.7}
                                                color='#333'
                                                style={{display: circle.admin.find(e=>e === currentSelectionPeople) ? 'inline' : 'none', marginLeft: 10, cursor: 'pointer'}}
                                            />
                                            <Icon
                                                path={mdiAccountStarOutline}
                                                title='Opérateur'
                                                size={0.7}
                                                color='#333'
                                                style={{display: circle.operator.find(e=>e === currentSelectionPeople) ? 'inline' : 'none', marginLeft: 10, cursor: 'pointer'}}
                                            />
                                        </div>
                                    </div>
                                    </div>
                                                <div>
                                                {enfant2}
                                                </div>
                                                </>

                                    })
                                    return <>
                                    <div style={currentSelectionList === circle._id ? styles.itemCircleListSelected : styles.itemCircleList}>
                                    <div onClick={()=>{toggleSelectionList(circle._id)}}>
                                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                                            <Icon
                                                path={mdiBlurRadial}
                                                title='Niveau 1'
                                                size={0.8}
                                                color={theme.foreground.color}
                                                style={{marginLeft: 0, marginRight: 5, cursor: 'pointer'}}
                                            />   
                                            <span>{circle.name}</span>
                                            <Icon
                                                path={mdiShieldAccountOutline}
                                                title='Admin'
                                                size={0.7}
                                                color='#333'
                                                style={{display: circle.admin.find(e=>e === currentSelectionPeople) ? 'inline' : 'none', marginLeft: 10, cursor: 'pointer'}}
                                            />
                                            <Icon
                                                path={mdiAccountStarOutline}
                                                title='Opérateur'
                                                size={0.7}
                                                color='#333'
                                                style={{display: circle.operator.find(e=>e === currentSelectionPeople) ? 'inline' : 'none', marginLeft: 10, cursor: 'pointer'}}
                                            />
                                        </div>
                                    </div>
                                    </div>
                                    <div>
                                    {enfant1}
                                    </div>
                                    </>
                                    })

                                    }
                                    </>
                                </div>
                            </div>
        }    

        {(currentSelectionCircle||currentSelectionPeople) &&

        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center'}}>
            <h3 style={(currentSelectionCircle || currentSelectionPeople) && combineStyles(theme.foreground,{textAlign: 'center', padding: '0px 10px 10px 10px', borderBottom: '1px solid rgba(0,0,0,0.6)', color: 'rgba(0,0,0,0.6)', position: 'absolute', top: '23%', overflow: 'visible'})}>{currentSelectionCircle && tabDataCircles.find(e=>e._id === currentSelectionCircle).name}{currentSelectionPeople && tabDataPeople.find(e=>e._id === currentSelectionPeople).firstname} {currentSelectionPeople && tabDataPeople.find(e=>e._id === currentSelectionPeople).lastname}</h3>

            <div style={combineStyles(theme.background, {borderRadius: 10, display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center'})}>
                                    <Icon
                                        path={mdiShieldAccountOutline}
                                        title='Habiliter comme admin'
                                        size={1}
                                        color="white"
                                        style={{padding: 10, cursor: 'pointer'}}
                                        onClick={()=>giveAdmin(currentSelectionList)}
                                    />
                                    <Icon
                                        path={mdiAccountStarOutline}
                                        title='Habiliter comme opérateur'
                                        size={1}
                                        color="white"
                                        style={{padding: 10, cursor: 'pointer'}}
                                        onClick={()=>giveOperator(currentSelectionList)}
                                    />
                                    <Icon
                                        path={mdiAccountCheckOutline}
                                        title='Habiliter en accès standard'
                                        size={1}
                                        color="white"
                                        style={{padding: 10, cursor: 'pointer'}}
                                        onClick={()=>giveAccess(currentSelectionList)}
                                    />
                                    <span style={{marginTop: -15, color: 'rgba(255,255,255,0.3'}}>_____</span>
                                    <Icon
                                        path={mdiArrowLeftBoldCircle}
                                        size={1}
                                        title='Ajouter'
                                        color="white"
                                        style={{padding: 10, cursor: 'pointer'}}
                                        onClick={()=>{currentSelectionCircle ? includePerson(currentSelectionList) : includeCircle(currentSelectionList)}}
                                    />
                                    <Icon
                                        path={mdiArrowRightBoldCircle}
                                        size={1}
                                        title='Retirer'
                                        color="white"
                                        style={{padding: 10, cursor: 'pointer'}}
                                        onClick={()=>{currentSelectionCircle ? extractPerson(currentSelectionList) : extractCircle(currentSelectionList)}}
                                    />
            </div>
            </div>
            }
            {(currentSelectionCircle||currentSelectionPeople) &&
            <div style={combineStyles(theme.background, styles.centerContainer, {height: '70%', minWidth: '20%'})}>
                <h4 style={{margin: 5, color: '#fff'}}>Disponible</h4>
                <div className="hide-scrollbar" style={{overflowY: 'scroll', borderRadius: 3, width: '80%', height: '80%', margin: '0px 20px 20px 20px', backgroundColor: '#fff', color: '#333'}}>
                            {
                            tabOtherPeople &&
                            tabOtherPeople.map((person)=>{
                                return <div onClick={()=>toggleSelectionList(person._id)} style={currentSelectionList === person._id ? styles.itemPeopleListSelected : styles.itemPeopleList}>
                                    <img style={styles.avatar} src={person.avatar}/>
                                    {person.firstname} {person.lastname}
                                </div>   
                            })}


        {(currentSelectionPeople && tabOtherCirclesRevised) &&
                                tabOtherCirclesRevised['rank1'].map( (circle, i) => {
                                    var enfant1 = tabOtherCirclesRevised[circle.name].map((circle, j)=>{
                                        var enfant2 = tabOtherCirclesRevised[circle.name].map((circle, k)=>{
                                            var enfant3 = tabOtherCirclesRevised[circle.name].map((circle, l)=>{
                                                var enfant4 = tabOtherCirclesRevised[circle.name].map((circle, m)=>{
                                                    var enfant5 = tabOtherCirclesRevised[circle.name].map((circle, n)=>{

                                return <div style={currentSelectionList === circle._id ? styles.itemPeopleListSelected : styles.itemPeopleList}>
                                <div onClick={()=>{toggleSelectionList(circle._id)}}>
                                                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                                                    <Icon
                                                        path={mdiSubdirectoryArrowRight}
                                                        title='Niveau 6'
                                                        size={0.8}
                                                        color={theme.foreground.color}
                                                        style={{marginLeft: 50, marginRight: 5, cursor: 'pointer'}}
                                                    />   
                                                    <span>{circle.name}</span>
                                                </div>
                                            </div>
                                        </div>
                                
                            })
                       
                                        return <>
                                     <div style={currentSelectionList === circle._id ? styles.itemPeopleListSelected : styles.itemPeopleList}>
                                        <div onClick={()=>{toggleSelectionList(circle._id)}}>
                                            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                                                <Icon
                                                    path={mdiSubdirectoryArrowRight}
                                                    title='Niveau 5'
                                                    size={0.8}
                                                    color={theme.foreground.color}
                                                    style={{marginLeft: 40, marginRight: 5, cursor: 'pointer'}}
                                                />   
                                                <span>{circle.name}</span>
                                            </div>
                                        </div>
                                    </div>
                                                <div>
                                                {enfant5}
                                                </div>
                                                </>
                            
                                        })
                                        return <>
                                    <div style={currentSelectionList === circle._id ? styles.itemPeopleListSelected : styles.itemPeopleList}>
                                        <div onClick={()=>{toggleSelectionList(circle._id)}}>
                                            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                                                <Icon
                                                    path={mdiSubdirectoryArrowRight}
                                                    title='Niveau 4'
                                                    size={0.8}
                                                    color={theme.foreground.color}
                                                    style={{marginLeft: 30, marginRight: 5, cursor: 'pointer'}}
                                                />   
                                                <span>{circle.name}</span>
                                            </div>
                                        </div>
                                    </div>
                                                <div>
                                                {enfant4}
                                                </div>
                                                </>

                                    })
                                    return <>
                                    <div style={currentSelectionList === circle._id ? styles.itemPeopleListSelected : styles.itemPeopleList}>
                                    <div onClick={()=>{toggleSelectionList(circle._id)}}>
                                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                                            <Icon
                                                path={mdiSubdirectoryArrowRight}
                                                title='Niveau 3'
                                                size={0.8}
                                                color={theme.foreground.color}
                                                style={{marginLeft: 20, marginRight: 5, cursor: 'pointer'}}
                                            />   
                                            <span>{circle.name}</span>
                                        </div>
                                    </div>
                                    </div>
                                    <div>
                                    {enfant3}
                                    </div>
                                    </>
                                    })
                                    return <>
                                    <div style={currentSelectionList === circle._id ? styles.itemPeopleListSelected : styles.itemPeopleList}>
                                    <div onClick={()=>{toggleSelectionList(circle._id)}}>
                                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                                            <Icon
                                                path={mdiSubdirectoryArrowRight}
                                                title='Niveau 2'
                                                size={0.8}
                                                color={theme.foreground.color}
                                                style={{marginLeft: 10, marginRight: 5, cursor: 'pointer'}}
                                            />   
                                            <span>{circle.name}</span>
                                        </div>
                                    </div>
                                    </div>
                                                <div>
                                                {enfant2}
                                                </div>
                                                </>

                                    })
                                    return <>
                                    <div style={currentSelectionList === circle._id ? styles.itemPeopleListSelected : styles.itemPeopleList}>
                                    <div onClick={()=>{toggleSelectionList(circle._id)}}>
                                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                                            <Icon
                                                path={mdiBlurRadial}
                                                title='Niveau 1'
                                                size={0.8}
                                                color={theme.foreground.color}
                                                style={{marginLeft: 0, marginRight: 5, cursor: 'pointer'}}
                                            />   
                                            <span>{circle.name}</span>
                                        </div>
                                    </div>
                                    </div>
                                    <div>
                                    {enfant1}
                                    </div>
                                    </>
                                    })

                                    }




                </div>
            </div>
            }

            <div className="hide-scrollbar" id="circles-list" style={combineStyles(theme.background, styles.sideContainer)}>
            
            
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <h4 style={combineStyles(theme.foreground, {margin: 12})}>Cercles</h4>
                                    <div>
                                    <Icon
                                        path={mdiPlusCircleOutline}
                                        title='Ajouter'
                                        size={1}
                                        color={theme.foreground.color}
                                        style={{padding: 10, cursor: 'pointer'}}
                                        onClick={()=>console.log('to the right')}
                                    />
                                    <Icon
                                        path={mdiDownloadCircleOutline}
                                        title='Import .csv'
                                        size={1}
                                        color={theme.foreground.color}
                                        style={{padding: 10, cursor: 'pointer'}}
                                        onClick={()=>console.log('to the right')}
                                    />
                                    <Icon
                                        path={mdiTrashCanOutline}
                                        title='Supprimer'
                                        size={1}
                                        color={theme.foreground.color}
                                        style={{padding: 10, cursor: 'pointer'}}
                                        onClick={()=>console.log('to the right')}
                                    />
                                    </div>
                        </div>

                        <h4 style={{margin: 12, color: '#fff'}}>Cercles</h4>
            <div style={{width: '100%', marginBottom: 20, border: '1px solid rgba(0,0,0,0.3'}}></div>

            {tabDataCirclesRevised &&
                   tabDataCirclesRevised['rank1'].map( (circle, i) => {
                var enfant1 = tabDataCirclesRevised[circle.name].map((circle, j)=>{
                    var enfant2 = tabDataCirclesRevised[circle.name].map((circle, k)=>{
                        var enfant3 = tabDataCirclesRevised[circle.name].map((circle, l)=>{
                            var enfant4 = tabDataCirclesRevised[circle.name].map((circle, m)=>{
                                var enfant5 = tabDataCirclesRevised[circle.name].map((circle, n)=>{
                                        return circle.status === 'Active' && <div onClick={()=>{toggleSelectionCircle(circle._id); toggleSelectionPeople(null)}} style={currentSelectionCircle === circle._id ? styles.itemCircleSelected : styles.itemCircle}>
                                                                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                                <Icon
                                    path={mdiSubdirectoryArrowRight}
                                    title='Niveau 6'
                                    size={0.8}
                                    color={currentSelectionCircle === circle._id ? "#fff" : theme.foreground.color}
                                    style={{marginRight: 5, cursor: 'pointer'}}
                                    onClick={()=>console.log('to the right')}
                                />   
                                <span>{circle.name}</span>
                                </div>
                                            </div>
                                    })
                                    return (
                                        <div style={currentSelectionCircle === circle._id ? combineStyles(styles.itemCircleSelected, theme.background) : styles.itemCircle}>
                                        {circle.status === 'Active' && <div onClick={()=>{toggleSelectionCircle(circle._id); toggleSelectionPeople(null)}}>
                                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                                <Icon
                                    path={mdiSubdirectoryArrowRight}
                                    title='Niveau 5'
                                    size={0.8}
                                    color={currentSelectionCircle === circle._id ? "#fff" : theme.foreground.color}
                                    style={{marginRight: 5, cursor: 'pointer'}}
                                    onClick={()=>console.log('to the right')}
                                />   
                                <span>{circle.name}</span>
                                </div>
                                        </div>}
                                        <div>
                                            {enfant5}
                                        </div>
                                        </div>
                                        )
                                })
                                return (
                                    <div style={currentSelectionCircle === circle._id ? combineStyles(styles.itemCircleSelected, theme.background) : styles.itemCircle}>
                                    {circle.status === 'Active' && <div onClick={()=>{toggleSelectionCircle(circle._id); toggleSelectionPeople(null)}}>
                                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                                <Icon
                                    path={mdiSubdirectoryArrowRight}
                                    title='Niveau 4'
                                    size={0.8}
                                    color={currentSelectionCircle === circle._id ? "#fff" : theme.foreground.color}
                                    style={{marginRight: 5, cursor: 'pointer'}}
                                    onClick={()=>console.log('to the right')}
                                />   
                                <span>{circle.name}</span>
                                </div>
                                    </div>}
                                    <div>
                                        {enfant4}
                                    </div>
                                    </div>
                                    )
                            })
                            return (
                                <div style={currentSelectionCircle === circle._id ? combineStyles(styles.itemCircleSelected, theme.background) : styles.itemCircle}>
                                {circle.status === 'Active' && <div onClick={()=>{toggleSelectionCircle(circle._id); toggleSelectionPeople(null)}}>
                                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                                <Icon
                                    path={mdiSubdirectoryArrowRight}
                                    title='Niveau 3'
                                    size={0.8}
                                    color={currentSelectionCircle === circle._id ? "#fff" : theme.foreground.color}
                                    style={{marginRight: 5, cursor: 'pointer'}}
                                    onClick={()=>console.log('to the right')}
                                />   
                                <span>{circle.name}</span>
                                </div>
                                </div>}
                                <div>
                                    {enfant3}
                                </div>
                                </div>
                                )
                        })
                        return (
                            <div style={currentSelectionCircle === circle._id ? combineStyles(styles.itemCircleSelected, theme.background) : styles.itemCircle}>
                            {circle.status === 'Active' && <div onClick={()=>{toggleSelectionCircle(circle._id); toggleSelectionPeople(null)}}>
                            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                                <Icon
                                    path={mdiSubdirectoryArrowRight}
                                    title='Niveau 2'
                                    size={0.8}
                                    color={currentSelectionCircle === circle._id ? "#fff" : theme.foreground.color}
                                    style={{marginRight: 5, cursor: 'pointer'}}
                                    onClick={()=>console.log('to the right')}
                                />   
                                <span>{circle.name}</span>
                                </div>
                            </div>}
                            <div>
                                {enfant2}
                            </div>
                            </div>
                            )
                    })
                    return (
                        <div style={currentSelectionCircle === circle._id ? combineStyles(styles.itemCircleSelected, theme.background) : styles.itemCircle}>
                        {circle.status === 'Active' && <div onClick={()=>{toggleSelectionCircle(circle._id); toggleSelectionPeople(null)}}>
                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                        <Icon
                            path={mdiBlurRadial}
                            title='Niveau 1'
                            size={0.8}
                            color={currentSelectionCircle === circle._id ? "#fff" : theme.foreground.color}
                            style={{marginRight: 5, cursor: 'pointer'}}
                            onClick={()=>console.log('to the right')}
                        />   
                        <span>{circle.name}</span>
                        </div>
                        </div>
                        }
                        <div>
                            {enfant1}
                        </div>
                        </div>
                        )
            })
            }

            </div>


        </div>

                    }
                </ThemeContext.Consumer>
            }
        </MediaContext.Consumer>
    )
}
export default TransferList;

const styles = {
    itemPeople: {
        cursor: 'pointer',
        fontWeight: 'normal',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 3,
        margin: 10
    },
    itemCircle: {
        cursor: 'pointer',
        fontWeight: 'normal',
        paddingLeft: 10,
        margin: 10
    },
    itemPeopleSelected: {
        cursor: 'pointer',
        fontWeight: 'bold',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: 10,
        color: 'rgba(255,255,255,1)',
        padding: 8,
        borderRadius: 4
    },
    itemCircleSelected: {
        cursor: 'pointer',
        fontWeight: 'bold',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: 10,
        color: 'rgba(255,255,255,1)',
        padding: 8,
        borderRadius: 4
    },
    itemPeopleList: {
        cursor: 'pointer',
        fontWeight: 'normal',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 3,
        color: 'rgba(0,0,0,0.7)',
        margin: 10
    },
    itemCircleList: {
        cursor: 'pointer',
        fontWeight: 'normal',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        color: 'rgba(0,0,0,0.7)',
        margin: 10,
        padding: 3,
    },
    itemPeopleListSelected: {
        cursor: 'pointer',
        fontWeight: 'bold',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius: 2, 
        backgroundColor: 'rgba(0,0,0,0.2)',
        padding: 8,
        color: 'rgba(0,0,0,0.7)',
        width: '100%'
    },
    itemCircleListSelected: {
        cursor: 'pointer',
        fontWeight: 'bold',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius: 2,
        padding: 8, 
        backgroundColor: 'rgba(0,0,0,0.2)',
        color: 'rgba(0,0,0,0.7)',
        width: '100%'
    },
    avatar: {
        marginRight: 7, 
        height: '20px',
        width: '20px',
        borderRadius: '50%',
        border: '1px solid white',
        boxShadow: '1px 3px 5px 1px rgba(0, 0 , 0, 0.4)',
    },
    sideContainer: {
        boxShadow: '1px 2px 10px 2px rgba(0, 0 , 0, 0.4)',
        height: '100%',
        width: '50%',
        minWidth: '20%',
        borderRadius: 2,
        padding: 10,
        margin: 10,
        backgroundColor: 'rgba(0,0,0,0.05)', 
        flexWrap: 'wrap',
        overflow: 'scroll',
        boxSizing: 'border-box'
    },
    centerContainer: {
        boxShadow: '1px 2px 10px 2px rgba(0, 0 , 0, 0.4)',
        height: '100%',
        minWidth: '20%',
        borderRadius: 10,
        margin: 10,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }
}