import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Board from '../Board/Board';
import RestartModal from './RestartModal';
import StartModal from './StartModal';
import WelcomeModal from './WelcomeModal';
import Header from '../Header/Header';
import StyledHome from './styled';

const StyledButton = styled.button`
    background: none;
    color: inherit;
    border: 1px solid black;
    border-radius: 1rem;
    padding: 1rem;
    font: inherit;
    cursor: pointer;
    outline: none !important;
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
        <StyledButton id={'restart'} onClick={() => props.setGamePaused('restart')}>
            {'Restart Game'}
        </StyledButton>
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
