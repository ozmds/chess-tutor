import React, { Component } from 'react';
import axios from 'axios';
import { Flipper } from 'react-flip-toolkit';

import Square from '../Square/Square';
import styles from './Board.module.css';
import { initBoard, updateBoard } from './board_helper';

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ranks: [8, 7, 6, 5, 4, 3, 2, 1],
            files: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
            fen: '',
            board: [],
            selected: '',
            moves: {
                possible: {},
                current: []
            }
        };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/chess/api/initboard').then((res) => {
            const moves = { ...this.state.moves };
            moves.possible = res.data.moves;
            this.setState({
                board: initBoard(res.data.fen),
                fen: res.data.fen,
                moves
            });
        });
    }

    selectSquare = (squareID) => {
        if (this.state.moves.current.includes(squareID)) {
            axios.put('http://localhost:5000/chess/api/updateboard', {
                fen: this.state.fen,
                move: this.state.selected + squareID
            }).then((res) => {
                const moves = { ...this.state.moves };
                moves.possible = res.data.moves;
                moves.current = [];
                this.setState({
                    board: updateBoard(res.data.fen, this.state.board),
                    fen: res.data.fen,
                    moves,
                    selected: ''
                }, () => setTimeout(this.computerMove, 1000));
            });
        } else {
            const moves = { ...this.state.moves };
            if (Object.keys(moves.possible).includes(squareID)) {
                moves.current = moves.possible[squareID];
            } else {
                moves.current = [];
            }
            this.setState({
                moves,
                selected: squareID
            });
        }
    }

    computerMove = () => {
        axios.put('http://localhost:5000/chess/api/cpumove', {
            fen: this.state.fen
        }).then((res) => {
            const moves = { ...this.state.moves };
            moves.possible = res.data.moves;
            moves.current = [];
            this.setState({
                board: updateBoard(res.data.fen, this.state.board),
                fen: res.data.fen,
                moves,
                selected: ''
            });
        });
    }

    render() {
        const { ranks, files } = this.state;
        return (
            <div className={styles.square}>
                <Flipper className={styles.content} flipKey={this.state.fen}>
                    {this.state.board.flat().map((piece, index) => {
                        const rindex = Math.floor(index / 8);
                        const findex = index % 8;
                        return (
                            <div key={files[findex] + ranks[rindex]} className={styles.tile}>
                                <div className={styles.innertile}>
                                    <Square
                                        pieceID={piece}
                                        squareID={files[findex] + ranks[rindex]}
                                        moves={this.state.moves.current}
                                        selectSquare={this.selectSquare}
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

export default Board;
