import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';
import OptionButton from '../Modal/OptionButton';

class StartModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playerColour: 'white',
            computerLevel: '1'
        };
    }

    render() {
        const { playerColour, computerLevel } = this.state;
        return (
            <Modal
                id={'start-modal'}
                header={"Let's Start"}
                onClose={() => this.props.setModal('')}
                action={() => this.props.startGame(playerColour, computerLevel)}
                actionText={'Start'}
            >
                <h4>{'Choose a Colour'}</h4>
                <OptionButton
                    colour='btn-light'
                    onClick={() => this.setState({ playerColour: 'white' })}
                    selected={this.state.playerColour === 'white'}
                >
                    {'White'}
                </OptionButton>
                <OptionButton
                    colour='btn-dark'
                    onClick={() => this.setState({ playerColour: 'black' })}
                    selected={this.state.playerColour === 'black'}
                >
                    {'Black'}
                </OptionButton>
                <h4>{'Choose A Difficulty'}</h4>
                <OptionButton
                    colour='btn-secondary'
                    onClick={() => this.setState({ computerLevel: '1' })}
                    selected={this.state.computerLevel === '1'}
                >
                    {'1'}
                </OptionButton>
                <OptionButton
                    colour='btn-secondary'
                    onClick={() => this.setState({ computerLevel: '2' })}
                    selected={this.state.computerLevel === '2'}
                >
                    {'2'}
                </OptionButton>
                <OptionButton
                    colour='btn-secondary'
                    onClick={() => this.setState({ computerLevel: '3' })}
                    selected={this.state.computerLevel === '3'}
                >
                    {'3'}
                </OptionButton>
            </Modal>
        );
    }
}

StartModal.propTypes = {
    gameOver: PropTypes.string,
    setModal: PropTypes.func,
    startGame: PropTypes.func
};

export default StartModal;
