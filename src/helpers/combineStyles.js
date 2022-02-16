const combineStyles = (baseStyle, addStyles1, addStyles2, addStyles3) => {
    return Object.assign({ ...baseStyle }, { ...addStyles1, ...addStyles2, ...addStyles3 })
}

export default combineStyles;