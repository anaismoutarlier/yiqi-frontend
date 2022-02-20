import React from 'react'
import '../../App.css'

//STYLES____________________
import { Container } from './Container'
import { StyledSlider } from './StyledSlider'
import { Label } from "./Label"
import { Icon } from "./Icon"

export default function Slider({ color, name, children }) {
    const offset = (name.length * 12) + 12

    return (
        <Container>
            <StyledSlider offset={ offset } color={ color }>
                <Label offset={ offset }>
                    { name }
                </Label>
                <Icon>
                    { children }
                </Icon>
            </StyledSlider>
        </Container>
    )
}
