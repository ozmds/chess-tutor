import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Board from '../Board/Board';
import StartModal from './StartModal';
import Header from '../Header/Header';
import { Button } from '../core/Button';
import Modal from '../core/Modal';
import getMessage from '../../scripts/getMessage';

const Container = styled.div`
    min-height: 100vh;    
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    @media (max-width: 415px) {
        justify-content: space-evenly;
    }
    font-family: 'Redressed', serif;
    font-size: 1rem;
`;

const Home = (props) => (
    <Container>
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
        <Button colour={'#A8B0D1'} id={'restart'} onClick={() => props.setGamePaused('restart')}>
            {'Restart Game'}
        </Button>
        {props.gamePaused.startsWith('gameover')
            && <Modal
                id={'restart-modal'}
                header={props.gamePaused.replace('gameover_', '') ? 'Game Over' : 'Restart'}
                onClose={() => props.setGamePaused('start')}
                action={() => props.setGamePaused('start')}
                actionText={'Restart Game'}
            >
                {getMessage(props.gamePaused.replace('gameover_', ''))}
            </Modal>
        }
        {props.gamePaused === 'restart'
            && <Modal
                id={'restart-modal'}
                header={props.gamePaused ? 'Game Over' : 'Restart'}
                onClose={() => props.setGamePaused('')}
                action={() => props.setGamePaused('start')}
                actionText={'Restart Game'}
            >
                {getMessage(props.gamePaused)}
            </Modal>
        }
        {props.gamePaused === 'start'
            && <StartModal
                onClose={() => props.setGamePaused('')}
                startGame={props.startGame}
            />
        }
        {props.welcome === true
            && <Modal
                id={'welcome-modal'}
                header={'Welcome to Minimalist Chess'}
                onClose={() => props.setWelcome(false)}
                action={() => props.setWelcome(false)}
                actionText={"Let's Start"}
            >
                {"We believe that the way to get better at anything is to just do it, and \
                chess is no different. So what we've created a game of chess that will give you helpful indicators \
                about how you can improve your game, all while you are playing an actual games. No puzzle, no hypotheticals. \
                Get ready to be a better chess player, we hope it doesn't go to your head."}
            </Modal>
        }
    </Container>
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
