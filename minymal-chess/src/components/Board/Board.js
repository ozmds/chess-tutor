import React, { Component } from 'react';
import { Flipper } from 'react-flip-toolkit';
import PropTypes from 'prop-types';

import styles from './Board.module.css';
import Piece from '../Piece/Piece';

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ranks: [8, 7, 6, 5, 4, 3, 2, 1],
            files: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
        };
    }

    render() {
        return (
            <div className={styles.square}>
                <Flipper className={styles.content} flipKey={this.state.fen}>
                    {this.props.board.flat().map((piece, index) => {
                        const rindex = Math.floor(index / 8);
                        const findex = index % 8;
                        return (
                            <div key={this.state.files[findex] + this.state.ranks[rindex]} className={styles.tile}>
                                <div className={styles.innertile}>
                                    <Piece
                                        pieceKey={piece}
                                        square={this.state.files[findex] + this.state.ranks[rindex]}
                                        moves={this.props.moves}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </Flipper>
            </div>
        );
    }
}

Board.propTypes = {
    board: PropTypes.array,
    moves: PropTypes.array
};

export default Board;
