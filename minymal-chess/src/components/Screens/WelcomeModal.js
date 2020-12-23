import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';
import getMessage from './scripts/getMessage';

const WelcomeModal = (props) => (
    <Modal
        id={'welcome-modal'}
        header={'Welcome to Minimalist Chess'}
        onClose={props.onClose}
        action={props.onClose}
        actionText={"Let's Start"}
    >
        {"We believe that the way to get better at anything is to just do it, and \
         chess is no different. So what we've created a game of chess that will give you helpful indicators \
         about how you can improve your game, all while you are playing an actual games. No puzzle, no hypotheticals. \
         Get ready to be a better chess player, we hope it doesn't go to your head."}
    </Modal>
);

WelcomeModal.propTypes = {
    gameOver: PropTypes.oneOf(['restart', 'start', 'player', 'computer', 'draw', '']).isRequired,
    onClose: PropTypes.func.isRequired,
    restartGame: PropTypes.func.isRequired
};

export default WelcomeModal;
