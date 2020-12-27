import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

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

const ModalHeading = styled.h5`
`;

const ModalHeaderContainer = styled.div`
`;

const ModalHeader = (props) => (
    <ModalHeaderContainer>
        <ModalHeading>{props.header}</ModalHeading>
        <StyledButton onClick={props.onClose}>
            {'X'}
        </StyledButton>
    </ModalHeaderContainer>
);

ModalHeader.propTypes = {
    header: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired
};

export default ModalHeader;
