import styled from "styled-components";
import { ToggleLabel } from './ToggleLabel.styled'

export const StyledToggle = styled.input`
cursor: pointer;
opacity: 0;
z-index: 1;
border-radius: 15px;
width: ${({size}) => size === 'large' ? `120px` : size === 'medium' ? '80px' : "42px"};
height: ${({size}) => (size === 'large' || size === 'medium') ? `30px`: "26px"};
box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
&:checked + ${ToggleLabel} {
    background: ${({ color }) => (color ? color : '#D83B3F')};
    &::after {
        content: '${({content}) => content ? content : ''}';
        border-radius: ${({size}) => (size === 'large' || size === 'medium') ? '23px' : '50%'};
        width: ${({size}) => size === 'large' ? `90px`: size === 'medium' ? "60px" : "18px"};
        height: ${({size}) => (size === 'large' || size === 'medium') ? `22px`: "18px"};
        margin-left: ${({size}) => size === 'large' ? "25px" : size === 'medium' ? '16px' : '20px'};
        color: ${({color}) => color ? color : '#000000'};
        transition: 0.2s;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        font-weight: normal;
    }
}
`;