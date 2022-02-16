import { useContext } from 'react'

//STYLES____________________________
import defaultstyles from '../../defaultstyles';

//HELPER FUNCTIONS___________________
import combineStyles from '../../helpers/combineStyles'

//CONTEXT____________________
import { ThemeContext } from '../../hooks/theme-context'

//UI___________________________
import { Icon } from "@mdi/react"
import { mdiCheckBold } from '@mdi/js';

const Account = () => {
    const { theme } = useContext(ThemeContext)
    return (
        <div style={ styles.content_container }>
            <div style={ styles.section_container }>
                <div style={ styles.section_wrapper }>
                    <div>
                        <h2 style={ combineStyles(styles.title, theme.foreground) }>Mon Offre</h2>
                        <div style={ styles.date_wrapper }>
                            <h6 style={ styles.title }>Prochaine facture</h6>
                            <p style={ styles.title }>21/12/2021</p>
                        </div>
                    </div>
                    <div style={ combineStyles(styles.subscription_card, theme.foreground) }>
                        <div style={ styles.card_header }>
                            <h4 style={ combineStyles(styles.title, theme.foreground )}>Administrateur</h4>
                            <h5 style={ styles.subtitle }>1000€ / mois</h5>
                        </div>
                        <div style={ styles.list }>
                            <div style={ styles.list_item}>
                                <Icon
                                path={ mdiCheckBold}
                                color={ theme.foreground.color }
                                size={ 0.6 }
                                />
                                <h6 style={ styles.title }>200 utilisateurs</h6>
                            </div>
                            <div style={ styles.list_item}>
                                <Icon
                                path={ mdiCheckBold}
                                color={ theme.foreground.color }
                                size={ 0.6 }
                                />
                                <h6 style={ styles.title }>Cercles illimités</h6>
                            </div>
                            <div style={ styles.list_item}>
                                <Icon
                                path={ mdiCheckBold}
                                color={ theme.foreground.color }
                                size={ 0.6 }
                                />
                                <h6 style={ styles.title }>Suivi personnalisé</h6>
                            </div>
                        </div>
                    </div>

                </div>
                <div style={ styles.button_container }>
                    <button style={ combineStyles(defaultstyles.button, theme.background) }>MODIFIER MON ABONNEMENT</button>
                    <button style={ defaultstyles.button }>ANNULER MON ABONNEMENT</button>
                </div>
            </div>
                <div style={ styles.section_container }>
                    <div style={ styles.section_wrapper }>
                        <div style={ combineStyles(styles.subscription_card, theme.foreground) }>
                            <div style={ styles.card_header }>
                                <h4 style={ combineStyles(styles.title, theme.foreground )}>Administrateur</h4>
                                <h5 style={ styles.subtitle }>1000€ / mois</h5>
                            </div>
                            <div style={ styles.list }>
                                <div style={ styles.list_item}>
                                    <Icon
                                    path={ mdiCheckBold}
                                    color={ theme.foreground.color }
                                    size={ 0.6 }
                                    />
                                    <h6 style={ styles.title }>200 utilisateurs</h6>
                                </div>
                                <div style={ styles.list_item}>
                                    <Icon
                                    path={ mdiCheckBold}
                                    color={ theme.foreground.color }
                                    size={ 0.6 }
                                    />
                                    <h6 style={ styles.title }>Cercles illimités</h6>
                                </div>
                                <div style={ styles.list_item}>
                                    <Icon
                                    path={ mdiCheckBold}
                                    color={ theme.foreground.color }
                                    size={ 0.6 }
                                    />
                                    <h6 style={ styles.title }>Suivi personnalisé</h6>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h2 style={ combineStyles(styles.title, theme.foreground) }>Paiement</h2>
                            <div style={ styles.date_wrapper }>
                                <h6 style={ styles.title }>Prochaine facture</h6>
                                <p style={ styles.title }>21/12/2021</p>
                            </div>
                        </div>

                    </div>
                </div>
        </div>
    )
}
export default Account;

const styles = {
    content_container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    section_container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '0px 60px',
        width: '30%',
        paddingTop: 80
    },
    section_wrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%'
    },
    subtitle: {
        color: '#6c757d',
        margin: 0
    },
    title: {
        margin: 0
    },
    subscription_card: {
        border: '1px solid grey',
        padding: 30,
        width: '250px',
        boxShadow: '1px 2px 5px 1px rgba(0, 0, 0, 0.2)',
        borderRadius: '5px'
    },
    card_header: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: 5,
        borderBottom: '1px solid rgba(0, 0, 0, 0.2)',
        paddingBottom: 5,
        marginBottom: 20
    },
    list: {
        display: 'flex',
        flexDirection: 'column',
    },
    list_item: {
        display: 'grid',
        gridTemplateColumns: '30px 1fr',
        verticalAlign: 'middle',
        padding: 5,
        paddingLeft: 15
    },
    date_wrapper: {
        paddingTop: 30
    },
    button_container: {
        display: 'flex',
        padding: '20px 0px',
        width: '100%',
        justifyContent: 'space-around',
        borderBottom: '1px solid rgba(0, 0, 0, 0.2)'
    }
}