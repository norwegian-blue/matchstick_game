class GameController {
    // Initialize game status
    initializeGame(boardSize) {
        return [boardSize.map(n => [...Array(n)].map(() => 1))];
    }

    // Get all valid moves from state
    getValidMoves(boardState) {
        const validMoves = boardState.map(row => this.getValidRowMoves(row));
        return validMoves.map((el, id) => el.map(sub => [id, sub])).flat();
    }

    // Get all valid moves in a row
    getValidRowMoves(rowState) {
        return this._getValidRowMoves(rowState).filter(e => e.reduce((s, x) => s+x, 0) !== 0);
    }

    _getValidRowMoves(rowState) {
        if (rowState.length == 1) {
            return rowState[0] === 0 ? [[0]] : [[1], [0]];
        }
        const tailMoves = this._getValidRowMoves(rowState.slice(1));
        let moves = [];

        moves = moves.concat(tailMoves.map(e => [0].concat(e)));
        if (rowState[0] === 1) {
            moves = moves.concat(tailMoves.filter(e => e[0] === 1).map(e => [1].concat(e)));
            moves.push([1].concat(tailMoves[0].map(e => 0)));
        }
        return moves;
    }

    // Verify if valid move
    isValidMove(boardState, move) {
        const validMoves = this.getValidMoves(boardState);
        return validMoves.findIndex(m => JSON.stringify(m) === JSON.stringify(move)) >= 0;
    }

    // Calculate next board state
    getNextState(boardState, move) {
        let newState = JSON.parse(JSON.stringify(boardState));
        newState[move[0]] = newState[move[0]].map((e, i) => e ^ move[1][i]);
        return newState;
    }
}
export default new GameController();