import React from 'react';
import PropTypes from 'prop-types';
import ModalHeader from './Header';
import ModalContainer from './Container';

const Modal = (props) => (
    <ModalContainer>
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
    header: PropTypes.string,
    onClose: PropTypes.func,
    children: PropTypes.node,
    action: PropTypes.func,
    actionText: PropTypes.string
};

export default Modal;
