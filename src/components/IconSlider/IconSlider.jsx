import { useContext } from 'react'

//CONTEXT___________________
import { ThemeContext } from '../../hooks/theme-context';

//STYLED COMPONENTS________________
import { StyledIconSlider } from './IconSlider';
import { IconSliderContainer } from './IconSliderContainer.styled';
import { IconWrapper } from './IconWrapper.styled';

const IconSlider = ({ children, name, height }) => {
    const { theme } = useContext(ThemeContext)

    return (
        <IconSliderContainer>
            <StyledIconSlider theme={ theme } name={ name } height={ height }>
                <IconWrapper>
                    { children }
                </IconWrapper>
            </StyledIconSlider>
        </IconSliderContainer>
    )
}

export default IconSlider;