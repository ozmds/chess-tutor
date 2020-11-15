import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Flipped } from 'react-flip-toolkit';
import PropTypes from 'prop-types';

import pieces from './piece_library';
import circle from '../../static/circle.svg';
import targetCircle from '../../static/target_circle.svg';

const PlainButton = styled.button`
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: none !important;
`;

const ChessPiece = styled.img`
    width: 70%;
    position: relative;
    z-index: 2;
`;

const TargetCircle = styled.img`
    position: absolute;
    width: 100%;
    z-index: 1;
`;

const getPiece = (pieceID) => {
    const pieceSymbol = pieceID[0];
    return pieces.filter((piece) => piece.key === pieceSymbol)[0];
};

const Square = (props) => {
    if (props.pieceID !== null) {
        const piece = getPiece(props.pieceID);
        return (
            <Fragment>
                {props.moves.includes(props.squareID)
                    && <TargetCircle src={targetCircle} alt={'target circle'} />
                }
                <Flipped flipId={props.pieceID}>
                    <PlainButton onClick={() => props.selectSquare(props.squareID)}>
                        <ChessPiece src={piece.image} alt={piece.name} />
                    </PlainButton>
                </Flipped>
            </Fragment>
        );
    }
    if (props.moves.includes(props.squareID)) {
        return (
            <PlainButton onClick={() => props.selectSquare(props.squareID)}>
                <ChessPiece src={circle} alt={'circle'} />
            </PlainButton>
        );
    }
    return null;
};

Square.propTypes = {
    pieceID: PropTypes.string,
    squareID: PropTypes.string,
    moves: PropTypes.array,
    selectSquare: PropTypes.func
};

export default Square;
