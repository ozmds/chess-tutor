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

const StyledBoardSection = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    width: 100%;
`;

const ScoreBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: row;
    width: 80%;
    max-width: 60vh;
`;

const PlayerScore = styled.div`
    border: 0.25rem solid #696969;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
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
                <h1>{'Chess Mirror'}</h1>
                <ScoreBox>
                    <PlayerScore>
                        <h3>{'White'}</h3>
                        <h3>29</h3>
                    </PlayerScore>
                    <h1>1 - 0</h1>
                    <PlayerScore>
                        <h3>{'Black'}</h3>
                        <h3>29</h3>
                    </PlayerScore>
                </ScoreBox>
                <StyledBoardSection>
                    <Board
                        setGameOver={this.setGameOver}
                    />
                </StyledBoardSection>
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
