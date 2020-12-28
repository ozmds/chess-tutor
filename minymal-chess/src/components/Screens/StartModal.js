import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Modal from '../core/Modal';
import { Button } from '../core/Button';

const ModalHeadingText = styled.h4`
    font-weight: normal;
    width: 100%;
    margin: 0rem;
`;

const SelectButton = styled(Button)`
    flex: 1;
    margin: 1rem;
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
                <SelectButton
                    colour='#A8B0D1'
                    id={'player-white'}
                    onClick={() => this.setState({ playerColour: 'white' })}
                    selected={this.state.playerColour === 'white'}
                >
                    {'White'}
                </SelectButton>
                <SelectButton
                    colour='#A8B0D1'
                    id={'player-black'}
                    onClick={() => this.setState({ playerColour: 'black' })}
                    selected={this.state.playerColour === 'black'}
                >
                    {'Black'}
                </SelectButton>
                <ModalHeadingText>{'Choose A Difficulty'}</ModalHeadingText>
                <SelectButton
                    colour='#A8B0D1'
                    id={'computer-1'}
                    onClick={() => this.setState({ computerLevel: 1 })}
                    selected={this.state.computerLevel === 1}
                >
                    {'1'}
                </SelectButton>
                <SelectButton
                    colour='#A8B0D1'
                    id={'computer-2'}
                    onClick={() => this.setState({ computerLevel: 2 })}
                    selected={this.state.computerLevel === 2}
                >
                    {'2'}
                </SelectButton>
                <SelectButton
                    colour='#A8B0D1'
                    id={'computer-3'}
                    onClick={() => this.setState({ computerLevel: 3 })}
                    selected={this.state.computerLevel === 3}
                >
                    {'3'}
                </SelectButton>
            </Modal>
        );
    }
}

StartModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    startGame: PropTypes.func.isRequired
};

export default StartModal;
