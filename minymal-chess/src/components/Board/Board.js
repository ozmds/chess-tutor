import React, { Component, Fragment } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Flipper } from 'react-flip-toolkit';
import PropTypes from 'prop-types';

import Square from '../Square/Square';
import { initBoard, updateBoard } from './board_helper';

const isLightTile = (id, rowLength) => (Math.floor(id / rowLength) % 2 === 0 && id % 2 === 0) || (Math.floor(id / rowLength) % 2 === 1 && id % 2 === 1);

const StyledSquare = styled.div`
    position: relative;
    width: 80%;
    max-width: 60vh;
    margin: 1rem;
    background-color: #696969;
    &:after {
        content: "";
        display: block;
        padding-bottom: 100%;
    }
`;

const StyledCaptureSquare = styled.div`
    position: relative;
    width: 80%;
    max-width: 15vh;
    margin: 1rem;
    background-color: #696969;
    &:after {
        content: "";
        display: block;
        padding-bottom: 400%;
    }
`;

const StyledTile = styled.div`
    width: 12.5%;
    height: 12.5%;
    position: relative;
    background-color: ${props => isLightTile(props.id, 8) ? 'cornsilk' : '#b5721d' };
    display: flex;
    align-items: center;
    justify-content: center;
`;

const StyledCaptureTile = styled.div`
    width: 50%;
    height: 12.5%;
    position: relative;
    background-color: ${props => isLightTile(props.id, 2) ? 'cornsilk' : '#b5721d' };
    display: flex;
    align-items: center;
    justify-content: center;
`;

const StyledContainer = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    padding: 0.75rem;
    flex-wrap: wrap;
`;

const StyledFlipper = styled(Flipper)`
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    padding: 0.75rem;
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
                }, () => this.props.setGameOver(
                    res.data.game_over,
                    () => setTimeout(this.computerMove, 1000)
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
            this.setState({
                board: updateBoard(res.data.fen, this.state.board),
                fen: res.data.fen,
                moves,
                selected: ''
            }, () => this.props.setGameOver(res.data.game_over));
        });
    }

    render() {
        const { ranks, files } = this.state;
        return (
            <Fragment>
                <StyledCaptureSquare>
                    <StyledContainer>
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((piece) => (
                            <StyledCaptureTile key={piece} id={piece}>
                                <Square
                                    pieceID={'K1'}
                                    squareID={files[0] + ranks[0]}
                                    moves={this.state.moves.current}
                                    selectSquare={this.selectSquare}
                                />
                            </StyledCaptureTile>
                        ))}
                    </StyledContainer>
                </StyledCaptureSquare>
                <StyledSquare>
                    <StyledFlipper flipKey={this.state.fen}>
                        {this.state.board.flat().map((piece, index) => {
                            const rindex = Math.floor(index / 8);
                            const findex = index % 8;
                            return (
                                <StyledTile id={index} key={files[findex] + ranks[rindex]}>
                                    <Square
                                        pieceID={piece}
                                        squareID={files[findex] + ranks[rindex]}
                                        moves={this.state.moves.current}
                                        selectSquare={this.selectSquare}
                                    />
                                </StyledTile>
                            );
                        })}
                    </StyledFlipper>
                </StyledSquare>
                <StyledCaptureSquare>
                    <StyledContainer>
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((piece) => (
                            <StyledCaptureTile key={piece} id={piece}>
                                <Square
                                    pieceID={'K1'}
                                    squareID={files[0] + ranks[0]}
                                    moves={this.state.moves.current}
                                    selectSquare={this.selectSquare}
                                />
                            </StyledCaptureTile>
                        ))}
                    </StyledContainer>
                </StyledCaptureSquare>
            </Fragment>
        );
    }
}

Board.propTypes = {
    setGameOver: PropTypes.func
};

export default Board;
