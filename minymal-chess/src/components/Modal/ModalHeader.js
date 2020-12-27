import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Button } from '../core/Button';

const ModalHeading = styled.h5`
`;

const ModalHeaderContainer = styled.div`
`;

const ModalHeader = (props) => (
    <ModalHeaderContainer>
        <ModalHeading>{props.header}</ModalHeading>
        <Button colour={'#A8B0D1'} onClick={props.onClose}>
            {'X'}
        </Button>
    </ModalHeaderContainer>
);

ModalHeader.propTypes = {
    header: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired
};

export default ModalHeader;
