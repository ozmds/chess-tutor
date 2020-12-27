import React from 'react';
import { Flipped } from 'react-flip-toolkit';
import PropTypes from 'prop-types';

import circle from '../../static/circle.svg';
import targetCircle from '../../static/target_circle.svg';
import getPiece from './scripts/library';
import {
    StyledSquare, TargetCircle, ChessPiece
} from './styled';
import { TransparentButton } from '../core/Button';

const Square = (props) => {
    if (props.pieceID !== null) {
        const piece = getPiece(props.pieceID);
        return (
            <StyledSquare id={props.squareID}>
                {props.moves.includes(props.squareID)
                    && <TargetCircle src={targetCircle} alt={'target circle'} />
                }
                <Flipped flipId={props.pieceID}>
                    <TransparentButton onClick={() => props.selectSquare(props.squareID, props.pieceID[0])}>
                        <ChessPiece src={piece.image} alt={piece.name} />
                    </TransparentButton>
                </Flipped>
            </StyledSquare>
        );
    }
    if (props.moves.includes(props.squareID)) {
        return (
            <StyledSquare id={props.squareID}>
                <TransparentButton onClick={() => props.selectSquare(props.squareID)}>
                    <ChessPiece src={circle} alt={'circle'} />
                </TransparentButton>
            </StyledSquare>
        );
    }
    return <StyledSquare id={props.squareID} />;
};

Square.propTypes = {
    pieceID: PropTypes.string,
    squareID: PropTypes.string.isRequired,
    moves: PropTypes.arrayOf(PropTypes.string).isRequired,
    selectSquare: PropTypes.func.isRequired
};

export default Square;
