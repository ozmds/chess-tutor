import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';
import OptionButton from '../Modal/ModalOption';

class StartModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playerColour: 'white',
            computerLevel: 1
        };
    }

    render() {
        const { playerColour, computerLevel } = this.state;
        return (
            <Modal
                id={'start-modal'}
                header={"Let's Start"}
                onClose={this.props.onClose}
                action={() => this.props.startGame(playerColour, computerLevel)}
                actionText={'Start'}
            >
                <h4>{'Choose a Colour'}</h4>
                <OptionButton
                    backgroundColour='btn-light'
                    onClick={() => this.setState({ playerColour: 'white' })}
                    selected={this.state.playerColour === 'white'}
                >
                    {'White'}
                </OptionButton>
                <OptionButton
                    backgroundColour='btn-dark'
                    onClick={() => this.setState({ playerColour: 'black' })}
                    selected={this.state.playerColour === 'black'}
                >
                    {'Black'}
                </OptionButton>
                <h4>{'Choose A Difficulty'}</h4>
                <OptionButton
                    backgroundColour='btn-secondary'
                    onClick={() => this.setState({ computerLevel: 1 })}
                    selected={this.state.computerLevel === 1}
                >
                    {'1'}
                </OptionButton>
                <OptionButton
                    backgroundColour='btn-secondary'
                    onClick={() => this.setState({ computerLevel: 2 })}
                    selected={this.state.computerLevel === 2}
                >
                    {'2'}
                </OptionButton>
                <OptionButton
                    backgroundColour='btn-secondary'
                    onClick={() => this.setState({ computerLevel: 3 })}
                    selected={this.state.computerLevel === 3}
                >
                    {'3'}
                </OptionButton>
            </Modal>
        );
    }
}

StartModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    startGame: PropTypes.func.isRequired
};

export default StartModal;
