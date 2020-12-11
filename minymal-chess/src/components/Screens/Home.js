import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Board from '../Board/Board';
import RestartModal from './RestartModal';
import StartModal from './StartModal';
import Header from '../Header/Header';

const StyledHome = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    min-height: 100vh;
    font-family: 'Redressed', serif;
    font-size: 1rem;
`;

const Home = (props) => (
    <StyledHome>
        <Header
            moveCount={props.moveCount}
            level={props.level}
        />
        <Board
            gameOver={props.gameOver}
            setGameOver={props.setGameOver}
            level={props.level}
            playerColour={props.playerColour}
            setMoveCount={props.setMoveCount}
        />
        <button id={'restart'} className='btn btn-primary' onClick={() => props.setGameOver('restart')}>
            {'Restart Game'}
        </button>
        {['player', 'computer', 'draw', 'restart'].includes(props.gameOver)
            && <RestartModal
                gameOver={props.gameOver}
                onClose={() => props.setGameOver('')}
                restartGame={() => props.setGameOver('start')}
            />
        }
        {['start'].includes(props.gameOver)
            && <StartModal
                onClose={() => props.setGameOver('')}
                startGame={props.startGame}
            />
        }
    </StyledHome>
);

Home.propTypes = {
    moveCount: PropTypes.number.isRequired,
    setMoveCount: PropTypes.func.isRequired,
    gameOver: PropTypes.oneOf(['player', 'computer', 'draw', 'restart', 'start', '']).isRequired,
    setGameOver: PropTypes.func.isRequired,
    level: PropTypes.number.isRequired,
    playerColour: PropTypes.oneOf(['white', 'black']).isRequired,
    startGame: PropTypes.func.isRequired
};

export default Home;
