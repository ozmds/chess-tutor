import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../core/Modal';
import getMessage from '../../scripts/getMessage';

const RestartModal = (props) => (
    <Modal
        id={'restart-modal'}
        header={props.gameOver ? 'Game Over' : 'Restart'}
        onClose={props.onClose}
        action={props.restartGame}
        actionText={'Restart Game'}
    >
        {getMessage(props.gameOver)}
    </Modal>
);

RestartModal.propTypes = {
    gameOver: PropTypes.oneOf(['restart', 'start', 'player', 'computer', 'draw', '']).isRequired,
    onClose: PropTypes.func.isRequired,
    restartGame: PropTypes.func.isRequired
};

export default RestartModal;
