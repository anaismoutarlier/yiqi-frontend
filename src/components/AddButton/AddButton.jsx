import { useState } from 'react'

//COMPONENTS_________________________
import Modal from '../Modal'
import Button from '../Button'
import MultipleSelect from '../MultipleSelect/MultipleSelect'

//UI_________________________
import Icon from '@mdi/react'
import { mdiAccountMultiple , mdiPinOutline, mdiViewDashboardOutline, mdiBlurRadial } from '@mdi/js'
import TextField from '@material-ui/core/TextField'
import { InputLabel } from '@material-ui/core'
import { Divider } from '@material-ui/core'
import { FormControlLabel } from '@material-ui/core'
import { Switch } from '@material-ui/core'


//HELPER FUNCTIONS__________________
import combineStyles from '../../helpers/combineStyles'

//CONTEXT___________________
import { ThemeContext } from '../../hooks/theme-context'

const AddButton = () => {

//STATES__________
    const [addMenuOpened, setAddMenuOpened] = useState(false)
    const [habilitations, setHabilitations] = useState('admin')
    const [modalSelected, setModalSelected] = useState('pin')
    const [modalOpen, setModalOpen] = useState(false)
    const [unwritable, setUnwritable] = useState(true)

    const toggleModal = () => {
        setModalOpen(!modalOpen)
    }

    const toggleWritable = () => {
        setUnwritable(!unwritable)
    }

    return (
        
            <ThemeContext.Consumer>
            { ({ theme }) => 
            <>
                <div id='before' style={ combineStyles(styles.divstyle, theme.background) }
                onMouseEnter={()=>setAddMenuOpened(true)}
                onMouseLeave={()=>{setTimeout(() => {
                    setAddMenuOpened(false)
                }, 5000)}}
                >
                    <h1 style={ styles.fontstyle } /*css={({ addMenuOpened }) => (addMenuOpened ? css`transition: all 0.3s linear; transform: rotate(45deg)`:'')}*/>+</h1>
                </div>

                <div id='bigdiv' style={ combineStyles(styles.bigdivstyle)}>

                { addMenuOpened && 
                    <>
                    <div id="sliding-bar" style= { combineStyles(styles.divstyle, {...theme.background, top: 60, right: 38, width: 3, height: habilitations === 'admin' ? 200 : 100 }) }>
                    </div>
                    
                        <div id='pin' style={ combineStyles(styles.menustyle, theme.background) }
                        onClick={ (e)=>{ setModalSelected('pin'); toggleModal() }}
                        >
                        <h5 style={ combineStyles(styles.fontstyle, {...styles.fontmenustyle, marginRight: 10}) }>Pin</h5>
                        <Icon
                                path={ mdiPinOutline }
                                size={0.7}
                                color="white"
                                rotate={39}
                            />
                        </div>

                        <div id='board' style={ combineStyles(styles.menustyle, {...theme.background, top: 130}) }
                        onClick={ (e)=>{ setModalSelected('board'); toggleModal() }}
                        >
                        <h5 style={ combineStyles(styles.fontstyle, {...styles.fontmenustyle, marginRight: 10}) }>Board</h5>
                        <Icon
                                id={'pin'}
                                path={ mdiViewDashboardOutline }
                                size={0.7}
                                color="white"
                            />
                        </div>

                        

                        { habilitations === 'admin' &&
                        <>
                        <div id='circle' style={ combineStyles(styles.menustyle, {...theme.background, top: 180}) }
                        onClick={ (e)=>{ setModalSelected('sphere'); toggleModal() }}
                        >
                        <h5 style={ combineStyles(styles.fontstyle, {...styles.fontmenustyle, marginRight: 10}) }>Sphere</h5>
                        <Icon
                                path={ mdiBlurRadial  }
                                size={0.7}
                                color="white"
                            />
                        </div>

                        <div id='people' style={ combineStyles(styles.menustyle, {...theme.background, top: 230}) }
                        onClick={ (e)=>{ setModalSelected('people'); toggleModal() }}
                        >
                        <h5 style={ combineStyles(styles.fontstyle, {...styles.fontmenustyle, marginRight: 10}) }>People</h5>
                        <Icon
                                path={ mdiAccountMultiple  }
                                size={0.7}
                                color="white"
                            />

                        </div>
                        </>
                        }

                    </>
                }

                </div>

                <Modal open={ modalOpen } toggleModal={ toggleModal }>
                <div style={styles.modalstyle}>
                
                    {
                        modalSelected === 'pin' ?
                            <form action="/new-board" method="post">

                                <h5>Déposer un pin</h5>

                                <InputLabel>Proposer ou solliciter</InputLabel>

                                <Divider />

                                    <TextField
                                    id="outlined-multiline-static"
                                    label="Message"
                                    multiline
                                    rows={4}
                                    placeholder="Une idée, un besoin, une question, une recherche d'informations, de contacts, de tuyaux, de partage d'expériences, d'un coup de pouce, d'un outil, de matériel, d'un local... ?"
                                    variant="outlined"
                                    />

                                    <InputLabel id="demo-mutiple-chip-label">Boards cibles</InputLabel>
                                    <MultipleSelect data={''}/>

                                <Divider />

                                <InputLabel>Un ou plusieurs canaux</InputLabel>

                                <Divider />

                                        <FormControlLabel
                                            control={<Switch checked={''} onChange={''} color="primary" />}
                                            label="Appel"
                                            style={{color: '#333'}}
                                        />
                                        <FormControlLabel
                                            control={<Switch checked={''} onChange={''} color="primary" />}
                                            label="Message"
                                            style={{color: '#333'}}
                                        />
                                        <FormControlLabel
                                            control={<Switch checked={''} onChange={''} color="primary" />}
                                            label="Mail"
                                            style={{color: '#333'}}
                                        />
                                        <FormControlLabel
                                            control={<Switch checked={''} onChange={()=>toggleWritable()} color="primary" />}
                                            label="Lien web"
                                            style={{color: '#333'}}
                                        />
                                        <TextField disabled={unwritable} id="standard-disabled" label="" placeholder="Lien pour te rejoindre..." />

                                <Divider />

                                <InputLabel>Paramètres</InputLabel>

                                <Divider />

                                    {/* switch avec public/privé
                                    switch avec direct/indirect
                                    timepicker optimisé */}

                                <Divider />

                                <Button type="submit" onClick={()=>toggleModal()}>Valider</Button>

                            </form>

                        :
                        modalSelected === 'board' ?
                        
                            <form action="/new-pin" method="post">

                                <h5>Réunir un board</h5>
                                <Divider />
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Nom du board"
                                    placeholder="Thème, secteur, lien entre les personnes..."
                                    variant="outlined"
                                    style={{width: '80%'}}
                                    />

                                <InputLabel id="demo-mutiple-chip-label">Personnes</InputLabel>
                                <MultipleSelect data={''}/>
                                <Divider />
                                <Button type="submit" onClick={()=>toggleModal()}>Valider</Button>

                            </form>


                        :
                        modalSelected === 'sphere' ?
                        
                                <form action="/add-sphere" method="post">

                                <h5>Ajouter une sphère</h5>
                                
                                    {/* 
                                    Trois écrans : sphères, personnes et affiliation
                                   
                                    Disponible uniquement sur ces 3 écrans
                                    
                                    TextField Nom 
                                    'Rattaché à parent' non obligatoire avec Selecter

                                    Add people

                                    */}


                                </form>

                        :
                        modalSelected === 'people' ?
                        
                                <form action="/add-people" method="post">

                                <h5>Inviter des personnes</h5>
                                
                                    {/*
                                    1 écran 3 onglets : sphères, personnes et affiliation
                                   
                                    Disponible uniquement sur ces 3 écrans

                                    import csv

                                    TextFields Prénom, Nom, Coordonnées 

                                    Ecran Affiliation : 
                                    Arborescence des sphères en entête, sélectionnable
                                    Lier des personnes à la sphère sélectionnée avec TransferList générée au changement de sphère et personnes en base affichées
                                    */}
                                

                                </form>

                        :
                            
                            <h5>Oups, pas de sélection reconnue... Try again ;)</h5>

                    }
                
                </div>
                </Modal>

            </>
            }
            </ThemeContext.Consumer>
    )
}


const styles = {
    modalstyle: {
        borderRadius: 10,
        backgroundColor: 'white',
        height: '50vh',
        width: '30vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    divstyle: {
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 20,
        right: 20,
        borderRadius: '70%',
        height: 40,
        width: 40,
        boxShadow: '1px 2px 10px 2px rgba(0, 0 , 0, 0.4)',
    },
    menustyle: {
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 80,
        right: 20,
        borderRadius: 5,
        height: 40,
        padding: '0px 10px'
    },
    fontstyle: {
        cursor: 'pointer',
        fontWeight: 'bold',
        color: 'white',
        fontSize: 40,
        textAlign: 'center',
        verticalAlign: 'middle',
        position: 'relative',
        bottom: '12%'
    },
    fontmenustyle: {
        fontSize: 16,
        bottom: '0%'
    },
}

export default AddButton;