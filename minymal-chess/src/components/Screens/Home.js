import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Board from '../Board/Board';
import RestartModal from './RestartModal';
import StartModal from './StartModal';
import WelcomeModal from './WelcomeModal';
import Header from '../Header/Header';

const StyledHome = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    min-height: 100vh;
    font-family: 'Redressed', serif;
    font-size: 1rem;
    @media (max-width: 415px) {
        justify-content: space-evenly;
    }
`;

const Home = (props) => (
    <StyledHome>
        <Header
            moveCount={props.moveCount}
            level={props.level}
        />
        <Board
            gamePaused={props.gamePaused}
            setGamePaused={props.setGamePaused}
            level={props.level}
            playerColour={props.playerColour}
            setMoveCount={props.setMoveCount}
        />
        <button id={'restart'} className='btn btn-primary' onClick={() => props.setGamePaused('restart')}>
            {'Restart Game'}
        </button>
        {props.gamePaused.startsWith('gameover')
            && <RestartModal
                gameOver={props.gamePaused.replace('gameover_', '')}
                onClose={() => props.setGamePaused('start')}
                restartGame={() => props.setGamePaused('start')}
            />
        }
        {props.gamePaused === 'restart'
            && <RestartModal
                gameOver={props.gamePaused}
                onClose={() => props.setGamePaused('')}
                restartGame={() => props.setGamePaused('start')}
            />
        }
        {props.gamePaused === 'start'
            && <StartModal
                onClose={() => props.setGamePaused('')}
                startGame={props.startGame}
            />
        }
        {props.welcome === true
            && <WelcomeModal
                onClose={() => props.setWelcome(false)}
            />
        }
    </StyledHome>
);

Home.propTypes = {
    moveCount: PropTypes.number.isRequired,
    setMoveCount: PropTypes.func.isRequired,
    gamePaused: PropTypes.oneOf([
        'gameover_player', 'gameover_computer', 'gameover_draw', 'restart', 'start', ''
    ]).isRequired,
    setGamePaused: PropTypes.func.isRequired,
    level: PropTypes.number.isRequired,
    playerColour: PropTypes.oneOf(['white', 'black']).isRequired,
    startGame: PropTypes.func.isRequired,
    welcome: PropTypes.bool.isRequired,
    setWelcome: PropTypes.func.isRequired
};

export default Home;
