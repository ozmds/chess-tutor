import styled from 'styled-components';
import { darken, getLuminance } from 'polished';

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
    border: 0.25rem solid ${(props) => darken(0.2, props.colour)};
    border-radius: 1rem;
    padding: 0.5rem;
    background-color: ${(props) => (props.selected ? darken(0.2, props.colour) : props.colour)};
    color: ${(props) => (getLuminance(props.colour) > 0.5 ? '#000000' : '#FFFFFF')};
    &:hover {
        background-color: ${(props) => darken(0.2, props.colour)};
    }
`;
