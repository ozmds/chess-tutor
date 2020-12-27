import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ModalHeader from './ModalHeader';
import ModalContainer from './ModalContainer';

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

const ModalWrap = styled.div`
`;

const Modal = (props) => (
    <ModalContainer id={props.id}>
        <ModalHeader
            header={props.header}
            onClose={props.onClose}
        />
        <ModalWrap id={'modal-body'}>
            {props.children}
        </ModalWrap>
        <ModalWrap>
            <StyledButton id={'modal-action'} onClick={props.action}>
                {props.actionText}
            </StyledButton>
        </ModalWrap>
    </ModalContainer>
);

Modal.propTypes = {
    id: PropTypes.string.isRequired,
    header: PropTypes.string.isRequired,
    actionText: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    action: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
};

export default Modal;
