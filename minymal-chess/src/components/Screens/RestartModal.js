import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';
import getMessage from './scripts/getMessage';

const RestartModal = (props) => (
    <Modal
        id={'restart-modal'}
        header={props.gameOver ? 'Game Over' : 'Restart'}
        onClose={() => props.setModal('')}
        action={() => props.setModal('start')}
        actionText={'Restart Game'}
    >
        {getMessage(props.gameOver)}
    </Modal>
);

RestartModal.propTypes = {
    gameOver: PropTypes.string,
    setModal: PropTypes.func
};

export default RestartModal;
