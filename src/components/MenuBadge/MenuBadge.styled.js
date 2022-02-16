import styled from 'styled-components';

export const StyledMenuBadge = styled.div`
    box-sizing: border-box;
    cursor: pointer;
    margin: ${({style: { margin } }) => margin ? `${margin}px` : "2px"};
    border-radius: ${({style:{ borderRadius } }) => borderRadius || '50px'};
    ${({ rotated }) => rotated && `
    transform: rotate(45deg);
    `}
    display: flex;
    &:first-child {
        ::before {
            transition: all 0.5s ease-in-out;
            background-color: ${({ style: { backgroundColor } }) => backgroundColor || 'rgba(255, 255, 255, 0.4)'};
        }
    }
    align-items: center;
    justify-content: center;
    transition: transform 0.5s;
    border: 2px solid ${({ style: { borderColor } }) => borderColor || 'transparent'};
    padding: ${({ style: { padding } }) => padding ? `${padding}px` : "4px"};
    &:hover {
        transform: scale(${({ scale }) => scale ? `${scale}` : "1.05"}) rotate(${({ rotate }) => rotate ? `${rotate}deg` : "0deg"});
        opacity: 0.8;
        ${({ openable, content }) => openable && `
        &:first-child {
            ::before {
                content: '${content}';
                padding: 4px;
                border-radius: 20px;
                color: #ffffff;
                font-size: 16px;
            }
        }`}
    }
`