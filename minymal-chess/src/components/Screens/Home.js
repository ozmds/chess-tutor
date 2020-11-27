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
            fen={props.fen}
            level={props.level}
        />
        <Board
            setGameOver={props.setGameOver}
            restart={props.restart}
            setRestart={props.setRestart}
            setFen={props.setFen}
        />
        <button className='btn btn-primary' onClick={() => props.setModal('restart')}>
            {'Restart Game'}
        </button>
        {props.modal === 'restart'
            && <RestartModal
                gameOver={props.gameOver}
                setModal={props.setModal}
            />
        }
        {props.modal === 'start'
            && <StartModal
                gameOver={props.gameOver}
                setModal={props.setModal}
                startGame={props.startGame}
            />
        }
    </StyledHome>
);

Home.propTypes = {
    fen: PropTypes.string,
    level: PropTypes.string,
    restart: PropTypes.string,
    gameOver: PropTypes.string,
    modal: PropTypes.string,
    setFen: PropTypes.func,
    setModal: PropTypes.func,
    setRestart: PropTypes.func,
    setGameOver: PropTypes.func,
    startGame: PropTypes.func
};

export default Home;
