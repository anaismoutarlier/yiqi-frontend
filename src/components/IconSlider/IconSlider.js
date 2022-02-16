import styled from 'styled-components';

export const StyledIconSlider = styled.div`
position: absolute;
height: 70px;
width: 80px;
display: flex;
justify-content: center;
align-items: center;
cursor: pointer;
transition: transform 1s, background-color 1s, padding 1.5s;
background-color: ${({ theme }) => theme.background.backgroundColor};
&:hover {
    padding-left: 80px;
    transform-origin: center right;
    justify-content: flex-end;
    z-index: 1000;
    &:first-child {
        &:first-child {
            padding-right: 5px;
            ::before {
                content: '${({name}) => name}';
                color: #fff;
                display: flex;
                justify-content: flex-end;
                text-transform: uppercase;
                font-weight: bold;
                padding-right: 5px;
            }
        }
    }
}
`