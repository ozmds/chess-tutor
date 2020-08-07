import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Flipper, Flipped } from 'react-flip-toolkit';
import './App.css';
import blackPawn from '../static/black_pawn.svg';
import blackBishop from '../static/black_bishop.svg';
import blackKnight from '../static/black_knight.svg';
import blackRook from '../static/black_rook.svg';
import blackQueen from '../static/black_queen.svg';
import blackKing from '../static/black_king.svg';
import whitePawn from '../static/white_pawn.svg';
import whiteBishop from '../static/white_bishop.svg';
import whiteKnight from '../static/white_knight.svg';
import whiteRook from '../static/white_rook.svg';
import whiteQueen from '../static/white_queen.svg';
import whiteKing from '../static/white_king.svg';
import circle from '../static/circle.svg';
import rotate from '../static/rotate.svg';
import targetCircle from '../static/target_circle.svg';

const pieces = [
    { key: 'p', image: blackPawn, name: 'black pawn' },
    { key: 'b', image: blackBishop, name: 'black bishop' },
    { key: 'n', image: blackKnight, name: 'black knight' },
    { key: 'r', image: blackRook, name: 'black rook' },
    { key: 'q', image: blackQueen, name: 'black queen' },
    { key: 'k', image: blackKing, name: 'black king' },
    { key: 'P', image: whitePawn, name: 'white pawn' },
    { key: 'B', image: whiteBishop, name: 'white bishop' },
    { key: 'N', image: whiteKnight, name: 'white knight' },
    { key: 'R', image: whiteRook, name: 'white rook' },
    { key: 'Q', image: whiteQueen, name: 'white queen' },
    { key: 'K', image: whiteKing, name: 'white king' }
];

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
        axios.get('http://localhost:5000/api/initboard').then((res) => {
            this.setState({
                board: res.data.board,
                fen: res.data.fen
            });
        });
    }

    switchPlayers = () => {
        this.setState({ playercolor: this.state.playercolor === 'white' ? 'black' : 'white' });
    }

    setSelected = (name, square) => {
        if (this.state.moves.includes(square)) {
            axios.put('http://localhost:5000/api/updateboard', {
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
            axios.put('http://localhost:5000/api/movelist', {
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

    displayBoard = () => {
        let ranks = [8, 7, 6, 5, 4, 3, 2, 1];
        let files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
        let { board } = this.state;
        if (this.state.playercolor === 'black') {
            ranks = ranks.reverse();
            files = files.reverse();
            board = [...board].map((rank) => rank.reverse()).reverse();
        }
        return board.flat().map((piece, index) => {
            const rindex = Math.floor(index / 8);
            const findex = index % 8;
            return (
                <div key={files[findex] + ranks[rindex]} className='tile'>
                    <div className='innertile'>
                        {this.displayPiece(piece, files[findex] + ranks[rindex])}
                    </div>
                </div>
            );
        });
    }

    displayPiece = (pieceKey, square) => {
        let pieceImage; let
            pieceName;
        if (pieceKey !== null) {
            pieceImage = pieces.filter((piece) => piece.key === pieceKey[0])[0].image;
            pieceName = pieces.filter((piece) => piece.key === pieceKey[0])[0].name;
            return (
                <Fragment>
                    {this.state.moves.includes(square)
                        && <img className='targetcircle' src={targetCircle} alt={'target circle'} />
                    }
                    <Flipped flipId={pieceKey}>
                        <button onClick={() => this.setSelected(pieceName, square)}>
                            <img className='piece' src={pieceImage} alt={pieceName} />
                        </button>
                    </Flipped>
                </Fragment>
            );
        }
        if (this.state.moves.includes(square)) {
            pieceImage = circle;
            pieceName = 'circle';
            return (
                <button onClick={() => this.setSelected(pieceName, square)}>
                    <img className='piece' src={pieceImage} alt={pieceName} />
                </button>
            );
        }
        return null;
    }

    orientBoard = () => {
        if (this.state.playercolor === 'black') {
            return [...this.state.board].map((rank) => rank.reverse()).reverse();
        }
        return this.state.board;
    }

    render() {
        return (
            <div className='App'>
                <div className='square'>
                    <Flipper className='content' flipKey={this.state.fen}>
                        {this.displayBoard()}
                    </Flipper>
                </div>
                <button onClick={this.switchPlayers}>
                    <img className='rotate' src={rotate} alt='chess piece' />
                </button>
            </div>
        );
    }
}

export default App;
