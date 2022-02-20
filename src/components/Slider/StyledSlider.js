import styled from "styled-components"

export const StyledSlider = styled.div`
    position: absolute;
    z-index: 3000;
    right: 0;
    height: 100%;
    width: ${({ offset }) => `${offset + 50}px`};
    background-color: ${({ color }) => color} ;
    transition: right 1s, background-color 1s, color 1s;
    transform-origin: left;
    display: grid;
    grid-template-columns: ${({ offset }) => offset}px 50px;
    &:hover {
        right: ${({ offset }) => `${-offset}px`};
    }
`