const getMoveCountFromFen = (fen) => (fen ? parseInt(fen.split(' ')[5], 10) : null);

export default getMoveCountFromFen;
