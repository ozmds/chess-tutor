import styled from 'styled-components';
import { darken } from 'polished';

export const TransparentButton = styled.button`
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: none !important;
`;

export const Button = styled(TransparentButton)`
    border: 1px solid black;
    border-radius: 1rem;
    padding: 1rem;
    background-color: ${(props) => props.colour};
    &:hover {
        background-color: ${(props) => darken(0.2, props.colour)};
    }
`;
