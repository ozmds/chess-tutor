import React, { Fragment } from 'react';
import { Flipped } from 'react-flip-toolkit';
import PropTypes from 'prop-types';

import styles from './Piece.module.css';
import circle from '../../static/circle.svg';
import targetCircle from '../../static/target_circle.svg';
import pieces from './pieces';

const Piece = (props) => {
    let pieceImage;
    let pieceName;
    if (props.pieceKey !== null) {
        pieceImage = pieces.filter((piece) => piece.key === props.pieceKey[0])[0].image;
        pieceName = pieces.filter((piece) => piece.key === props.pieceKey[0])[0].name;
        return (
            <Fragment>
                {props.moves.includes(props.square)
                    && <img className={styles.targetcircle} src={targetCircle} alt={'target circle'} />
                }
                <Flipped flipId={props.pieceKey}>
                    <button onClick={() => this.setSelected(pieceName, props.square)}>
                        <img className={styles.piece} src={pieceImage} alt={pieceName} />
                    </button>
                </Flipped>
            </Fragment>
        );
    }
    if (props.moves.includes(props.square)) {
        pieceImage = circle;
        pieceName = 'circle';
        return (
            <button onClick={() => this.setSelected(pieceName, props.square)}>
                <img className={styles.piece} src={pieceImage} alt={pieceName} />
            </button>
        );
    }
    return null;
};

Piece.propTypes = {
    pieceKey: PropTypes.array,
    square: PropTypes.array,
    moves: PropTypes.array
};

export default Piece;
