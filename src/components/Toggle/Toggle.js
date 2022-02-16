import React from 'react';

import { StyledToggle } from './StyledToggle.styled'
import { ToggleLabel } from './ToggleLabel.styled'
import { ToggleWrapper } from './ToggleWrapper.styled';

const Toggle = ({ textColor, onColor, offColor, onChange, onContent, offContent, size = "small", onValue, offValue, isChecked, name }) => {
    //FUNCTIONS_______________________
    const handleChange = e => {
        onChange(e, onValue, offValue, name)
    }
    return (
            <ToggleWrapper>
                <StyledToggle id="toggle" type="checkbox" onChange={ handleChange } size={ size } content={ onContent } color={ onColor } textColor={ textColor } checked={ isChecked } />
                <ToggleLabel htmlFor="toggle" size={ size } color={ offColor } content={ offContent } textColor={ textColor } />
            </ToggleWrapper>
    )
}

export default Toggle;