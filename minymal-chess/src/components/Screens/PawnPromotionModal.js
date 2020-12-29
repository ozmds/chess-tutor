import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Modal from '../core/Modal';
import { Button } from '../core/Button';
import getPiece from '../../scripts/library';

const Header = styled.h4`
    font-weight: normal;
    width: 100%;
    margin: 0rem;
`;

const Container = styled.div`
    display: flex;
`;

const Piece = styled.img`
    width: 100%;
`;

const OptionButton = styled(Button)`
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
        return <Piece src={getPiece(piece).image} alt={getPiece(piece).name} />;
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
                <Header>{'Choose a Piece'}</Header>
                <Container>
                    {[['queen', 'q'], ['bishop', 'b'], ['knight', 'n'], ['rook', 'r']].map((piece) => (
                        <OptionButton
                            key={piece[0]}
                            colour='#A8B0D1'
                            id={`promotion-${piece[0]}`}
                            onClick={() => this.setState({ selectedPiece: piece[1] })}
                            selected={this.state.selectedPiece === piece[1]}
                        >
                            {this.getPieceImage(piece[1])}
                        </OptionButton>
                    ))}
                </Container>
            </Modal>
        );
    }
}

PawnPromotionModal.propTypes = {
    promotePawn: PropTypes.func.isRequired,
    playerColour: PropTypes.string.isRequired
};

export default PawnPromotionModal;
