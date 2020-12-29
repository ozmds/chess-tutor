import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Flipper } from 'react-flip-toolkit';

import Square from '../Square/Square';

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    width: 100%;
`;

const Container = styled.div`
    position: relative;
    width: 100%;
    max-width: 60vh;
    margin-top: 1rem;
    margin-bottom: 1rem;
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
    @media (max-width: 415px) {
        padding: 0rem;
    }
`;

class PureBoard extends PureComponent {
    render() {
        const { ranks, files } = this.props;
        return (
            <Wrapper>
                <Container id={'board'}>
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
                </Container>
            </Wrapper>
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
