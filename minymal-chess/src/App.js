import React from 'react';
import './App.css';
import pawn from './pawn.png';
import circle from './circle.svg';

function App() {
  return (
    <div className="App">
      <div class="square">
            <div class="content">
                {[8, 7, 6, 5, 4, 3, 2, 1].map((rank, rankindex) => (
                    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].map((file, fileindex) => (
                        <div class="tile">
                            <div class="child">
                                {rankindex == 0 
                                &&
                                <div class="filelegend">
                                    <img class="imagelegend" src={circle} />
                                    <div class="textlegend">
                                        <strong><em>{file}</em></strong>
                                    </div>
                                </div>}
                                {fileindex == 0
                                &&
                                <div class="ranklegend">
                                    <img class="imagelegend" src={circle} />
                                    <div class="textlegend">
                                        <strong><em>{rank}</em></strong>
                                    </div>
                                </div>}
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
