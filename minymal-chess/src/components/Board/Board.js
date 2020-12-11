import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import initBoard from './scripts/initBoard';
import updateBoard from './scripts/updateBoard';
import { getMoveCountFromFen } from './scripts/boardConversion';
import PureBoard from './PureBoard';

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
        this.initBoard();
    }

    componentDidUpdate(prevProps) {
        if (this.props.gameOver === 'start') {
            if (this.props.playerColour === 'white') {
                this.initBoard();
            } else {
                this.initBoard(this.computerMove);
            }
        }
        if (this.props.playerColour !== prevProps.playerColour) {
            this.reverseBoard();
        }
    }

    reverseBoard = () => {
        const ranks = [...this.state.ranks];
        const files = [...this.state.files];
        ranks.reverse();
        files.reverse();
        this.setState({
            ranks,
            files,
            board: updateBoard(this.state.fen, this.state.board, this.props.playerColour)
        });
    }

    initBoard = (callback = null) => {
        axios.get('http://localhost:5000/chess/api/initboard').then((res) => {
            const moves = { ...this.state.moves };
            moves.possible = res.data.moves;
            this.setState({
                board: initBoard(res.data.fen, this.props.playerColour),
                fen: res.data.fen,
                moves
            }, callback);
        });
    }

    setGameOver = (gameOver, callback = null) => {
        if (gameOver !== '') {
            this.props.setGameOver(gameOver, callback);
        }
    }

    selectSquare = (squareID) => {
        if (this.state.moves.current.includes(squareID)) {
            axios.put('http://localhost:5000/chess/api/updateboard', {
                fen: this.state.fen,
                move: this.state.selected + squareID
            }).then((res) => {
                this.updateBoard(
                    res.data.fen,
                    res.data.game_over,
                    null,
                    () => setTimeout(this.computerMove, 1000)
                );
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

    updateBoard = (fen, gameOver, moves = null, callback = null) => {
        const newMoves = { ...this.state.moves };
        newMoves.possible = {};
        newMoves.current = [];
        if (moves === null) {
            newMoves.possible = moves;
        }
        this.props.setMoveCount(getMoveCountFromFen(fen));
        this.setState({
            board: updateBoard(fen, this.state.board, this.props.playerColour),
            fen,
            moves: newMoves,
            selected: ''
        }, () => this.setGameOver(gameOver, callback));
    }

    computerMove = () => {
        axios.put('http://localhost:5000/chess/api/cpumove', {
            fen: this.state.fen
        }).then((res) => {
            this.updateBoard(res.data.fen, res.data.game_over, res.data.moves, null);
        });
    }

    render() {
        return (
            <PureBoard
                ranks={this.state.ranks}
                files={this.state.files}
                fen={this.state.fen}
                board={this.state.board}
                moves={this.state.moves}
                selectSquare={this.selectSquare}
            />
        );
    }
}

Board.propTypes = {
    playerColour: PropTypes.oneOf(['white', 'black']).isRequired,
    gameOver: PropTypes.oneOf(['restart', 'start', 'player', 'computer', 'draw', '']).isRequired,
    setGameOver: PropTypes.func.isRequired,
    level: PropTypes.number.isRequired,
    setMoveCount: PropTypes.func.isRequired
};

export default Board;
