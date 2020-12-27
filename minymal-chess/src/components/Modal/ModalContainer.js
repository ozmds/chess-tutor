import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Background from './styled';

const ModalDialog = styled.div`
    width: 90vw;
    max-width: 30rem;
    background-color: #FFF;
`;

const ModalContainer = (props) => (
    <Background>
        <ModalDialog id={props.id}>
            {props.children}
        </ModalDialog>
    </Background>
);

ModalContainer.propTypes = {
    id: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
};

export default ModalContainer;
