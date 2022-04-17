import React, { useState, useEffect, useRef } from 'react'

//HELPER FUNCTIONS___________________
import combineStyles from '../helpers/combineStyles'

//UI___________________________
import { Icon } from "@mdi/react"
import { mdiPencilOutline, mdiCheckCircleOutline } from '@mdi/js';

const ClickableInput = ({ name, placeholder, onChange, onKeyDown, value, type, style, isFocused, next, isValidated = true, useValidation, setFocus }) => {
    //STATE HOOKS____________________
    const [active, setActive] = useState(false)

    //REFERENCE HOOKS____________________
    const input = useRef()

    //EFFECT HOOKS_________________________
    useEffect(() => {
        if (isFocused) {
            input.current.focus()
        }
    }, [isFocused])

    //FUNCTIONS______________________
    const onSubmit = (e) => {
        if (onKeyDown && isValidated) {
            onKeyDown(e, next)
        }
    }

    const focusOnSelf = () => {
        setFocus(name)
        setActive(true)
    }

    return (
        <>
        <input
        placeholder={ placeholder }
        style={ active ? combineStyles(styles.active_input, style) : combineStyles(styles.active_input, styles.inactive_input, style) }
        ref={ input }
        type={ type }
        name={ name }
        value={ value }
        onKeyDown={ (e)=>onSubmit(e) }
        onChange={ (e)=>onChange(e.target.value, e.target.name) }
        onClick={ ()=>setActive(true) }
        onFocus={ ()=> setFocus ? focusOnSelf() : setActive(true) }
        onBlur={ ()=>setActive(false) }
        />
        { isValidated && useValidation ?
            <div style={ { height: '20px', width: '20px' } }>
            <Icon
                path={ mdiCheckCircleOutline }
                color="green"
                size={ 0.8 }
                />
            </div>
        : !active ?
            <div style={ { height: '20px', width: '20px' } }>
                <Icon
                path={ mdiPencilOutline }
                color='rgba(0, 0, 0, 0.2)'
                size={ 0.8 }
                onClick={ ()=>input.current.focus() }
                style={ { cursor: 'pointer' } }
                />
            </div>
        : null }
        </>
    )
}

export default ClickableInput;

const styles = {
    active_input: {
        height: '2.2rem',
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        borderRadius: '3px',
        boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.2)',
        border: '1px solid rgba(0, 0, 0, 0.2)',
        padding: 10,
        paddingLeft: 12,
        paddingTop: 15,
        boxSizing: 'border-box',
        lineHeight: 1,
        textAlign: 'right',
        color: '#343a40',
    },
    inactive_input: {
        border: 'none',
        boxShadow: 'none',
        backgroundColor: 'transparent',
        color: 'rgba(0, 0, 0, 0.6) !important',
        cursor: 'pointer'
    }
}