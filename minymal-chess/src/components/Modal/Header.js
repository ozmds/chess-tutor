import React from 'react';
import PropTypes from 'prop-types';

const ModalHeader = (props) => (
    <div className='modal-header'>
        <h5 className='modal-title'>{props.header}</h5>
        <button className='close' onClick={props.onClose}>
            <span>{'X'}</span>
        </button>
    </div>
);

ModalHeader.propTypes = {
    header: PropTypes.string,
    onClose: PropTypes.func
};

export default ModalHeader;
