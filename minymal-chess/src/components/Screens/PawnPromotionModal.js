import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Modal from '../Modal/Modal';
import OptionButton from '../Modal/ModalOption';
import getPiece from '../Square/scripts/library';

const ModalHeadingText = styled.h4`
`;

const FlexContainer = styled.div`
    display: flex;
`;

const PieceImage = styled.img`
    width: 100%;
`;

class PawnPromotionModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedPiece: 'q'
        };
    }

    getPieceImage = (pieceKey) => {
        let piece = pieceKey;
        if (this.props.playerColour === 'white') {
            piece = pieceKey.toUpperCase();
        }
        return <PieceImage src={getPiece(piece).image} alt={getPiece(piece).name} />;
    }

    promotePawn = () => {
        if (this.props.playerColour === 'white') {
            this.props.promotePawn(this.state.selectedPiece.toUpperCase());
        } else {
            this.props.promotePawn(this.state.selectedPiece);
        }
    }

    render() {
        return (
            <Modal
                id={'pawn-promotion-modal'}
                header={'Pawn Promotion'}
                onClose={this.promotePawn}
                action={this.promotePawn}
                actionText={'Select'}
            >
                <ModalHeadingText>{'Choose a Piece'}</ModalHeadingText>
                <FlexContainer>
                    <OptionButton
                        backgroundColour='btn-light'
                        id={'promotion-queen'}
                        onClick={() => this.setState({ selectedPiece: 'q' })}
                        selected={this.state.selectedPiece === 'q'}
                    >
                        {this.getPieceImage('q')}
                    </OptionButton>
                    <OptionButton
                        backgroundColour='btn-light'
                        id={'promotion-bishop'}
                        onClick={() => this.setState({ selectedPiece: 'b' })}
                        selected={this.state.selectedPiece === 'b'}
                    >
                        {this.getPieceImage('b')}
                    </OptionButton>
                    <OptionButton
                        backgroundColour='btn-light'
                        id={'promotion-knight'}
                        onClick={() => this.setState({ selectedPiece: 'n' })}
                        selected={this.state.selectedPiece === 'n'}
                    >
                        {this.getPieceImage('n')}
                    </OptionButton>
                    <OptionButton
                        backgroundColour='btn-light'
                        id={'promotion-rook'}
                        onClick={() => this.setState({ selectedPiece: 'r' })}
                        selected={this.state.selectedPiece === 'r'}
                    >
                        {this.getPieceImage('r')}
                    </OptionButton>
                </FlexContainer>
            </Modal>
        );
    }
}

PawnPromotionModal.propTypes = {
    promotePawn: PropTypes.func.isRequired,
    playerColour: PropTypes.string.isRequired
};

export default PawnPromotionModal;
