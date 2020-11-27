import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';

const getMessage = (gameOver) => {
    switch (gameOver) {
    case 'player':
        return 'You beat the computer! Play again?';
    case 'computer':
        return 'The computer won the game this time. Try again?';
    case 'draw':
        return 'The game ended in a draw. Try again?';
    default:
        return 'Do you want to restart the game?';
    }
};

const RestartModal = (props) => (
    <Modal
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
