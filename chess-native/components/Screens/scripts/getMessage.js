const getMessage = (gameOver) => {
    switch (gameOver) {
    case 'player':
        return 'You beat the computer! Play again?';
    case 'computer':
        return 'The computer won the game this time. Try again?';
    case 'draw':
        return 'The game ended in a draw. Try again?';
    default:
        return 'Do you want to restart the game?';
    }
};

export default getMessage;
