import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ModalHeader from './ModalHeader';
import ModalContainer from './ModalContainer';
import { Button } from '../core/Button';

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
            <Button colour={'#A8B0D1'} id={'modal-action'} onClick={props.action}>
                {props.actionText}
            </Button>
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
