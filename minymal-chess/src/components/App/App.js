import React, { Component } from 'react';
import Home from '../Screens/Home';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gameOver: '',
            level: 1,
            playerColour: 'white',
            moveCount: 1
        };
    }

    setMoveCount = (moveCount) => {
        this.setState({ moveCount });
    }

    setGameOver = (gameOver, callback = null) => {
        this.setState({ gameOver }, callback);
    }

    startGame = (playerColour, level) => {
        this.setState({ playerColour, level }, () => {
            this.setState({
                gameOver: '',
                moveCount: 1
            });
        });
    }

    render() {
        return (
            <Home
                moveCount={this.state.moveCount}
                setMoveCount={this.setMoveCount}
                gameOver={this.state.gameOver}
                setGameOver={this.setGameOver}
                level={this.state.level}
                playerColour={this.state.playerColour}
                startGame={this.startGame}
            />
        );
    }
}

export default App;
