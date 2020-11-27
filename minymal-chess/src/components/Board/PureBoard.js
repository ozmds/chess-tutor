import React from 'react';
import styled from 'styled-components';
import { Flipper } from 'react-flip-toolkit';
import PropTypes from 'prop-types';

import Square from '../Square/Square';

const StyledSquare = styled.div`
    position: relative;
    width: 80%;
    max-width: 60vh;
    min-width: 35rem;
    margin: 1rem;
    background-color: #696969;
    &:after {
        content: "";
        display: block;
        padding-bottom: 100%;
    }
`;

const StyledFlipper = styled(Flipper)`
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    padding: 0.75rem;
    flex-wrap: wrap;
`;

const StyledBoardSection = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    width: 100%;
`;

const PureBoard = (props) => {
    const { ranks, files } = props;
    return (
        <StyledBoardSection>
            <StyledSquare>
                <StyledFlipper flipKey={props.fen}>
                    {props.board.flat().map((piece, index) => {
                        const rindex = Math.floor(index / 8);
                        const findex = index % 8;
                        return (
                            <Square
                                id={index}
                                key={files[findex] + ranks[rindex]}
                                pieceID={piece}
                                squareID={files[findex] + ranks[rindex]}
                                moves={props.moves.current}
                                selectSquare={props.selectSquare}
                            />
                        );
                    })}
                </StyledFlipper>
            </StyledSquare>
        </StyledBoardSection>
    );
};

PureBoard.propTypes = {
    ranks: PropTypes.array,
    files: PropTypes.array,
    fen: PropTypes.string,
    board: PropTypes.array,
    moves: PropTypes.object,
    selectSquare: PropTypes.func
};

export default PureBoard;
