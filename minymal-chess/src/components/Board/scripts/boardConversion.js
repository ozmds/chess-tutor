export const convertRankToList = (rank) => {
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

export const reverseBoard = (board) => {
    board.reverse();
    board.map((rank) => {
        rank.reverse();
        return rank;
    });
    return board;
};

export const getMoveCountFromFen = (fen) => (fen ? parseInt(fen.split(' ')[5], 10) : null);
