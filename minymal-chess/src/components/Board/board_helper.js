const convertRankToList = (rank) => {
    const parsedRank = [];
    for (let i = 0; i < rank.length; i += 1) {
        if (Number.isNaN(Number(rank[i]))) {
            parsedRank.push(rank[i]);
        } else {
            let count = 0;
            while (count < parseInt(rank[i], 10)) {
                parsedRank.push(null);
                count += 1;
            }
        }
    }
    return parsedRank;
};

const convertFenToBoard = (fen) => {
    const board = fen.split(' ')[0];
    const ranks = board.split('/');
    return ranks.map((rank) => convertRankToList(rank));
};

export const initBoard = (fen) => {
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
    return idBoard;
};

export const updateBoard = (fen, oldBoard) => {
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
