import { convertFenToBoard, reverseBoard } from './boardConversion';

const initBoard = (fen, playerColour) => {
    const board = convertFenToBoard(fen);
    const pieceIDs = {};
    const idBoard = [];
    for (let i = 0; i < board.length; i += 1) {
        const idRank = [];
        for (let j = 0; j < board[i].length; j += 1) {
            const piece = board[i][j];
            if (Object.keys(pieceIDs).includes(piece)) {
                pieceIDs[piece] += 1;
            } else if (piece) {
                pieceIDs[piece] = 1;
            }
            if (piece) {
                const pieceID = piece + pieceIDs[piece].toString();
                idRank.push(pieceID);
            } else {
                idRank.push(null);
            }
        }
        idBoard.push(idRank);
    }
    if (playerColour === 'black') {
        return reverseBoard(idBoard);
    }
    return idBoard;
};

export default initBoard;
