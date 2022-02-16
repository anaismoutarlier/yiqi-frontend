import React, { useState, useEffect, useContext } from 'react'

//STYLES________________________
import '../../App.css'
import './typeinput.css'

//CONTEXT________________________
import { ThemeContext } from '../../hooks/theme-context'

//HELPERS___________________________
import combineStyles from '../../helpers/combineStyles'

//UI________________________________
import { mdiChevronDown, mdiChevronUp } from '@mdi/js';
import Icon from '@mdi/react'

export const Option = ({ item, handleChange, selected }) => {
    //CONTEXT_________________________
    const { theme } = useContext(ThemeContext)

    //STATE HOOKS_____________________
    const [isSelected, setIsSelected] = useState(selected ? selected.value === item.value : false)
    const [hover, setHover] = useState(false)

    //EFFECT HOOKS______________________
    useEffect(()=> {
        selected && selected.value === item.value ? setIsSelected(true) : setIsSelected(false)
    }, [selected, item])

    return <div onMouseEnter={ ()=>setHover(true) } onMouseLeave={ ()=>setHover(false) } onClick={ ()=>handleChange(item) } style={ isSelected || hover ? combineStyles(styles.option, theme.background_transparent, { opacity: hover ? 0.4 : 0.6 }) : styles.option }>{ item.label }</div>
}

const TypeInput = ({ defaultType, defaultValue, types, onChange }) => {
    //CONTEXT_________________________
    const { theme } = useContext(ThemeContext)
    
    //STATE HOOKS___________________________
    const [menuOpen, setMenuOpen] = useState(false)
    const [selected, setSelected] = useState(defaultType ? defaultType : null)
    const [value, setValue] = useState(defaultValue ? defaultValue : 1)

    //EFFECT HOOKS____________________________
    useEffect(()=> {
        if (value && selected) {
            onChange(value, selected)
        }
    }, [selected, value])

    //FUNCTIONS______________________________
    const handleChange = item => {
        setSelected(item)
        setMenuOpen(false)
    }

    const handleValueChange = type => {
        if (type === 'decrement' && value > 1) {
            setMenuOpen(false)
            setValue(parseInt(value) - 1)
        } else if (type === 'increment') {
            setMenuOpen(false)
            setValue(parseInt(value) + 1)
        }
    }

    const handleMenuOpen = e => {
        if (e.target.id !== 'arrow-menu' && e.target.parentElement.id !== 'arrow-menu') {
            setMenuOpen(!menuOpen)
        }
    }

    return (
        <div style={ menuOpen ? combineStyles(styles.picker_container, styles.picker_container_open) : styles.picker_container }>
            <input style={ styles.input } type='number' value={ value } onChange={ (e)=>setValue(e.target.value) }></input>
            <div style={ menuOpen ? combineStyles(styles.picker_label, styles.label_open) : styles.picker_label } onClick={ (e)=>handleMenuOpen(e) }>
                <div style={ styles.icon_menu } id="arrow-menu">
                    <Icon
                    path={ mdiChevronUp }
                    size={ 0.5 }
                    color={ theme.foreground.color }
                    onClick={ ()=>handleValueChange('increment') }
                    />
                    <Icon
                    path={ mdiChevronDown }
                    size={ 0.5 }
                    color={ theme.foreground.color }
                    onClick={ ()=>handleValueChange('decrement') }
                    />
                </div>
                { selected ? selected.label : defaultType ? defaultType.label : '' }
                <Icon
                path={ menuOpen ? mdiChevronUp : mdiChevronDown }
                size={ 0.7 }
                color={ theme.foreground.color }
                style={ { position: 'relative', right: 2, marginLeft: 6 } }
                />
                {   menuOpen &&
                    <div style={ styles.picker_option_list } className="hide-scrollbar">
                        { types && types.length > 0 && types.map((e, i) => <Option item={ e } key={ i } handleChange={ handleChange } selected={ selected } /> ) }
                    </div>
                }
            </div>
        </div>
    )
}

export default TypeInput

const styles = {
    input: {
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        maxWidth: '60px',
        paddingLeft: 12,
        boxSizing: 'border-box',
        lineHeight: 1,
        border: 'none',
        position: 'relative',
        cursor: 'pointer',
        fontWeight: 'bold',
        borderTopLeftRadius: 3,
        borderBottomLeftRadius: 3,
    },
    picker_label: {
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        lineHeight: 1,        
        boxSizing: 'border-box',
        fontSize: '0.7rem',
        maxWidth: '130px',
        minWidth: '80px',
        borderLeft: '1px solid rgba(0, 0, 0, 0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        color: '#343a40',
        position: 'relative',
        whiteSpace: 'no-wrap',
        cursor: 'pointer',
        borderBottomRightRadius: 3,
        borderTopRightRadius: 3,
        fontWeight: 'bold'
    },
    label_open: {
        borderBottomRightRadius: 0,
    },
    picker_container: {
        height: '1.8rem',
        borderBottomLeftRadius: 3,
        borderTopLeftRadius: 3,
        borderBottomRightRadius: 3,
        borderTopRightRadius: 3,
        boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.2)',
        display: 'flex',
        marginRight: 4
    },
    picker_container_open: {
        borderBottomRightRadius: 0,
    },
    picker_option_list: {
        width: '100%',
        position: 'absolute',
        top: '106%',
        boxSizing: 'border-box',
        zIndex: 100000,
        boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.2)',
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        overflow: 'scroll',
        maxHeight: '140px',
    },
    option: {
        width: '100%',
        color: '#343a40',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        fontSize: '0.8rem',
        paddingLeft: 10,
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        boxSizing: 'border-box',
        height: '1.8rem',
        cursor: 'pointer',
    },
    icon_menu: {
        height: '100%',
        position: 'absolute',
        left: -15,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    }
}