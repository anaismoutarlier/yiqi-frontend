import styled from 'styled-components';


export const ToggleLabel = styled.label`
cursor: pointer;
position: absolute;
top: 0;
left: 0;
width: ${({size}) => size === 'large' ? `120px` : size === 'medium' ? '80px' : "42px"};
height: ${({size}) => (size === 'large' || size === 'medium') ? `30px`: "26px"};
border-radius: 23px;
background: ${({ color }) => (color ? color : '#D83B3F')};
box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
cursor: pointer;
&::after {
    content: '${({content}) => content ? content : ''}';
    display: block;
    border-radius: ${({size}) => (size === 'large' || size === 'medium') ? '23px' : '50%'};
    width: ${({size}) => size === 'large' ? `90px`: size === 'medium' ? "60px" : "18px"};
    height: ${({size}) => (size === 'large' || size === 'medium') ? `22px`: "18px"};
    margin: 4px 0 0 4px;
    background: ${({toggleColor}) => toggleColor ? toggleColor : '#ffffff'};
    color: ${({color}) => color ? color : '#000000'};
    box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
    transition: 0.2s;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    font-weight: normal;
}
`;