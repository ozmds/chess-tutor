import { convertFenToBoard } from './boardHelper';

const updateBoard = (fen, oldBoard) => {
    const newBoard = convertFenToBoard(fen);
    const updatedBoard = [];
    const missing = [];
    const added = [];
    for (let i = 0; i < oldBoard.length; i += 1) {
        updatedBoard.push([]);
        for (let j = 0; j < oldBoard[i].length; j += 1) {
            const oldPiece = oldBoard[i][j];
            const newPiece = newBoard[i][j];
            let matches;
            if (oldPiece === newPiece || (oldPiece && oldPiece[0] === newPiece)) {
                updatedBoard[updatedBoard.length - 1].push(oldPiece);
            } else if (newPiece) {
                matches = missing.filter((missed) => missed[0] === newPiece);
                if (matches.length === 1) {
                    updatedBoard[updatedBoard.length - 1].push(matches[0]);
                } else {
                    added.push({ piece: newPiece, row: i, column: j });
                    updatedBoard[updatedBoard.length - 1].push(null);
                }
            } else if (oldPiece) {
                matches = added.filter((add) => add.piece === oldPiece[0]);
                if (matches.length === 1) {
                    const { row, column } = matches[0];
                    updatedBoard[row][column] = oldPiece;
                } else {
                    missing.push(oldPiece);
                }
                updatedBoard[updatedBoard.length - 1].push(null);
            }
        }
    }
    return updatedBoard;
};

export default updateBoard;
