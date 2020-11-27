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

export const convertFenToBoard = (fen) => {
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
