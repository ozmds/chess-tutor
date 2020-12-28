import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, TransparentButton } from './Button';

const ModalContainer = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    flex-wrap: wrap;
`;

const ModalBody = styled(ModalContainer)`
    border-top: 0.125rem solid rgba(0, 0, 0, 0.3);
    border-bottom: 0.125rem solid rgba(0, 0, 0, 0.3);
    font-size: 1.2rem;
`;

const ModalFooter = styled(ModalContainer)`
    justify-content: flex-end;
`;

const ModalHeader = styled.h2`
    margin: 0rem;
    font-weight: 400;
`;

const ModalDialog = styled.div`
    width: 90vw;
    max-width: 40rem;
    padding: 0.5rem;
    background-color: #FFF;
    box-shadow: 1rem;
`;

const Background = styled.div`
    position: fixed;
    z-index: 1050;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

/*
const CloseIcon = styled.div`
    position: absolute;
    width: 100%;
`;

const CloseButton = styled(Button)`
    width: 15%;
    position: relative;
    padding: 0rem;
    &:after {
        content: "";
        display: block;
        padding-bottom: 100%;
    }
`;
*/

const Modal = (props) => (
    <Background>
        <ModalDialog id={props.id}>
            <ModalContainer>
                <ModalHeader>{props.header}</ModalHeader>
                <TransparentButton colour={'#A8B0D1'} onClick={props.onClose}>
                    <ModalHeader>{'X'}</ModalHeader>
                </TransparentButton>
            </ModalContainer>
            <ModalBody id={'modal-body'}>
                {props.children}
            </ModalBody>
            <ModalFooter>
                <Button colour={'#A8B0D1'} id={'modal-action'} onClick={props.action}>
                    {props.actionText}
                </Button>
            </ModalFooter>
        </ModalDialog>
    </Background>
);

Modal.propTypes = {
    id: PropTypes.string.isRequired,
    header: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    action: PropTypes.func.isRequired,
    actionText: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
};

export default Modal;
