class GameController {
    // Initialize game status
    initializeGame(boardSize) {
        return boardSize.map(n => [...Array(n)].map(() => 1));
    }
}
export default new GameController();