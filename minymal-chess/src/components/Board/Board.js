import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import initBoard from './scripts/initBoard';
import updateBoard from './scripts/updateBoard';
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
        if (this.props.restart) {
            this.props.setRestart(false, this.initBoard);
        }
        if (this.props.colour !== prevProps.colour) {
            const ranks = [...this.state.ranks];
            const files = [...this.state.files];
            ranks.reverse();
            files.reverse();
            this.setState({
                ranks,
                files,
                board: updateBoard(this.state.fen, this.state.board, this.props.colour)
            });
        }
    }

    initBoard = () => {
        axios.get('http://localhost:5000/chess/api/initboard').then((res) => {
            const moves = { ...this.state.moves };
            moves.possible = res.data.moves;
            this.props.setFen(res.data.fen);
            this.setState({
                board: initBoard(res.data.fen, this.props.colour),
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
                this.props.setFen(res.data.fen);
                this.setState({
                    board: updateBoard(res.data.fen, this.state.board, this.props.colour),
                    fen: res.data.fen,
                    moves,
                    selected: ''
                }, () => this.props.setGameOver(
                    res.data.game_over,
                    !res.data.game_over
                        ? () => setTimeout(this.computerMove, 1000)
                        : null
                ));
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
            this.props.setFen(res.data.fen);
            this.setState({
                board: updateBoard(res.data.fen, this.state.board, this.props.colour),
                fen: res.data.fen,
                moves,
                selected: ''
            }, () => this.props.setGameOver(res.data.game_over));
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
    setGameOver: PropTypes.func,
    restart: PropTypes.bool,
    setRestart: PropTypes.func,
    setFen: PropTypes.func,
    colour: PropTypes.string
};

export default Board;
