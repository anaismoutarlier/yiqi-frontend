import { useContext } from 'react'

//HELPER FUNCTIONS_________________
import combineStyles from '../helpers/combineStyles';

//CONTEXT__________________________
import { ThemeContext } from '../hooks/theme-context';


const CardBoard = () => {
    const { theme } = useContext(ThemeContext)

    //DATA____________________
    const colors = ["#E2F3EE", "#D3EEDC", "#DBF3FB"]
    
    return (
        <div style={ styles.card_container }>
            <div style={ combineStyles(styles.top_menu, theme.foreground) }>
                <h6 style={ combineStyles(styles.title, theme.foreground) }>Service 1</h6>
                <div style={ styles.avatar_container }>
                    <img style={ combineStyles(styles.avatar, theme.foreground) } alt="avatar" src="/images/anais.jpg"></img>
                    <img style={ combineStyles(styles.avatar, theme.foreground)  } alt="avatar" src="/images/CatPNG.PNG"></img>
                    <img style={ combineStyles(styles.avatar, theme.foreground)  } alt="avatar" src="/images/quentin.jpg"></img>
                    <img style={ combineStyles(styles.avatar, theme.foreground)  } alt="avatar" src="/images/maxime.jpg"></img>
                    <div style={ combineStyles(styles.avatar_counter, theme.foreground) }>+7</div>
                </div>
            </div>
            <div style={ styles.pin_container }>
                <div style={ combineStyles(styles.pin_preview, { backgroundColor: colors[Math.floor(Math.random() * 3)] } ) }><p>jeu de belote à 15h aujourd'hui</p></div>
                <div style={ combineStyles(styles.pin_preview, { backgroundColor: colors[Math.floor(Math.random() * 3)] } ) }>arrivée des clowns 14h</div>
                <div style={ combineStyles(styles.pin_preview, { backgroundColor: colors[Math.floor(Math.random() * 3)] } ) }>croissants dans la cuisine</div>
                <div style={ combineStyles(styles.pin_preview, { backgroundColor: colors[Math.floor(Math.random() * 3)] } ) }>rando ce weekend?</div>
                <div style={ combineStyles(styles.pin_preview, { backgroundColor: colors[Math.floor(Math.random() * 3)] } ) }>horaires de visite annulé ce soir</div>
                <div style={ combineStyles(styles.pin_preview, { backgroundColor: colors[Math.floor(Math.random() * 3)] } ) }>+ 7</div>
            </div>
        </div>
    )
}

export default CardBoard;

const styles = {
    card_container: {
        height: '350px',
        width: '460px',
        backgroundImage: `url('/images/camila-vignoni-fondo-hospital.jpg')`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        boxShadow: '1px 3px 5px 1px rgba(0, 0 , 0, 0.4)',
        margin: 10,
        borderRadius: '5px',
        display: 'grid',
        gridTemplateRows: '60px 1fr',
        cursor: 'pointer'
    },
    top_menu: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '5px 4px',
        boxSizing: 'border-box'
    },
    pin_container: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatar_container: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',        
        display: 'flex',
        borderRadius: '15px',
        boxShadow: '1px 3px 5px 1px rgba(0, 0 , 0, 0.2)',
    },
    avatar: {
        borderRadius: '50px',
        height: '30px',
        width: '30px',
        border: '1px solid grey',
        boxShadow: '1px 3px 5px 1px rgba(0, 0 , 0, 0.4)',
        margin: 6
    },
    avatar_counter: {
        borderRadius: '50px',
        height: '30px',
        width: '30px',
        border: '1px solid grey',
        boxShadow: '1px 3px 5px 1px rgba(0, 0 , 0, 0.4)',
        margin: 6,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        fontWeight: 'bold'
    },
    title: {
        fontSize: '1.3rem',
        margin: 0,
        textShadow: "1px 1px rgba(0, 0 , 0, 0.4)",
        marginLeft: 15
    },
    pin_preview: {   
        height: '90px',
        width: '130px',
        margin: 7,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '1px',
        fontWeight: 'bold',
        padding: 3,
        textAlign: 'center',
        boxShadow: '1px 3px 5px 1px rgba(0, 0 , 0, 0.4)',
        color: 'grey'
    }
}