const isLightTile = (id, rowLength) => {
    const rankAndFileEven = Math.floor(id / rowLength) % 2 === 0 && id % 2 === 0;
    const rankAndFileOdd = Math.floor(id / rowLength) % 2 === 1 && id % 2 === 1;
    return rankAndFileEven || rankAndFileOdd;
};

export default isLightTile;
