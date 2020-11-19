import React, { Component } from 'react';
import styled from 'styled-components';

import Board from '../Board/Board';
import RestartModal from '../RestartModal/RestartModal';

const StyledApp = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100vh;
    font-family: 'Redressed', serif;
    font-size: 1rem;
`;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gameOver: false
        };
    }

    setGameOver = (gameOver, callback = null) => {
        if (gameOver) {
            this.setState({ gameOver });
        } else {
            this.setState({ gameOver }, callback);
        }
    }

    render() {
        return (
            <StyledApp>
                <h1>{'Chess Tutor'}</h1>
                <Board
                    setGameOver={this.setGameOver}
                />
                <button className='btn btn-primary'>
                    {'Restart Game'}
                </button>
                {this.state.gameOver
                    && <RestartModal
                        header={'Game Over'}
                        message={'The CPU won the game this time. Try again?'}
                    />
                }
            </StyledApp>
        );
    }
}

export default App;
