import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ModalBackground = styled.div`
    position: fixed;
    z-index: 1050;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
`;

const RestartModal = (props) => (
    <ModalBackground>
        <div className='modal-dialog'>
            <div className='modal-content'>
                <div className='modal-header'>
                    <h5 className='modal-title'>{props.header}</h5>
                    <button className='close'>
                        <span>{'X'}</span>
                    </button>
                </div>
                <div className='modal-body'>
                    {props.message}
                </div>
                <div className='modal-footer'>
                    <button className='btn btn-secondary'>{'Close'}</button>
                    <button className='btn btn-primary'>{'Restart Game'}</button>
                </div>
            </div>
        </div>
    </ModalBackground>
);

RestartModal.propTypes = {
    message: PropTypes.string,
    header: PropTypes.string
};

export default RestartModal;
