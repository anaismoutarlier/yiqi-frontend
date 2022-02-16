import React, { useRef, useEffect } from 'react'
import './floatinginputlabel.css'

//HELPER FUNCTIONS________________________
import combineStyles from '../../helpers/combineStyles'

const FloatingLabelInput = ({ style, name, label, onChange, type, onKeyDown, value, isFocused, height, width }) => {
    //REFERENCE HOOKS_____________________
    const input = useRef()

    //EFFECT HOOKS_________________________
    useEffect(() => {
        if (isFocused) {
            input.current.focus()
        }
    }, [isFocused])

    return type === "text" || type === 'password' ? 
        (
        <div className="floating-input-container" style={ styles.container }> 
            <input
            name={ name }
            ref={ input }
            style={ combineStyles(styles.input, style) }
            value={ value }
            type={ type }
            onKeyDown={ onKeyDown ? onKeyDown : null }
            onChange={ (e)=>onChange(e.target.value, e.target.name) } />
            <label
            htmlFor={ name }
            className={ value && 'filled' }>
                <span style={ styles.filler }></span>
                { label }
                <span style={ styles.filler }></span>
            </label>
        </div>
    )
    : type === "text-area" ?
    (   
        <div className="floating-input-container" style={ styles.container }>
            <textarea
            name={ name }
            ref={ input }
            style={ combineStyles(styles.input, { height: height ? height : '7rem', width: width ? width : '100%' }) }
            value={ value }
            onKeyDown={ onKeyDown ? onKeyDown : null }
            onChange={ (e)=>onChange(e.target.value, e.target.name) } />
            <label
            htmlFor={ name }
            className={ value && 'filled' }>
                <span style={ styles.filler }></span>
                { label }
                <span style={ styles.filler }></span>            
            </label>
        </div>
        
    ) 
    : null;
}
export default FloatingLabelInput;

const styles = {
    input: {
        height: '2.2rem',
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        borderRadius: '3px',
        width: '100%',
        marginBottom: 20,
        boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.2)',
        border: '1px solid rgba(0, 0, 0, 0.2)',
        paddingTop: 8,
        paddingLeft: 12,
        boxSizing: 'border-box',
        lineHeight: 1
    },
    filler: {
        width: '3px',
        height: '1px',
        backgroundColor: '#fff'
    },
    container: {
        width: '100%'
    }
}