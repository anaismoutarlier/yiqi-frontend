import React, { useState, useEffect } from 'react'

///ANTD______________
// import { Input } from 'antd';
// import 'antd/dist/antd.css'
// import { UserOutlined } from '@ant-design/icons';

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
} from '@mdi/js'

//CONTEXT___________________
import { ThemeContext } from '../../hooks/theme-context';


//COMPONENTS
import Button from '../Button'
import Nav from '../Nav'
import Select from '../Select'
//import ScrollCarousel from '../../components/ScrollCarousel'

//HELPER FUNCTIONS__________________
import combineStyles from '../../helpers/combineStyles'
import { set } from 'mongoose'

const Circles = ({user, theme}) => {

    const [circlesOfSelectedArchi, setCirclesOfSelectedArchi] = useState([])
    const [usersOfSelectedArchi, setUsersOfSelectedArchi] = useState([])

    const [architectures, setArchitectures] = useState([])
    const [archiSelected, setArchiSelected] = useState(architectures[0])
    const [cutArchi, setCutArchi] = useState()

    const [clients, setClients] = useState([])
    const [clientSelected, setClientSelected] = useState(clients[0])


//mounting component
    useEffect(() => {

        const fetchArchitecture = async () => {
            // si user appartient à admin d'un ou plusieurs clients, donc possédant des architectures
            //const isAdmin = await fetch(`/users/isadmin/${user.user._id}`)
            const data = await fetch(`${global.BACKEND}/users/architectures`)
            const json = await data.json()

            if (json.result) {
                setArchitectures(json.architectures)
                setArchiSelected(json.architectures[0])
            }
        }

        if (user) fetchArchitecture()


    }, [user])

//Maintaining setters
    useEffect(()=>{
        console.log('ArchiSelected : ', archiSelected)
        // transform in a flat array for Select with depth to render depth in front
        if (archiSelected) {extractCircles([archiSelected])}
        getUsers(circlesOfSelectedArchi)
    }, [archiSelected])

    useEffect(()=>{
        console.log('circlesOfSelectedArchi : ', circlesOfSelectedArchi)
    }, [circlesOfSelectedArchi])

    useEffect(()=>{
        console.log('cutArchi : ', cutArchi)
    }, [cutArchi])

//FONCTIONS FACTORISEES

    // extract circles from selected archi
    const temp = []; 
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
    const tempSecond = []
    const getUsers = async (archi) => {
        const fetchCirclesUsers = async (circle) => {
            const data = await fetch(`${global.BACKEND}/circles/get-users/${circle._id}`)
            const json = await data.json()
            if (json.result) {
                tempSecond.push({...json.result, id: circle._id})
            }
        }
        archi.forEach((circle)=>{
            fetchCirclesUsers(circle)
        })
        setUsersOfSelectedArchi(tempSecond)
        console.log(tempSecond)
    }




// handle click on div circle
    const handleClick = (e, level) => {
            if (!e) var e = window.event;
            e.cancelBubble = true;
            if (e.stopPropagation) e.stopPropagation();
            if (!cutArchi) {
            setCutArchi(archiSelected)
            setArchiSelected(level)
        }  else {setArchiSelected(level)}
    }

// handle up & down

    const handleUp = (e, level) => {
        if (!e) var e = window.event;
        e.cancelBubble = true;
        if (e.stopPropagation) e.stopPropagation();
        console.log(level)
    }

    const handleDown = (e, level) => {
        if (!e) var e = window.event;
        e.cancelBubble = true;
        if (e.stopPropagation) e.stopPropagation();
        console.log(level)
    }

//FUNCTION TO GET PARENT ID FROM DATABASE CIRCLE
const fetchCircleParent = async (circle) => {
    const data = await fetch(`${global.BACKEND}/circles/get-parents/${circle.circle}`)
    const json = await data.json()
    if (json.result) {
        return json.parents
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
                console.log('circle modified : ', json.circle)
                //change architecture in front
                copyArchiToToggleOrientation(archiSelected, level._id)
            }
        
    }

// déploiement de l'archi
let boo = false

const architecturesDeploy = (archi, theme, j = 0) => {
    console.log('ARCHI : ', archi)
    return(
    archi.map( (level, i) => {

        if (i==0) {boo = !boo}
        if (i==archi.length) {boo = !boo}

         return (
          <div onClick={(e)=>handleClick(e, level)} className={`${j!=0 && 'circle '}transition-color`} style={{borderBottom: `2px solid ${theme.foreground.borderColor}`, cursor: 'pointer', display: 'flex', flexDirection: 'column', padding: j===0 ? 30 : 10, margin: '0.5%', minWidth: 20, minHeight: 20, width: '90%', height: 'fit-content', backgroundColor: j%2 === 0 ? '#eee' : '#ddd', borderRadius: 3, boxShadow: '0px 0px 3px 1px rgba(0, 0 , 0, 0.1)'}}>
                <div style={{fontWeight: 'bolder', color: theme.foreground.color, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems:'center', marginBottom: `${j===0 && '20px'}`}}>
                    {level.name}
                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems:'center'}}>
                            {
                                <div className='transition-color' style={{padding: 5, borderRadius: '50%', fontSize: 14, color: 'white', backgroundColor: theme.background_transparent.backgroundColor}}>25</div>
                            }
                            {level.children.length > 1 &&
                            <Icon
                                path={level.orientation === 'horizontal' ? mdiViewParallelOutline : mdiViewSequentialOutline}
                                size={1}
                                color={theme.foreground.color}
                                style={{cursor: 'pointer'}}
                                onClick={(e)=>toggleOrientation(e, level)}
                            />
                            }
                            {archi.length > 1 && i > 0 &&
                            <Icon
                                path={mdiArrowUp}
                                size={0.8}
                                color={'#999'}
                                style={{cursor: 'pointer'}}
                                onClick={(e)=>handleUp(e, level)}
                            />
                            }
                            {archi.length > 1 && i < archi.length-1 &&
                            <Icon
                                path={mdiArrowDown}
                                size={0.8}
                                color={'#999'}
                                style={{cursor: 'pointer'}}
                                onClick={(e)=>handleDown(e, level)}
                            />
                            }
                            <Icon
                                path={mdiClose}
                                size={1}
                                color={'#999'}
                                style={{cursor: 'pointer'}}
                                onClick={()=>console.log('click')}
                            />
                        </div>
                </div>
                <div style={{display: 'flex', flexDirection: level.orientation == 'horizontal' ? 'column' : 'row'}}>
              {level.children.length > 0 && architecturesDeploy(level.children, theme, j + 1)}
                </div>
          </div>
         )
         
    }))
}


    const updateArchiSelection = e => {
        console.log(e)
        setArchiSelected(e.value)
    }

    const handleCircleSelection = e => {
        if(!cutArchi) {
        setCutArchi(archiSelected)
        setArchiSelected(e.value)
        } else {setArchiSelected(e.value)}
    }
    
    return (
        <ThemeContext.Consumer>
        { ({ theme }) => 
        <>
            <div className="hide-scrollbar" style={{ minHeight: '80%', height: '100%', maxHeight: '100%', overflow: 'scroll', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start'}}>

                <div style={{height: '5%', width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    {cutArchi && 
                        <Icon
                        path={mdiArrowTopLeft}
                        size={1}
                        color={'#999'}
                        style={{cursor: 'pointer'}}
                        onClick={()=>{setArchiSelected(cutArchi); setCutArchi()}}
                        title={'Retour à la base'}
                        />
                    }
                    <Select
                    values={ clients.map(client => ({ value: client, label: client.name })) }
                    handleChange={ (e)=>{setClientSelected(e); console.log(e)} }
                    placeholder={'client to fix in clientSelected'}
                    name="clientselect"
                    style={{width: '20%', margin: 10}}
                    closable={false}
                    />
                    <Select
                    values={ architectures.map(archi => ({ value: archi, label: archi.name })) }
                    handleChange={ updateArchiSelection }
                    placeholder={'archi to fix in archiSelected'}
                    name="archtectureselect"
                    style={{width: '20%', margin: 10}}
                    closable={false}
                    />
                    <Select
                    values={ circlesOfSelectedArchi.map(e=>({ value: e, label: Array(3).fill('\xa0').join('').repeat(e.depth) + '· ' + e.name})) }
                    handleChange={ handleCircleSelection }
                    placeholder="Cercle..."
                    name="cercleselect"
                    style={{width: '20%', margin: 10}}
                    closable={false}
                    />
                </div>

                <div style={{height: '95%', width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start'}}>                
                {    archiSelected &&
                        architecturesDeploy([archiSelected], theme)
                }
                </div>

        </div>
        </>
        }
        </ThemeContext.Consumer> 
    )
}


const styles = {

    first: {
        fontWeight: 'bold',
        margin: 10,
        borderRadius: 10,
        maxHeight: '90%',
        minWidth: '25%',
        fontSize: '1vw',
        backgroundColor: 'rgb(220,220,220,0.8)',
        boxShadow: '1px 2px 10px 2px rgba(0, 0 , 0, 0.4)',
        flexShrink: 1
    },
    second: {
        fontWeight: 'bold',
        margin: 10,
        borderRadius: 10,
        backgroundColor: 'rgb(255,255,255,0.6)',
        fontSize: '1vw',
        boxShadow: '1px 2px 10px 2px rgba(0, 0 , 0, 0.4)',
        flexWrap: 'wrap',
        flexShrink: 1
    },
    third: {
        fontWeight: 'bold',
        margin: 10,
        borderRadius: 10,
        backgroundColor: 'rgb(255,255,255,0.8)',
        fontSize: '1vw',
        boxShadow: '1px 2px 10px 2px rgba(0, 0 , 0, 0.4)',
        flexWrap: 'wrap',
        flexShrink: 1
    },
    fourth: {
        margin: 10,
        borderRadius: 10,
        backgroundColor: 'rgb(220,220,220,0.8)',
        fontSize: '1vw',
        boxShadow: '1px 2px 10px 2px rgba(0, 0 , 0, 0.4)',
        flexWrap: 'wrap',
        flexShrink: 1
    },
    fifth: {
        margin: 10,
        borderRadius: 10,
        backgroundColor: 'rgb(255,255,255,0.6)',
        fontSize: '1vw',
        boxShadow: '1px 2px 10px 2px rgba(0, 0 , 0, 0.4)',
        flexWrap: 'wrap',
        flexShrink: 1
    },
    sixth: {
        margin: 10,
        borderRadius: 10,
        backgroundColor: 'rgb(255,255,255,0.8)',
        fontSize: '1vw',
        boxShadow: '1px 2px 10px 2px rgba(0, 0 , 0, 0.4)',
        flexWrap: 'wrap',
        flexShrink: 1
    },
    input:  {

        borderRadius: 5,
        boxShadow: 'none',
        border: 'none',
        height: 25,
        paddingLeft: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        flexShrink: 1
    }

}


function mapStateToProps({ user }) {
    return { user }
}
export default connect(mapStateToProps, null)(Circles);