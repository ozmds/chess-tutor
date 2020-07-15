import React, { Component } from 'react';
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

const default_board = [
    ['r',  'n',  'b',  'q',  'k',  'b',  'n',  'r' ],
    ['p',  'p',  'p',  'p',  'p',  'p',  'p',  'p',],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    ['P',  'P',  'P',  'P',  'P',  'P',  'P',  'P' ],
    ['R',  'N',  'B',  'Q',  'K',  'B',  'N',  'R' ]
]

const piece_mapping = {
    p: black_pawn,
    b: black_bishop,
    n: black_knight,
    r: black_rook,
    q: black_queen,
    k: black_king,
    P: white_pawn,
    B: white_bishop,
    N: white_knight,
    R: white_rook,
    Q: white_queen,
    K: white_king
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rank: [8, 7, 6, 5, 4, 3, 2, 1],
            file: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
            board: this.reverseBoard(default_board),
            mapping: piece_mapping
        };
    }

    reverseBoard = (board) => {
        return [...board].map(rank => rank.reverse()).reverse();
    }

    displayPiece = (rindex, findex) => {
        const pieceCharacter = this.state.board[rindex][findex];
        if (pieceCharacter !== null) {
            const pieceImage = this.state.mapping[pieceCharacter];
            return (
                <img class="piece" src={pieceImage} alt="chess piece" />
            )
        }
    }

    render() {
        return (
            <div className="App">
                <div class="square">
                    <div class="content">
                        {this.state.rank.map((rank, rindex) => (
                            this.state.file.map((file, findex) => (
                                <div data-location={file + rank} class="tile">
                                    <div class="innertile">
                                        {this.displayPiece(rindex, findex)}
                                    </div>
                                </div>
                            ))
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
