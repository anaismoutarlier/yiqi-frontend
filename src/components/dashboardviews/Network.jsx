import React, { useState, useEffect } from 'react'

//CONTEXT____________________
import { ThemeContext } from '../../hooks/theme-context'
import { MediaContext } from '../../hooks/media-context'

//styles_________
import '../../App.css'
import {defaultstyles} from '../../styles';
import './network.css'

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

//COMPONENTS
import TransferList from '../TransferList';
import Select from '../Select'

//REDUX______________________________
import { connect } from 'react-redux'

const Network = ({ user }) => {

    //HOOKS
    const [architectures, setArchitectures] = useState([])
    const [archiSelected, setArchiSelected] = useState({})

    //useEffect(()=>{console.log({archiSelected})}, [archiSelected])

    const [clients, setClients] = useState([])
    const [clientSelected, setClientSelected] = useState({})

    const [circlesOfSelectedArchi, setCirclesOfSelectedArchi] = useState([])
    const [users, setUsers] = useState([])

    //useEffect(()=>{console.log({users})}, [users])

    const [currentSelectionCircle, setcurrentSelectionCircle] = useState(null)
    const [currentSelectionPeople, setCurrentSelectionPeople] = useState(null)

    const [tabCirclePeople, setTabCirclePeople] = useState([])
    const [tabPeopleCircles, setTabPeopleCircles] = useState([])

    const [tabOtherPeople, setTabOtherPeople] = useState([])
    const [tabOtherCircles, setTabOtherCircles] = useState([])

    useEffect(()=>{console.log({tabOtherPeople})}, [tabOtherPeople])

    const [currentSelectionList, setCurrentSelectionList] = useState(null)

    useEffect(() => {
        console.log({ user })
        const fetchClients = async () => {
            const data = await fetch(`${global.BACKEND}/users/isadmin/${user._id}`)
            const json = await data.json()

            if (json.result) {

                setClients(json.clientsWhereUserAdmin)
                setClientSelected(json.clientsWhereUserAdmin[0])
                setArchitectures(json.clientsWhereUserAdmin[0].architectures)
                setArchiSelected(json.clientsWhereUserAdmin[0].architectures[0])
            }
        }
        if (user) fetchClients()

    }, [user])

    useEffect(()=>{
        const fetchUsers = async () => {

            const data = await fetch(`${global.BACKEND}/circles/get-circle-users/${currentSelectionCircle.circle}`)
            const json = await data.json()

            if(json.result) {
                setTabCirclePeople(json.usersList.users)
            }
            console.log({liste_users : json.usersList.users})
        }
        if (currentSelectionCircle) {fetchUsers()}

    }, [currentSelectionCircle])

useEffect(()=>{

    const findUsersDispos = () => users.filter(e=>!tabCirclePeople.find(f=>f.user._id === e._id))

    if(tabCirclePeople) {setTabOtherPeople(findUsersDispos())}
}, [tabCirclePeople])

    //Maintaining setters
    useEffect(() => {
        console.log('ArchiSelected : ', archiSelected)
        if (archiSelected) { extractCircles([archiSelected]) }

    }, [archiSelected])

    useEffect(() => {
        console.log('circlesOfSelectedArchi : ', circlesOfSelectedArchi)
    }, [circlesOfSelectedArchi])

    useEffect(()=> {
        if(clientSelected) {getAllUsers()}
    }, [clientSelected])

    //FONCTIONS FACTORISEES

    // extract circles from selected archi
    let temp = [];
    const extractCircles = (archi, d = 0) => {
        if (archi) {
            archi.forEach((el) => {
                temp.push({ ...el, depth: d })
                if (el.children) { extractCircles(el.children, d + 1) }
            })
        }
        setCirclesOfSelectedArchi(temp)
    }

    // fetch users of client
    const getAllUsers = async () => {

        const data = await fetch(`${global.BACKEND}/clients/all-users/${clientSelected._id}`)
        const json = await data.json()

        if (json.result) {
            setUsers(json.users)
        }
    }

    const deployArchi = (array, theme, j = 0) => {
        return array.map((level, i)=>{
            return <>
                        <div onClick={()=>{toggleSelectionCircle(level); toggleSelectionPeople(null)}} style={currentSelectionCircle === level ? combineStyles(styles.itemCircleSelected, {backgroundColor: theme.foreground.color}) : styles.itemCircle}>
                        {Array(10).fill('\xa0').join('').repeat(j) + '· ' + level.name}
                        </div>
                        {level.children?.length > 0 && deployArchi(level.children, theme, j+1)}                                                   
                    </>
    })
    } 


    //toggle selection

    const toggleSelectionList = (id) => currentSelectionList === id ? setCurrentSelectionList(null) : setCurrentSelectionList(id)
    const toggleSelectionCircle = (id) => currentSelectionCircle === id ? (setcurrentSelectionCircle(null), setTabOtherPeople(null), setCurrentSelectionList(null)) : setcurrentSelectionCircle(id)
    const toggleSelectionPeople = (id) => currentSelectionPeople === id ? (setCurrentSelectionPeople(null), setTabOtherCircles(null), setCurrentSelectionList(null)) : setCurrentSelectionPeople(id)

    return (
        <>
            {/* <TransferList users={users} clients={clients} architectures={architectures} clientSelected={clientSelected} archiSelected={archiSelected} circlesOfSelectedArchi={circlesOfSelectedArchi} /> */}

            <MediaContext.Consumer>
                {({ media }) =>
                    <ThemeContext.Consumer>
                        {({ theme }) =>
                        <>
                            <div className="list-container" id='list-container' style={{ overflowY: 'overlay', maxHeight: '100%', height: '100%', width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', boxSizing: 'border-box', paddingTop: 20 }}>

{/* People list on the left side */}
                                <div id="people-list" className={`hide-scrollbar sides${(currentSelectionCircle || currentSelectionPeople) ? '-open' : ''}`} style={combineStyles(theme.foreground, styles.sideContainer)}>
                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <h4 style={combineStyles(theme.foreground, { margin: 12 })}>Contacts</h4>
                                        <Select
                                            values={clients.map(client => ({ value: client, label: client.name }))}
                                            handleChange={(e) => { setClientSelected(e.value) }}
                                            placeholder={clientSelected && `${clientSelected.name}`}
                                            name="clientselect"
                                            style={{ width: '55%', margin: 10 }}
                                            closable={false}
                                        />
                                        <div>
                                            {/* <Icon
                                                path={mdiPlusCircleOutline}
                                                title='Ajouter'
                                                size={1}
                                                color={theme.foreground.color}
                                                style={{ padding: 10, cursor: 'pointer' }}
                                                onClick={() => console.log('to the right')}
                                            /> */}
                                            <Icon
                                                path={mdiDownloadCircleOutline}
                                                className='iconcenter'
                                                title='Import .csv'
                                                size={1.6}
                                                color={theme.foreground.color}
                                                style={{ padding: 10, cursor: 'pointer' }}
                                                onClick={() => console.log('to the right')}
                                            />
                                            <Icon
                                                path={mdiTrashCanOutline}
                                                className='iconcenter'
                                                title='Supprimer'
                                                size={1.6}
                                                color={theme.foreground.color}
                                                style={{ padding: 10, cursor: 'pointer' }}
                                                onClick={() => console.log('to the right')}
                                            />
                                        </div>
                                    </div>
                                    <div style={{width: '100%', marginBottom: 20, border: '1px solid rgba(0,0,0,0.3)'}}></div>
                            {/* people list */}
                                    {
                                    users.map((person, i)=>{

                                        return <div onClick={()=>{toggleSelectionPeople(person); toggleSelectionCircle(null)}} style={currentSelectionPeople === person ? combineStyles(styles.itemPeopleSelected, {backgroundColor: theme.foreground.color}) : styles.itemPeople}>
                                                    <img style={styles.avatar} src={person.avatar}/>
                                                    {person.username}
                                                </div>

                                    })
                                    }   

                                </div>
    {/* Section list du milieu */}
                    {/* list IN */}          
                                <div className={`center${(currentSelectionCircle || currentSelectionPeople) ? '-open' : ''}`} style={combineStyles(theme.background, styles.centerContainer, {justifyContent: 'flex-start', overflow: 'hidden', height: 'calc(100% - 85px)'})}>
                                    <h4 style={{margin: 5, color: '#fff'}}>Inclus</h4>
                                    <div className="hide-scrollbar" style={{overflowY: 'scroll', borderRadius: 3, width: '90%', height: '100%', maxHeight: '90%', margin: '0px 20px 20px 20px', backgroundColor: '#fff', color: '#333'}}>
                                        {currentSelectionCircle && 
                                                
                                                tabCirclePeople.length > 0 &&
                                                    tabCirclePeople.map((person)=>{
                                                        return  <div onClick={()=>{setCurrentSelectionList(person)}} style={currentSelectionList === person ? combineStyles(styles.itemPeopleSelected, {backgroundColor: theme.foreground.color}) : styles.itemPeople}>
                                                                    <img style={styles.avatar} src={person.user.avatar}/>
                                                                    {person.user.username}
                                                                    {person.type === 'operator' ? <Icon path={mdiAccountStarOutline} size={0.8} style={{paddingLeft: 10, cursor: 'pointer'}}/> : person.type === 'admin' ? <Icon path={mdiShieldAccountOutline} size={1} style={{padding: 10, cursor: 'pointer'}}/> : <></>}
                                                                </div>
                                                        
                                                    })                                           
                                        }
                                        {currentSelectionPeople &&
                                                tabCirclePeople.map((person)=>{
                                                    return  <div onClick={()=>{setCurrentSelectionList(person)}} style={currentSelectionList === person ? combineStyles(styles.itemPeopleSelected, {backgroundColor: theme.foreground.color}) : styles.itemPeople}>
                                                                <img style={styles.avatar} src={person.user.avatar}/>
                                                                {person.user.username}
                                                                {person.type === 'operator' ? <Icon path={mdiAccountStarOutline} size={0.8} style={{paddingLeft: 10, cursor: 'pointer'}}/> : person.type === 'admin' ? <Icon path={mdiShieldAccountOutline} size={1} style={{padding: 10, cursor: 'pointer'}}/> : <></>}
                                                            </div>
                                                    
                                                }) 

                                        }
                                   </div>
                                </div>
                    {/* MENU */}
                    <div style={{alignSelf: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center'}}>
                        <h3 style={(currentSelectionCircle || currentSelectionPeople) && combineStyles(theme.foreground,{textAlign: 'center', width: '25%', padding: '0px 10px 10px 10px', marginTop:0, borderBottom: '1px solid rgba(0,0,0,0.2)', color: '#343a40', position: 'absolute', top: '24%', overflow: 'visible'})}>
                            {currentSelectionCircle && currentSelectionCircle.name}{currentSelectionPeople && currentSelectionPeople.username}
                        </h3>

                        <div className={`menu${(currentSelectionCircle || currentSelectionPeople) ? '-open' : ''}`} style={combineStyles(theme.background, {overflow: 'hidden', borderRadius: 10, display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center'})}>
                                    <Icon
                                        path={mdiShieldAccountOutline}
                                        className='iconcenter'
                                        title='Habiliter comme admin'
                                        size={1.6}
                                        color="white"
                                        style={{padding: 10, cursor: 'pointer'}}
                                        onClick={()=>console.log('click')}
                                    />
                                    <Icon
                                        path={mdiAccountStarOutline}
                                        className='iconcenter'
                                        title='Habiliter comme opérateur'
                                        size={1.6}
                                        color="white"
                                        style={{padding: 10, cursor: 'pointer'}}
                                        onClick={()=>console.log('click')}
                                    />
                                    <Icon
                                        path={mdiAccountCheckOutline}
                                        className='iconcenter'
                                        title='Habiliter en accès standard'
                                        size={1.6}
                                        color="white"
                                        style={{padding: 10, cursor: 'pointer'}}
                                        onClick={()=>console.log('click')}
                                    />
                                    <span style={{marginTop: -15, color: 'rgba(255,255,255,0.3'}}>_____</span>
                                    <Icon
                                        path={mdiArrowLeftBoldCircle}
                                        size={1.6}
                                        className='iconcenter'
                                        title='Ajouter'
                                        color="white"
                                        style={{padding: 10, cursor: 'pointer'}}
                                        onClick={()=>{currentSelectionCircle ? console.log('click') : console.log('click')}}
                                    />
                                    <Icon
                                        path={mdiArrowRightBoldCircle}
                                        size={1.6}
                                        className='iconcenter'
                                        title='Retirer'
                                        color="white"
                                        style={{padding: 10, cursor: 'pointer'}}
                                        onClick={()=>{currentSelectionCircle ? console.log('click') : console.log('click')}}
                                    />
                            </div>
                        </div>
                    {/* list OUT */}
                                <div className={`center${(currentSelectionCircle || currentSelectionPeople) ? '-open' : ''}`} style={combineStyles(theme.background, styles.centerContainer, {justifyContent: 'flex-start', overflow: 'hidden', height: 'calc(100% - 85px)'})}>
                                    <h4 style={{margin: 5, color: '#fff'}}>Disponible</h4>
                                    <div className="hide-scrollbar" style={{overflowY: 'scroll', borderRadius: 3, width: '90%', height: '90%', margin: '0px 20px 20px 20px', backgroundColor: '#fff', color: '#333'}}>
                                        {(currentSelectionCircle || currentSelectionPeople) &&
                                                <>
                                                {(currentSelectionCircle || currentSelectionPeople) && 
                                                
                                                tabOtherPeople?.length > 0 &&
                                                    tabOtherPeople.map((person)=>{
                                                        return  <div onClick={()=>{setCurrentSelectionList(person)}} style={currentSelectionList === person ? combineStyles(styles.itemPeopleSelected, {backgroundColor: theme.foreground.color}) : styles.itemPeople}>
                                                                    <img style={styles.avatar} src={person.avatar}/>
                                                                    {person.username}
                                                                </div>                
                                                    })                                                

                                                }
                                                </>
                                        }
                                    </div>
                                </div>

{/* Circles list on the right side */}
                                <div id="circles-list" className={`hide-scrollbar sides${(currentSelectionCircle || currentSelectionPeople) ? '-open' : ''}`} style={combineStyles(theme.foreground, styles.sideContainer)}>
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <h4 style={combineStyles(theme.foreground, { margin: 12 })}>Cercles</h4>
                                        <Select
                                            values={architectures.map(architecture => ({ value: architecture, label: architecture.name }))}
                                            handleChange={(e) => { setArchiSelected(e.value); console.log(e) }}
                                            placeholder={archiSelected && `${archiSelected.name}`}
                                            name="clientselect"
                                            style={{ width: '55%', margin: 10 }}
                                            closable={false}
                                        />
                                        <div>
                                            {/* <Icon
                                                path={mdiPlusCircleOutline}
                                                title='Ajouter'
                                                size={1}
                                                color={theme.foreground.color}
                                                style={{ padding: 10, cursor: 'pointer' }}
                                                onClick={() => console.log('to the right')}
                                            /> */}
                                            <Icon
                                                path={mdiDownloadCircleOutline}
                                                className='iconcenter'
                                                title='Import .csv'
                                                size={1.6}
                                                color={theme.foreground.color}
                                                style={{ padding: 10, cursor: 'pointer' }}
                                                onClick={() => console.log('to the right')}
                                            />
                                            <Icon
                                                path={mdiTrashCanOutline}
                                                className='iconcenter'
                                                title='Supprimer'
                                                size={1.6}
                                                color={theme.foreground.color}
                                                style={{ padding: 10, cursor: 'pointer' }}
                                                onClick={() => console.log('to the right')}
                                            />
                                        </div>
                                    </div>
                                    <div style={{width: '100%', marginBottom: 20, border: '1px solid rgba(0,0,0,0.3'}}></div>
                            {/* circles list */}
                                    {archiSelected && deployArchi([archiSelected], theme)}  

                                </div>
                            </div>

                        </>
                        }
                    </ThemeContext.Consumer>
                }
            </MediaContext.Consumer>

        </>
    )
}

function mapStateToProps({ user }) {
    return { user }
}

export default connect(mapStateToProps, null)(Network);

const styles = {
    itemPeople: {
        cursor: 'pointer',
        fontWeight: 'normal',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 3,
        margin: 10,
        transition: 'linear 0.2 ease-in-out'
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
        paddingLeft: 12,
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
        marginRight: 10,
        height: '30px',
        width: '30px',
        borderRadius: '50%',
    },
    sideContainer: {
        boxShadow: '1px 2px 10px 2px rgba(0, 0 , 0, 0.4)',
        height: '100%',
        borderRadius: 2,
        padding: 10,
        margin: 10,
        backgroundColor: 'rgba(0,0,0,0.05)',
        flexWrap: 'wrap',
        overflow: 'scroll',
        boxSizing: 'border-box'
    },
    centerContainer: {
        height: '100%',
        borderRadius: 3,
        margin: 10,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
    }
}