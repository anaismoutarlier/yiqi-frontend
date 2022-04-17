import React, { useState, useEffect, useContext } from 'react'

//styles_________
import '../../App.css'
import '../dashboardviews/Circles.css'

//REDUX______________________________
import { connect } from 'react-redux'

//UI_____________________
import Icon from '@mdi/react'
import {
    mdiArrowUp,
    mdiArrowDown,
    mdiPlus,
    mdiClose,
    mdiViewSequentialOutline,
    mdiViewParallelOutline,
    mdiArrowTopLeft,
    mdiArrowRight,
    mdiArrowLeft,
    mdiRotateRightVariant,
    mdiRotateLeftVariant,
    mdiOrbitVariant,
} from '@mdi/js'

//CONTEXT____________________
import { ThemeContext, themes } from '../../hooks/theme-context'

//COMPONENTS
import Button from '../Button'
import Nav from '../Nav'
import Select from '../Select'
//import ScrollCarousel from '../../components/ScrollCarousel'

//HELPER FUNCTIONS__________________
import combineStyles from '../../helpers/combineStyles'

const Circles = ({ user }) => {
//CONTEXT HOOK
    const { theme, changeTheme } = useContext(ThemeContext)

//STATES HOOKS
    const [circlesOfSelectedArchi, setCirclesOfSelectedArchi] = useState([])
    const [listOfNamesAndAvatars, setListOfNamesAndAvatars] = useState([])

    const [architectures, setArchitectures] = useState([])
    const [archiSelected, setArchiSelected] = useState()
    const [cutArchi, setCutArchi] = useState()

    const [clients, setClients] = useState([])
    const [clientSelected, setClientSelected] = useState({})

    const [showUsers, setShowUsers] = useState({level: null, show: false, right: 0, top: 0})

//mounting component and follow user
    useEffect(() => {
        console.log({user})
        const fetchClients = async () => {
            const data = await fetch(`${global.BACKEND}/users/isadmin/${user._id}`)
            const json = await data.json()

            if (json.result) {
                // if(json.clientsWhereUserAdmin) {console.log('*********************************** ', json.clientsWhereUserAdmin)
                // console.log('*********************************** 2 ', json.clientsWhereUserAdmin[0])
                // console.log('*********************************** 3 ', json.clientsWhereUserAdmin[0].architectures)
                // console.log('*********************************** 4 ', json.clientsWhereUserAdmin[0].architectures[0])
                // }
              
            console.log(json.result)
                
                setClients(json.clientsWhereUserAdmin)
                setClientSelected(json.clientsWhereUserAdmin[0])
                    setArchitectures(json.clientsWhereUserAdmin[0].architectures)
                    setArchiSelected(json.clientsWhereUserAdmin[0].architectures[0])
            }
        }
        if (user) fetchClients()

    }, [user])

// useEffect(()=> {

//     const fetchArchitectures = async () => {

//         const data = await fetch(`${global.BACKEND}/users/architectures/${clientSelected._id}`)
//         const json = await data.json()

//         if (json.result) {
//             setArchitectures(json.architectures)
//             setArchiSelected(json.architectures[0])
//         }
//     }

//     if (clientSelected) fetchArchitectures()
// }, [clientSelected])


//Maintaining setters
    useEffect(()=>{
        console.log('ArchiSelected : ', archiSelected)
        // transform in a flat array for Select with depth to render depth in front
        if (cutArchi) {
            extractCircles([cutArchi])
        } else {
            if (archiSelected) {extractCircles([archiSelected])}
        //get users from selected Archi
        }
    }, [archiSelected])

    useEffect(()=>{
        getUsers(circlesOfSelectedArchi)
    }, [circlesOfSelectedArchi])

//FONCTIONS FACTORISEES

    // extract circles from selected archi
    let temp = []; 
    const extractCircles = (archi, d = 0) => {            
        if(archi) {
                archi.forEach((el)=>{
                    temp.push({...el, depth: d})
                    if(el.children) {extractCircles(el.children, d+1)}
                })
            }
        setCirclesOfSelectedArchi(temp)
    }

    // fetch users of each circle in circles of selected archi
    const getUsers = async () => {

        const data = await fetch(`${global.BACKEND}/circles/get-users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ array: circlesOfSelectedArchi })
        })
            const json = await data.json()

             if (json.result) {
                setListOfNamesAndAvatars(json.listOfNamesAndAvatars)
             }
    }

// handle click on div circle
    const handleClick = (e, level) => {
            if (!e) var e = window.event;
            e.cancelBubble = true;
            if (e.stopPropagation) e.stopPropagation();
            
            if(cutArchi && archiSelected === level) {
                setArchiSelected(cutArchi)
                setCutArchi()
            } else if (cutArchi && archiSelected !== level) { 
                setArchiSelected(level)
            } else {
                setCutArchi(archiSelected)
                setArchiSelected(level)   
            }       
    }

// handle up & down

    const handleUp = async (e, level) => {
        
        if (!e) var e = window.event;
        e.cancelBubble = true;
        if (e.stopPropagation) e.stopPropagation();

        const data = await fetch(`${global.BACKEND}/architectures/update-index`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ archiId: archiSelected._id, circleId: level.circle, typeUpDown: 'up' })
        })
            const json = await data.json()
            if (json.result) {
                setArchiSelected(json.archiSaved)
            }
    }

    const handleDown = async (e, level) => {

        if (!e) var e = window.event;
        e.cancelBubble = true;
        if (e.stopPropagation) e.stopPropagation();

        const data = await fetch(`${global.BACKEND}/architectures/update-index`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ archiId: archiSelected._id, circleId: level.circle, typeUpDown: 'down' })
        })
            const json = await data.json()
            if (json.result) {
                setArchiSelected(json.archiSaved)
            }

    }

//FUNCTION TO FIND THEN TOGGLE ORIENTATION

const copyArchiToToggleOrientation = (array, idToSearch) => {  
    let copy = [{...array}]
    const findAndToggle = (array, id) => {
        array.forEach((cir)=>{
            if(cir._id === id) {
                cir.orientation = cir.orientation === 'horizontal' ? 'vertical' : 'horizontal'
                setArchiSelected(copy[0])
                return
            } else if (cir.children.length > 0) {
                findAndToggle(cir.children, idToSearch)           
            } else {
                return 'No matching circle found, sorry !'
            }
        })
}
findAndToggle(copy, idToSearch)
} 


// toggle Orientation    

    const toggleOrientation = async (e, level) => {    

        if (!e) var e = window.event;
        e.cancelBubble = true;
        if (e.stopPropagation) e.stopPropagation();

        //fetch update architecture

        const data = await fetch(`${global.BACKEND}/architectures/update-orientation`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({ archiId: archiSelected._id, circleId: level._id, newOrientation: level.orientation === 'horizontal' ? 'vertical' : 'horizontal' })
            })
            const json = await data.json()
    
            if (json.result) {
                //change architecture in front
                copyArchiToToggleOrientation(archiSelected, level._id)
            }
        
    }


//FONCTIONS DE GESTION DES SELECTIONS DANS LES SELECTS
    const updateArchiSelection = e => {

        setArchiSelected(e.value)
    }

    const handleCircleSelection = e => {
        if(!cutArchi) {
        setCutArchi(archiSelected)
        setArchiSelected(e.value)
        } else {setArchiSelected(e.value)}
    }

//apparition of users on hover number

const toggleUsers = (event, level) => {
    if (!event) var event = window.event;
    event.cancelBubble = true;
    if (event.stopPropagation) event.stopPropagation();

    showUsers.show ?
    setShowUsers({level: null, show: false})
    :
    setShowUsers({level: level, show: true})


}

// déploiement de l'archi
let boo = false

const architecturesDeploy = (archi, theme, j = 0, orientationParent) => {
    return(
    archi.map( (level, i) => {

        if (i==0) {boo = !boo}
        if (i==archi.length) {boo = !boo}

         return (
          <div onClick={(e)=>handleClick(e, level)} className={`${j!=0 && 'circle '}transition-color`} style={{borderBottom: `2px solid ${theme.foreground.color}`, cursor: 'pointer', display: 'flex', flexDirection: 'column', padding: j===0 ? 30 : 10, margin: '0.5%', minWidth: 20, minHeight: 20, width: '90%', height: 'fit-content', backgroundColor: j%2 === 0 ? '#eee' : '#ddd', borderRadius: 3, boxShadow: '0px 0px 3px 1px rgba(0, 0 , 0, 0.1)'}}>
                <div style={{fontWeight: 'bolder', color: theme.foreground.color, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems:'center', marginBottom: `${j===0 ? '20px' : '10px'}`}}>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <h4 style={{margin: 0, fontSize: 16-j}}>{level.name}</h4>
                         {listOfNamesAndAvatars?.filter(e=>e.id === level.circle)[0]?.datas.length > 0 &&
                                <div className='transition-color' onClick={(e)=>{toggleUsers(e, level)}} style={{marginLeft: 10, minHeight: '1.05vh', minWidth: '0.6vw', padding: 4, borderRadius: '50%', fontSize: 12, color: 'white', backgroundColor: theme.background_transparent.backgroundColor}}>{listOfNamesAndAvatars?.filter(e=>e.id === String(level.circle))[0]?.datas.length}</div>
    
                        }
                    </div>    
                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems:'center'}}>
                            {level.children.length > 1 &&
                            <Icon
                                path={mdiOrbitVariant}
                                size={0.7}
                                color={theme.foreground.color}
                                style={{cursor: 'pointer', marginRight: 10}}
                                onClick={(e)=>toggleOrientation(e, level)}
                            />
                            }
                            {archi.length > 1 && i > 0 &&
                            <Icon
                                path={orientationParent === 'horizontal' ? mdiArrowUp : mdiArrowLeft}
                                size={0.6}
                                color={'#999'}
                                style={{cursor: 'pointer'}}
                                onClick={(e)=>handleUp(e, level)}
                            />
                            }
                            {archi.length > 1 && i < archi.length-1 &&
                            <Icon
                                path={orientationParent === 'horizontal' ? mdiArrowDown : mdiArrowRight}
                                size={0.6}
                                color={'#999'}
                                style={{cursor: 'pointer'}}
                                onClick={(e)=>handleDown(e, level)}
                            />
                            }
                            <Icon
                                path={mdiClose}
                                size={0.8}
                                color={'#999'}
                                style={{cursor: 'pointer', marginLeft: 3}}
                                onClick={()=>console.log('click')}
                            />
                        </div>
                </div>
                <div style={{display: 'flex', flexDirection: level.orientation == 'horizontal' ? 'column' : 'row'}}>
              {level.children.length > 0 && architecturesDeploy(level.children, theme, j + 1, level.orientation)}
                </div>
          </div>
         )
         
    }))
}
    
    return (
        <>
            <div className="hide-scrollbar" style={{ minHeight: '80%', height: '100%', maxHeight: '100%', overflow: 'scroll', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start'}}>

                <div style={{height: '5%', width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <div style = {{paddingLeft: '2.7vw', display : 'flex', flex: 1}}>
                    <Select
                    values={ clients.map(client => ({ value: client, label: client.name })) }
                    handleChange={ (e)=>{setClientSelected(e)} }
                    placeholder={clientSelected && `Organisation : ${clientSelected.name}`}
                    name="clientselect"
                    style={{width: '20%', margin: 10}}
                    closable={false}
                    />
                    <Select
                    values={ architectures.map(archi => ({ value: archi, label: archi.name })) }
                    handleChange={ updateArchiSelection }
                    placeholder={architectures[0] && `Architecture : ${architectures[0].name}`}
                    name="archtectureselect"
                    style={{width: '20%', margin: 10}}
                    closable={false}
                    />
                    <Select
                    values={ circlesOfSelectedArchi.map(e=>({ value: e, label: Array(3).fill('\xa0').join('').repeat(e.depth) + '· ' + e.name})) }
                    handleChange={ handleCircleSelection }
                    placeholder="Cercles..."
                    name="cercleselect"
                    style={{width: '20%', margin: 10}}
                    closable={false}
                    />
                    </div>
                    {cutArchi &&
                        <> 
                        <Icon
                        path={mdiArrowTopLeft}
                        size={1}
                        color={'#999'}
                        style={{cursor: 'pointer'}}
                        title={'Retour à la base'}
                        onClick={()=>{setArchiSelected(cutArchi); setCutArchi()}}
                        />
                        <p style= {{cursor: 'pointer', color: '#999', fontSize: 10, paddingRight: '3.3vw'}} onClick={()=>{setArchiSelected(cutArchi); setCutArchi()}}>RETOUR A LA VUE GLOBALE</p>
                        
                        </>
                    }
                </div>

                <div style={{height: '95%', width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start'}}>                
                {    archiSelected &&
                        architecturesDeploy([archiSelected], theme)
                }
                </div>

                {showUsers &&                            
                    <div style={{
                        display: showUsers.show ? 'flex' : 'none',
                        flexDirection: 'column',
                        justifyContent: 'start',
                        alignItems: 'start',
                        backgroundColor: '#FFF',
                        position : 'absolute',
                        right: 0,
                        minWidth: 50,
                        maxHeight: '79%',
                        padding: '10px 10px 10px 20px',
                        borderRadius: 5,                                
                        overflowY: 'auto',
                        borderLeft: `2px solid ${theme.foreground.color}`,
                        transition: 'all 0.1 ease-in'
                        }}
                        >
                    <span style={{position: 'sticky', alignSelf: 'flex-end', top: 5, right: 5, cursor: 'pointer', height: 0}}>
                        <Icon
                            path={mdiClose}
                            size={0.8}
                            color={'#999'}
                            style={{cursor: 'pointer'}}
                            onClick={()=>{setShowUsers({level: null, show: false, right: 0, top: 0})}}
                        />
                    </span>
                    {showUsers.level &&
                        listOfNamesAndAvatars?.filter(e=>e.id === showUsers.level.circle)[0]?.datas.map((user)=>{
                                return (
                                    <div style={{margin: '5px 0px', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                                       <img style={{borderRadius: '50%', paddingRight: 10, width: 30, height: 30}} src={user.avatar}/> 
                                        <span>{user.username}</span>
                                    </div>
                                )
                        })
                    }
                    </div>
                }

        </div>
        </>
    )
}


function mapStateToProps({ user }) {
    return { user }
}

export default connect(mapStateToProps, null)(Circles);