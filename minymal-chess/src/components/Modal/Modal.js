import React from 'react';
import PropTypes from 'prop-types';
import ModalHeader from './ModalHeader';
import ModalContainer from './ModalContainer';

const Modal = (props) => (
    <ModalContainer id={props.id}>
        <ModalHeader
            header={props.header}
            onClose={props.onClose}
        />
        <div className='modal-body'>
            {props.children}
        </div>
        <div className='modal-footer'>
            <button className='btn btn-primary' onClick={props.action}>
                {props.actionText}
            </button>
        </div>
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
