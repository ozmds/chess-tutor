import React, { Fragment } from 'react';
import { Flipped } from 'react-flip-toolkit';
import PropTypes from 'prop-types';

import pieces from './piece_library';
import styles from './Square.module.css';
import circle from '../../static/circle.svg';
import targetCircle from '../../static/target_circle.svg';

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
                    && <img className={styles.targetcircle} src={targetCircle} alt={'target circle'} />
                }
                <Flipped flipId={props.pieceID}>
                    <button onClick={() => props.selectSquare(props.squareID)}>
                        <img className={styles.piece} src={piece.image} alt={piece.name} />
                    </button>
                </Flipped>
            </Fragment>
        );
    }
    if (props.moves.includes(props.squareID)) {
        return (
            <button onClick={() => props.selectSquare(props.squareID)}>
                <img className={styles.piece} src={circle} alt={'circle'} />
            </button>
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
