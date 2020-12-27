import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Modal from '../Modal/Modal';
import OptionButton from '../Modal/ModalOption';

const ModalHeadingText = styled.h4`
`;

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
                <ModalHeadingText>{'Choose a Colour'}</ModalHeadingText>
                <OptionButton
                    backgroundColour='btn-light'
                    id={'player-white'}
                    onClick={() => this.setState({ playerColour: 'white' })}
                    selected={this.state.playerColour === 'white'}
                >
                    {'White'}
                </OptionButton>
                <OptionButton
                    backgroundColour='btn-dark'
                    id={'player-black'}
                    onClick={() => this.setState({ playerColour: 'black' })}
                    selected={this.state.playerColour === 'black'}
                >
                    {'Black'}
                </OptionButton>
                <ModalHeadingText>{'Choose A Difficulty'}</ModalHeadingText>
                <OptionButton
                    backgroundColour='btn-secondary'
                    id={'computer-1'}
                    onClick={() => this.setState({ computerLevel: 1 })}
                    selected={this.state.computerLevel === 1}
                >
                    {'1'}
                </OptionButton>
                <OptionButton
                    backgroundColour='btn-secondary'
                    id={'computer-2'}
                    onClick={() => this.setState({ computerLevel: 2 })}
                    selected={this.state.computerLevel === 2}
                >
                    {'2'}
                </OptionButton>
                <OptionButton
                    backgroundColour='btn-secondary'
                    id={'computer-3'}
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
