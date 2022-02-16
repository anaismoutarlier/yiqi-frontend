import { useContext } from 'react'

//HELPER FUNCTIONS__________________
import combineStyles from '../helpers/combineStyles'

//CONTEXT___________________
import { ThemeContext } from '../hooks/theme-context'

const Button = ({ children, onClick }) => {
    const { theme } = useContext(ThemeContext)
    
    return <button style={ combineStyles(theme.background, styles.buttonstyle) } onClick={onClick} >{ children }</button>
} 
export default Button;

const styles = {
    buttonstyle: {
        cursor: 'pointer',
        border: 'none',
        borderRadius: 10,
        padding: 10,
        margin: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0px 1px 5px 2px rgba(0, 0 , 0, 0.4)'
    },
}