import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledButton = styled.button`
    background: none;
    color: inherit;
    border: 1px solid black;
    border-radius: 1rem;
    padding: 1rem;
    font: inherit;
    cursor: pointer;
    outline: none !important;
`;

const ModalOption = (props) => (
    <StyledButton
        id={props.id}
        type='button'
        onClick={props.onClick}
    >
        {props.children}
    </StyledButton>
);

ModalOption.propTypes = {
    id: PropTypes.string.isRequired,
    backgroundColour: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
};

export default ModalOption;
