import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Flipper, Flipped } from 'react-flip-toolkit'
import './App.css';
import black_pawn from '../static/black_pawn.svg';
import black_bishop from '../static/black_bishop.svg';
import black_knight from '../static/black_knight.svg';
import black_rook from '../static/black_rook.svg';
import black_queen from '../static/black_queen.svg';
import black_king from '../static/black_king.svg';
import white_pawn from '../static/white_pawn.svg';
import white_bishop from '../static/white_bishop.svg';
import white_knight from '../static/white_knight.svg';
import white_rook from '../static/white_rook.svg';
import white_queen from '../static/white_queen.svg';
import white_king from '../static/white_king.svg';
import circle from '../static/circle.svg';
import rotate from '../static/rotate.svg';
import target_circle from '../static/target_circle.svg';

const pieces = [
    { key: 'p', image: black_pawn, name: 'black pawn'},
    { key: 'b', image: black_bishop, name: 'black bishop'},
    { key: 'n', image: black_knight, name: 'black knight'},
    { key: 'r', image: black_rook, name: 'black rook'},
    { key: 'q', image: black_queen, name: 'black queen'},
    { key: 'k', image: black_king, name: 'black king'},
    { key: 'P', image: white_pawn, name: 'white pawn'},
    { key: 'B', image: white_bishop, name: 'white bishop'},
    { key: 'N', image: white_knight, name: 'white knight'},
    { key: 'R', image: white_rook, name: 'white rook'},
    { key: 'Q', image: white_queen, name: 'white queen'},
    { key: 'K', image: white_king, name: 'white king'}
]


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            board: [],
            fen: '',
            playercolor: 'white',
            moves: [],
            selected: ''
        };
    }

    componentDidMount() {
        axios.get(`http://localhost:5000/api/initboard`).then((res) => {
            this.setState({
                board: res.data.board,
                fen: res.data.fen
            });
        });
    }

    switchPlayers = () => {
        this.setState({ playercolor: this.state.playercolor === 'white' ? 'black' : 'white'})
    }

    setSelected = (name, square) => {
        if (this.state.moves.includes(square)) {
            axios.put(`http://localhost:5000/api/updateboard`, {
                fen: this.state.fen, 
                move: this.state.selected + square,
                board: this.state.board
            }).then((res) => {
                this.setState({
                    board: res.data.board,
                    fen: res.data.fen,
                    moves : [],
                    selected : ''
                });
            });
        } else {
            axios.put(`http://localhost:5000/api/movelist`, {
                fen: this.state.fen, 
                square: square
            }).then((res) => {
                this.setState({ 
                    moves: res.data,
                    selected : square
                });
            });
        }
    }

    displayBoard = () => {
        let ranks = [8, 7, 6, 5, 4, 3, 2, 1];
        let files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
        let board = this.state.board;
        if (this.state.playercolor === 'black') {
            ranks = ranks.reverse();
            files = files.reverse();
            board = [...board].map(rank => rank.reverse()).reverse();
        }
        return board.flat().map((piece, index) => {
            const rindex = Math.floor(index / 8); 
            const findex = index % 8;
            return (
                <div key={files[findex] + ranks[rindex]} className="tile">
                    <div className="innertile">
                        {this.displayPiece(piece, files[findex] + ranks[rindex])}
                    </div>
                </div>
            )
        });
    }

    displayPiece = (pieceKey, square) => {
        let pieceImage, pieceName;
        if (pieceKey !== null) {
            pieceImage = pieces.filter((piece) => piece.key === pieceKey[0])[0].image;
            pieceName = pieces.filter((piece) => piece.key === pieceKey[0])[0].name;
            return (
                <Fragment>
                    {this.state.moves.includes(square) &&
                        <img className="targetcircle" src={target_circle} alt={'target circle'} />
                    }
                    <Flipped flipId={pieceKey}>
                        <button onClick={() => this.setSelected(pieceName, square)}>
                            <img className="piece" src={pieceImage} alt={pieceName} />
                        </button>
                    </Flipped>
                </Fragment>
            )
        } else if (this.state.moves.includes(square)) {
            pieceImage = circle;
            pieceName = 'circle';
            return (
                <button onClick={() => this.setSelected(pieceName, square)}>
                    <img className="piece" src={pieceImage} alt={pieceName} />
                </button>
            )
        }
    }

    orientBoard = () => {
        if (this.state.playercolor === 'black') {
            return [...this.state.board].map(rank => rank.reverse()).reverse();
        }
        return this.state.board;
    }

    render() {
        console.log(this.state.fen);
        return (
            <div className="App">
                <div className="square">
                    <Flipper className="content" flipKey={this.state.fen}>
                        {this.displayBoard()}
                    </Flipper>
                </div>
                <button onClick={this.switchPlayers}>
                    <img className="rotate" src={rotate} alt="chess piece" />
                </button>
            </div>
        );
    }
}

export default App;
