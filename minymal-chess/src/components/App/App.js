import React, { Component } from 'react';
import Home from '../Screens/Home';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gamePaused: '',
            level: 1,
            playerColour: 'white',
            moveCount: 1
        };
    }

    setMoveCount = (moveCount) => {
        this.setState({ moveCount });
    }

    setGamePaused = (reason) => {
        this.setState({ gamePaused: reason });
    }

    startGame = (playerColour, level) => {
        this.setState({ playerColour, level }, () => {
            this.setState({
                gamePaused: '',
                moveCount: 1
            });
        });
    }

    render() {
        return (
            <Home
                moveCount={this.state.moveCount}
                setMoveCount={this.setMoveCount}
                gamePaused={this.state.gamePaused}
                setGamePaused={this.setGamePaused}
                level={this.state.level}
                playerColour={this.state.playerColour}
                startGame={this.startGame}
            />
        );
    }
}

export default App;
