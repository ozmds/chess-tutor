import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Modal from '../core/Modal';
import { Button } from '../core/Button';
import getPiece from '../Square/scripts/library';

const ModalHeadingText = styled.h4`
    font-weight: normal;
    width: 100%;
    margin: 0rem;
`;

const FlexContainer = styled.div`
    display: flex;
`;

const PieceImage = styled.img`
    width: 100%;
`;

const SelectButton = styled(Button)`
    flex: 1;
    margin: 1rem;
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
                    <SelectButton
                        colour='#A8B0D1'
                        id={'promotion-queen'}
                        onClick={() => this.setState({ selectedPiece: 'q' })}
                        selected={this.state.selectedPiece === 'q'}
                    >
                        {this.getPieceImage('q')}
                    </SelectButton>
                    <SelectButton
                        colour='#A8B0D1'
                        id={'promotion-bishop'}
                        onClick={() => this.setState({ selectedPiece: 'b' })}
                        selected={this.state.selectedPiece === 'b'}
                    >
                        {this.getPieceImage('b')}
                    </SelectButton>
                    <SelectButton
                        colour='#A8B0D1'
                        id={'promotion-knight'}
                        onClick={() => this.setState({ selectedPiece: 'n' })}
                        selected={this.state.selectedPiece === 'n'}
                    >
                        {this.getPieceImage('n')}
                    </SelectButton>
                    <SelectButton
                        colour='#A8B0D1'
                        id={'promotion-rook'}
                        onClick={() => this.setState({ selectedPiece: 'r' })}
                        selected={this.state.selectedPiece === 'r'}
                    >
                        {this.getPieceImage('r')}
                    </SelectButton>
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
