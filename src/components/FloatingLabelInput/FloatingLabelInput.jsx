import React, { useRef, useEffect } from 'react'
import './floatinginputlabel.css'

//HELPER FUNCTIONS________________________
import combineStyles from '../../helpers/combineStyles'

const FloatingLabelInput = ({ name, label, value, style, isFocused, onChange, ...props }) => {
    //REFERENCE HOOKS_____________________
    const input = useRef()

    //EFFECT HOOKS_________________________
    useEffect(() => {
        if (isFocused) {
            input.current.focus()
        }
    }, [isFocused])

    //FUNCTIONS_____________________________
    const handleChange = e => onChange ? onChange(e.target.name, e.target.value) : console.log(value)

    const { container, input: inputStyle, filler } = styles
    return (
        <div className="floating-input-container" style={ container }> 
            <input
            name={ name }
            ref={ input }
            value={ value || "" }
            style={ combineStyles(inputStyle, style) }
            onChange={ (e) => handleChange(e) }
            { ...props }
            />
            <label
            htmlFor={ name }
            className={ value && 'filled' }>
                <span style={ filler }></span>
                { label }
                <span style={ filler }></span>
            </label>
        </div>
    )
}

export default FloatingLabelInput;

const styles = {
    input: {
        height: '2.2rem',
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        borderRadius: '3px',
        width: '100%',
        marginBottom: 20,
        // boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.2)',
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