import React, { Component, Fragment } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import initBoard from './scripts/initBoard';
import updateBoard from './scripts/updateBoard';
import { getMoveCountFromFen } from './scripts/boardConversion';
import PureBoard from './PureBoard';
import PawnPromotionModal from '../Screens/PawnPromotionModal';

const PROD_URL = 'https://minymal.app';
/* const DEV_URL = 'http://localhost:5000'; */
const API_URL = PROD_URL;

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ranks: [8, 7, 6, 5, 4, 3, 2, 1],
            files: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
            fen: '',
            fenList: [],
            board: [],
            selected: {
                square: '',
                piece: ''
            },
            moves: {
                possible: {},
                current: []
            },
            promotedSquare: ''
        };
    }

    componentDidMount() {
        this.initBoard(this.props.playerColour);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.gamePaused === 'start' && this.props.gamePaused === '') {
            this.initBoard(this.props.playerColour);
        }
    }

    initBoard = (playerColour) => {
        axios.get(`${API_URL}/chess/api/initboard`).then((res) => {
            const ranks = [...this.state.ranks];
            const files = [...this.state.files];
            if (playerColour === 'black') {
                ranks.reverse();
                files.reverse();
            }
            this.setState({
                board: initBoard(res.data.fen, this.props.playerColour),
                fen: res.data.fen,
                fenList: [res.data.fen],
                moves: {
                    possible: res.data.moves,
                    current: []
                },
                selected: {
                    square: '',
                    piece: ''
                },
                ranks,
                files
            }, playerColour === 'black' ? () => setTimeout(this.computerMove, 1000) : null);
        });
    }

    pieceIsPromotablePawn = (squareID) => {
        if (this.state.selected.piece.toUpperCase() === 'P') {
            if (squareID[1] === '1' || squareID[1] === '8') {
                return true;
            }
        }
        return false;
    }

    selectSquare = (squareID, pieceID = '') => {
        if (this.state.moves.current.includes(squareID)) {
            if (this.pieceIsPromotablePawn(squareID)) {
                this.setState({
                    promotedSquare: squareID
                });
            } else {
                this.updateGameStateWithPlayerMove(squareID);
            }
        } else {
            this.updateCurrentPieceAvailableMoves(squareID, pieceID);
        }
    }

    updateCurrentPieceAvailableMoves = (squareID, piece) => {
        const moves = { ...this.state.moves };
        if (Object.keys(moves.possible).includes(squareID)) {
            moves.current = moves.possible[squareID];
        } else {
            moves.current = [];
        }
        this.setState({
            moves,
            selected: {
                square: squareID,
                piece
            }
        });
    }

    updateGameStateWithPlayerMove = (squareID, promotedPiece = '') => {
        axios.put(`${API_URL}/chess/api/updateboard`, {
            fen: this.state.fen,
            move: this.state.selected.square + squareID + promotedPiece.toLowerCase()
        }).then((res) => {
            this.updateBoard(res.data.fen, res.data.game_over, null, true);
        });
    }

    computerMove = () => {
        axios.put(`${API_URL}/chess/api/cpumove`, {
            fen: this.state.fen
        }).then((res) => {
            this.updateBoard(res.data.fen, res.data.game_over, res.data.moves);
        });
    }

    updateBoard = (fen, gameOver, possibleMoves, player = false) => {
        this.props.setMoveCount(getMoveCountFromFen(fen));
        const fenList = [...this.state.fenList];
        fenList.push(fen);
        this.setState({
            board: updateBoard(fen, this.state.board, this.props.playerColour),
            fen,
            fenList,
            moves: {
                current: [],
                possible: possibleMoves !== null ? possibleMoves : {}
            },
            selected: {
                square: '',
                piece: ''
            }
        }, () => this.checkGameOver(gameOver, player));
    }

    checkGameOver = (gameOver, player) => {
        if (gameOver !== '') {
            this.props.setGamePaused(`gameover_${gameOver}`);
        } else if (player === true) {
            setTimeout(this.computerMove, 1000);
        }
    }

    promotePawn = (piece) => {
        const { promotedSquare } = this.state;
        this.setState({
            promotedSquare: ''
        }, () => this.updateGameStateWithPlayerMove(promotedSquare, piece));
    }

    render() {
        return (
            <Fragment>
                <PureBoard
                    ranks={this.state.ranks}
                    files={this.state.files}
                    fen={this.state.fen}
                    board={this.state.board}
                    moves={this.state.moves}
                    selectSquare={this.selectSquare}
                />
                {this.state.promotedSquare !== ''
                    && <PawnPromotionModal
                        playerColour={this.props.playerColour}
                        promotePawn={this.promotePawn}
                    />
                }
            </Fragment>
        );
    }
}

Board.propTypes = {
    playerColour: PropTypes.oneOf(['white', 'black']).isRequired,
    gamePaused: PropTypes.oneOf([
        'restart', 'start', 'gameover_player', 'gameover_computer', 'gameover_draw', ''
    ]).isRequired,
    setGamePaused: PropTypes.func.isRequired,
    level: PropTypes.number.isRequired,
    setMoveCount: PropTypes.func.isRequired
};

export default Board;
