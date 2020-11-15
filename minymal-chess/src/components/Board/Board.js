import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Flipper } from 'react-flip-toolkit';

import Square from '../Square/Square';
import { initBoard, updateBoard } from './board_helper';

const StyledSquare = styled.div`
    position: relative;
    width: 80%;
    max-width: 60vh;
    border: 1px solid black;
    margin: 1rem;
    background-color: #696969;
    &:after {
        content: "";
        display: block;
        padding-bottom: 100%;
    }
`;

const StyledTile = styled.div`
    width: 12.5%;
    height: 12.5%;
    position: relative;
    padding: 0.125rem;
`;

const StyledInnerTile = styled.div`
    border: 1px solid black;
    height: 100%;
    width: 100%;
    background-color: cornsilk;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
`;

const StyledFlipper = styled(Flipper)`
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    padding: 0.125rem;
    flex-wrap: wrap;
`;

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
            <StyledSquare>
                <StyledFlipper flipKey={this.state.fen}>
                    {this.state.board.flat().map((piece, index) => {
                        const rindex = Math.floor(index / 8);
                        const findex = index % 8;
                        return (
                            <StyledTile key={files[findex] + ranks[rindex]}>
                                <StyledInnerTile>
                                    <Square
                                        pieceID={piece}
                                        squareID={files[findex] + ranks[rindex]}
                                        moves={this.state.moves.current}
                                        selectSquare={this.selectSquare}
                                    />
                                </StyledInnerTile>
                            </StyledTile>
                        );
                    })}
                </StyledFlipper>
            </StyledSquare>
        );
    }
}

export default Board;
