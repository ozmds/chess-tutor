import React, { Component } from 'react';
import styled from 'styled-components';

import Board from '../Board/Board';

const StyledApp = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100vh;
    font-family: 'Redressed', serif;
    font-size: 1rem;
`;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <StyledApp>
                <h1>{'Chess Tutor'}</h1>
                <Board board={this.state.board} moves={this.state.moves} />
                <h2>{'Game Has Ended'}</h2>
                <button className='btn btn-primary'>{'Start Over'}</button>
            </StyledApp>
        );
    }
}

export default App;
