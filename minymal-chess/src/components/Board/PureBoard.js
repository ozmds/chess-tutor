import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Flipper } from 'react-flip-toolkit';
import PropTypes from 'prop-types';

import Square from '../Square/Square';

const StyledBoardSection = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    width: 100%;
`;

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

class PureBoard extends PureComponent {
    render() {
        const { ranks, files } = this.props;
        return (
            <StyledBoardSection>
                <StyledSquare id={'board'}>
                    <StyledFlipper flipKey={`${this.props.fen}${this.props.files.join('')}`}>
                        {this.props.board.flat().map((piece, index) => {
                            const rindex = Math.floor(index / 8);
                            const findex = index % 8;
                            return (
                                <Square
                                    key={index}
                                    pieceID={piece}
                                    squareID={files[findex] + ranks[rindex]}
                                    moves={this.props.moves.current}
                                    selectSquare={this.props.selectSquare}
                                />
                            );
                        })}
                    </StyledFlipper>
                </StyledSquare>
            </StyledBoardSection>
        );
    }
}

PureBoard.propTypes = {
    fen: PropTypes.string.isRequired,
    ranks: PropTypes.arrayOf(PropTypes.number).isRequired,
    files: PropTypes.arrayOf(PropTypes.string).isRequired,
    board: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
    moves: PropTypes.exact({
        possible: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
        current: PropTypes.arrayOf(PropTypes.string).isRequired
    }),
    selectSquare: PropTypes.func.isRequired
};

export default PureBoard;
