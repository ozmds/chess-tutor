import React, { Component } from 'react';
import Home from '../Screens/Home';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: '',
            gameOver: '',
            fen: '',
            level: '',
            colour: ''
        };
    }

    setFen = (fen) => {
        this.setState({ fen });
    }

    setModal = (modal) => {
        this.setState({ modal });
    }

    setGameOver = (gameOver) => {
        this.setState({ gameOver });
    }

    startGame = (colour, level) => {
        this.setState({ colour, level });
    }

    render() {
        return (
            <Home
                fen={this.state.fen}
                level={this.state.level}
                restart={this.state.restart}
                gameOver={this.state.gameOver}
                modal={this.state.modal}
                setFen={this.setFen}
                setModal={this.setModal}
                setRestart={this.setRestart}
                setGameOver={this.setGameOver}
                startGame={this.startGame}
            />
        );
    }
}

export default App;
