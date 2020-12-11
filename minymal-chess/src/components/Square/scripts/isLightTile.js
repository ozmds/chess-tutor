const isLightTile = (square) => {
    const file = square[0];
    const rank = parseInt(square[1], 10);
    const oddFile = ['a', 'c', 'e', 'g'];
    const evenFile = ['b', 'd', 'f', 'h'];
    const lightEvenFile = rank % 2 === 1 && evenFile.includes(file);
    const lightOddFile = rank % 2 === 0 && oddFile.includes(file);
    return lightEvenFile || lightOddFile;
};

export default isLightTile;
