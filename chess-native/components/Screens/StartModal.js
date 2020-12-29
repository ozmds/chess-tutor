import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Modal from '../core/Modal';
import { Button } from '../core/Button';

const Header = styled.h4`
    font-weight: normal;
    width: 100%;
    margin: 0rem;
`;

const OptionButton = styled(Button)`
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
                <Header>{'Choose a Colour'}</Header>
                {['white', 'black'].map((colour) => (
                    <OptionButton
                        key={colour}
                        colour='#A8B0D1'
                        id={`player-${colour}`}
                        onClick={() => this.setState({ playerColour: colour })}
                        selected={this.state.playerColour === colour}
                    >
                        {colour}
                    </OptionButton>
                ))}
                <Header>{'Choose A Difficulty'}</Header>
                {[1, 2, 3].map((level) => (
                    <OptionButton
                        key={level}
                        colour='#A8B0D1'
                        id={`computer-${level}`}
                        onClick={() => this.setState({ computerLevel: level })}
                        selected={this.state.computerLevel === level}
                    >
                        {level}
                    </OptionButton>
                ))}
            </Modal>
        );
    }
}

StartModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    startGame: PropTypes.func.isRequired
};

export default StartModal;
