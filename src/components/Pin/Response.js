import { useState, useEffect, useContext } from 'react';

//STYLES_________________________
import defaultstyles from '../../defaultstyles';
import modalstyles from '../AddMenu/AddMenuModals/modalstyles';

//HELPERS___________________________
import combineStyles from '../../helpers/combineStyles';

//COMPONENTS________________________
import Select from '../Select';
import Button from "../Button"
import Header from '../AddMenu/Header';

//UI_____________________________
import { mdiBlurRadial } from '@mdi/js';

//REDUX_________________________
import { useSelector } from 'react-redux';

//CONTEXT_____________________________
import { ThemeContext } from '../../hooks/theme-context';

const Response = ({ pin }) => {
    //CONTEXT____________________________
    const { theme } = useContext(ThemeContext)
    
    //REDUX_______________________________
    const user = useSelector(({ user }) => user)

    //STATE__________________________
    const [circles, setCircles] = useState([])
    const [mode, setMode] = useState(null)

    //EFFECT HOOKS_________________________
    useEffect(() => {
        const getDynamicCircles = async () => {
            const data = await fetch(`${global.BACKEND}/pins/sharecircles`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user._id })
            })

            const json = await data.json()

            if (json.result) {
                setCircles(json.circles)
            }
        }

        getDynamicCircles()
    }, [user._id])

    //STYLES___________________________
    const { button } = defaultstyles
    const { background_transparent } = theme
    const { button_container, responseButton, transfer_container, response_container, button_wrapper } = styles

    let container = mode === "transfer" ? transfer_container : mode === "respond" ? response_container : button_container
    return (
        <>

            <div style={ container } id={ `pin-bubble-${pin._id}`}>
                {
                    !mode &&
                    <>
                        <button style={ combineStyles(button, background_transparent, responseButton) } onClick={ ()=>setMode("transfer") }>Transférer</button>
                        <button style={ combineStyles(button, background_transparent, responseButton) } onClick={ ()=>setMode("response") }>Répondre</button>
                    </>
                }
                {
                    mode === "transfer" &&
                    <>
                        <Header title="Sélectionner vos cercles" style={{ margin: '20px' }} icon={ mdiBlurRadial } />
                        <Select
                        values={ circles }
                        // handleChange={(e)=>handleTransfer(e)}
                        placeholder="Cercles"
                        name="circles"
                        style={{ margin: '0px' }}
                        multiple
                        />
                        <div style={ button_wrapper }>
                            <button style={ combineStyles(button, background_transparent, responseButton, { width: 'fit-content', marginRight: 0 }) }>GO</button>
                        </div>
                    </>
                }
            </div>
        </>
    )
}

export default Response

const styles = {
    button_container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: 'center',
        height: '100%',
    },
    responseButton: {
        borderRadius: "10px",
        width: '80%'
    },
    transfer_container: {
        padding: '10px 20px 20px 20px',
        display: 'flex',
        flexDirection: "column",
    },
    button_wrapper: {
        display: 'flex',
        justifyContent: 'flex-end',
        width: '100%'
    }
}