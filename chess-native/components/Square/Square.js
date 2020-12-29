import React from 'react';
import { Flipped } from 'react-flip-toolkit';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import isLightTile from '../../scripts/isLightTile';

import circle from '../../static/circle.svg';
import targetCircle from '../../static/target_circle.svg';
import getPiece from '../../scripts/library';
import { TransparentButton } from '../core/Button';

const Container = styled.div`
    width: 12.5%;
    height: 12.5%;
    position: relative;
    background-color: ${(props) => (isLightTile(props.id) ? 'cornsilk' : '#b5721d')};
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Piece = styled.img`
    width: 70%;
    position: relative;
    z-index: 2;
`;

const Target = styled.img`
    position: absolute;
    width: 100%;
    z-index: 1;
`;

const Square = (props) => {
    if (props.pieceID !== null) {
        const piece = getPiece(props.pieceID);
        return (
            <Container id={props.squareID}>
                {props.moves.includes(props.squareID)
                    && <Target src={targetCircle} alt={'target circle'} />
                }
                <Flipped flipId={props.pieceID}>
                    <TransparentButton onClick={() => props.selectSquare(props.squareID, props.pieceID[0])}>
                        <Piece src={piece.image} alt={piece.name} />
                    </TransparentButton>
                </Flipped>
            </Container>
        );
    }
    if (props.moves.includes(props.squareID)) {
        return (
            <Container id={props.squareID}>
                <TransparentButton onClick={() => props.selectSquare(props.squareID)}>
                    <Piece src={circle} alt={'circle'} />
                </TransparentButton>
            </Container>
        );
    }
    return <Container id={props.squareID} />;
};

Square.propTypes = {
    pieceID: PropTypes.string,
    squareID: PropTypes.string.isRequired,
    moves: PropTypes.arrayOf(PropTypes.string).isRequired,
    selectSquare: PropTypes.func.isRequired
};

export default Square;
