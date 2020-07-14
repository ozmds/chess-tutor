import React from 'react';
import './App.css';
import pawn from './static/pawn.svg';

function App() {
  return (
    <div className="App">
      <div class="square">
            <div class="content">
                {[8, 7, 6, 5, 4, 3, 2, 1].map((rank, rankindex) => (
                    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].map((file, fileindex) => (
                        <div class="tile">
                            <div class="innertile">
                                <img class="piece" src={pawn} />
                            </div>
                        </div>
                    ))
                ))}
            </div>
        </div>
    </div>
  );
}

export default App;
