import React, { Component } from 'react';
import axios from 'axios';

import styles from './App.module.css';
import Board from '../Board/Board';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            board: [],
            fen: '',
            moves: [],
            selected: ''
        };
    }

    componentDidMount() {
        axios.get('https://athavan.dev/chess/api/initboard').then((res) => {
            this.setState({
                board: res.data.board,
                fen: res.data.fen
            });
        });
    }

    setSelected = (name, square) => {
        if (this.state.moves.includes(square)) {
            axios.put('https://athavan.dev/chess/api/updateboard', {
                fen: this.state.fen,
                move: this.state.selected + square,
                board: this.state.board
            }).then((res) => {
                this.setState({
                    board: res.data.board,
                    fen: res.data.fen,
                    moves: [],
                    selected: ''
                });
            });
        } else {
            axios.put('https://athavan.dev/chess/api/movelist', {
                fen: this.state.fen,
                square
            }).then((res) => {
                this.setState({
                    moves: res.data,
                    selected: square
                });
            });
        }
    }

    render() {
        return (
            <div className={styles.app}>
                <Board board={this.state.board} moves={this.state.moves} />
            </div>
        );
    }
}

export default App;
