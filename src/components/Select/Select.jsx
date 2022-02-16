import React, { useState, useEffect, useContext } from 'react'

//STYLES________________________
import '../../App.css'

//UI__________________________
import Icon from '@mdi/react'
import { mdiPlus, mdiChevronDown, mdiChevronUp } from '@mdi/js';

//CONTEXT______________________
import { ThemeContext } from '../../hooks/theme-context';

//HELPER FUNCTIONS______________
import combineStyles from '../../helpers/combineStyles'

export const Option = ({ item, setSelection, index, selectedOptions, selected }) => {
    //CONTEXT_________________________
    const { theme } = useContext(ThemeContext)

    //STATE HOOKS_____________________
    const [isSelected, setIsSelected] = useState(selected ? selected === item : selectedOptions.find(e => e.value === item.value))
    const [hover, setHover] = useState(false)

    //EFFECT HOOKS______________________
    useEffect(()=> {
        selectedOptions.find(e => e.value === item.value) ? setIsSelected(true) : setIsSelected(false)
    }, [selectedOptions, item])

    //FUNCTIONS___________________________
    const toggleOption = () => {
        setSelection(item)
    }

    return <div onMouseEnter={ ()=>setHover(true) } onMouseLeave={ ()=>setHover(false) } onClick={ ()=>toggleOption() } style={ isSelected || hover ? combineStyles(styles.option, theme.background_transparent, { opacity: hover ? 0.6 : 0.8 }) : styles.option }>{ item.label }</div>
}

export const SelectTag = ({ item, setSelection, closable = true }) => {
    //CONTEXT_________________________
    const { theme } = useContext(ThemeContext)

    return (
        <div style={ combineStyles(styles.tag_body, theme.background_transparent, { border: `1px solid ${theme.foreground.color}`}) }>
            { item.label }
            {
                closable &&
                <Icon
                path={ mdiPlus }
                rotate={ 45 }
                size={ 0.8 }
                color="#ffffff"
                style={ { marginTop: 2, marginLeft: 2 } }
                onClick={ ()=>setSelection(item) }
                />
            }
        </div>
    )
}

const Select = ({ style, values, handleChange, placeholder, defaultValues, name, multiple = false, closable = true }) => {
    //CONTEXT_________________________
    const { theme } = useContext(ThemeContext)

    //STATE HOOKS_________________________
    const [selectOpen, setSelectOpen] = useState(false)
    const [selectedOptions, setSelectedOptions] = useState([])
    const [selected, setSelected] = useState(null)

    //EFFECT HOOKS_____________________________
    useEffect(() => {
        if (defaultValues && defaultValues.length > 0) {
            setSelectedOptions(selectedOptions => [...selectedOptions, ...defaultValues])
        }
    }, [defaultValues])

    //FUNCTIONS_________________________________
    const setSelection = item => {
        console.log(item)
        if (multiple) {
            let newSelection = selectedOptions.find(e => e.value === item.value) ? selectedOptions.filter(e => e.value !== item.value) : [ ...selectedOptions, item]
            setSelectedOptions(newSelection)
            handleChange(item, name)
        } else {
            setSelected(item)
            handleChange(item)
            setSelectOpen(false)
        }
    }

    const toggleMenu = e => {
        if (e.target.id === 'select' || e.target.id === 'placeholder' || e.target.id === 'close' || e.target.parentElement.id === 'close') {
            setSelectOpen(!selectOpen)
        }
    }

    return (
        <div style={ combineStyles(styles.select_wrapper, style) }>
            <div className="hide-scrollbar" style={ selectOpen ? combineStyles(styles.select_body, styles.select_body_open) : styles.select_body } id="select" onClick={ (e)=>toggleMenu(e) }>
                {  ((multiple && selectedOptions.length === 0)  || (!multiple && !selected)) && <span style={ styles.placeholder } id="placeholder">{ placeholder }</span> }
                { multiple && selectedOptions.length > 0 && selectedOptions.map((e, i) => <SelectTag item={ e } label={ e.label } key={ i } index={ i } setSelection={ setSelection } />) }
                { !multiple && selected && <SelectTag item={ selected } setSelection={ setSelection } closable={ closable } /> }
                <div style={ styles.icon_wrapper } id="close" onClick={ (e)=>toggleMenu(e) }>
                    <Icon
                    path={ selectOpen ? mdiChevronUp : mdiChevronDown }
                    size={ 1 }
                    color={ theme.foreground.color }
                    />
                </div>
            </div>
            {   selectOpen &&
                <div style={ styles.option_list } className="hide-scrollbar" id="options">
                    { values && values.length > 0 && values.map((e, i) => <Option item={ e } label={ e.label } key={ i } index={ i } setSelection={ setSelection } selectedOptions={ selectedOptions } selected={ selected } /> )}
                </div>
            }
        </div>
    )
}

export default Select

const styles = {
    select_wrapper: {
        position: 'relative',
        boxSizing: 'border-box',
        borderRadius: 3,
        width: '100%',
    },
    select_body: {
        boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.1)',
        border: '1px solid rgba(0, 0, 0, 0.2)',
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        boxSizing: 'border-box',
        maxWidth: '100%',
        borderTopRightRadius: 3,
        borderTopLeftRadius: 3,
        borderBottomRightRadius: 3,
        borderBottomLeftRadius: 3,
        cursor: 'pointer',
        flexWrap: 'wrap',
        height: '34px',
        paddingRight: 27,
        paddingLeft: 5,
        // paddingTop: 3,
        // paddingBottom: 3
    },
    select_body_open: {
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
        boxShadow: '1px 0px 1px 1px rgba(0, 0, 0, 0.1)',
    },
    tag_body: {
        height: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        border: '1px solid rgba(0, 0, 0, 0.2)',
        borderRadius: 3,
        fontSize: '0.8rem',
        paddingLeft: 5,
        paddingRight: 5,
        boxSizing: 'border-box',
        whitespace: 'no-wrap',
        marginRight: '5px',
        boxShadow: '1px 1px 3px 2px rgba(0, 0, 0, 0.05)',
    },
    option_list: {
        width: '100%',
        position: 'absolute',
        top: '104%',
        boxSizing: 'border-box',
        zIndex: 20000,
        boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.08)',
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        overflowY: 'scroll',
        maxHeight: '240px',
        minHeight: '120px',
    },
    option: {
        width: '104%',
        color: '#343a40',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        fontSize: '0.8rem',
        paddingLeft: 10,
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        boxSizing: 'border-box',
        height: '35px',
        cursor: 'pointer',
        position: 'relative',
        left: 0,
    },
    placeholder: {
        color: 'rgba(52, 58, 64, 0.5)',
        fontSize: '0.7rem',
        fontWeight: '600',
        textTransform: 'uppercase',
        marginLeft: 7
    },
    icon_wrapper: {
        position: 'absolute',
        right: 5,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '18px',
        height: '100%',
    }
}