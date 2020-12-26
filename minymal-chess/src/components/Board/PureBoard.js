import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Square from '../Square/Square';
import { StyledBoardSection, StyledSquare, StyledFlipper } from './styled';

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
