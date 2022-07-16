class GameController {
    // Initialize game status
    initializeGame(boardSize) {
        return [boardSize.map(n => [...Array(n)].map(() => 1))];
    }
    // Verify if valid move
    isValidMove(boardState, move) {
        return true;
    }
}
export default new GameController();