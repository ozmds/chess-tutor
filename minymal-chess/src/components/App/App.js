import React, { Component } from 'react';

import styles from './App.module.css';
import Board from '../Board/Board';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className={styles.app}>
                <Board board={this.state.board} moves={this.state.moves} />
            </div>
        );
    }
}

export default App;
