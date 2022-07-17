import gameController from "../controller/game-control"

function flipState(state) {
    return state.map(e => e.slice().reverse());
}

function flipMove(move) {
    return move.slice().reverse();
}

// Wrapper
function minimax(boardState, prize) {
    return minimaxMemo()(boardState, prize, true);
}

// Minimax algorithm with memoization
function minimaxMemo() {
    let cache = {};

    return function _minimax(boardState, prize, maximizingPlayer) {
        // Terminal condition
        if (gameController.isWinningState(boardState)) {
            prize = maximizingPlayer ? prize : -prize;
            return [prize, []];
        }

        // See if cached solution or mirror
        const cached = cache[JSON.stringify(boardState)];
        const cachedMirr = cache[JSON.stringify(flipState(boardState))];
        if (cached || cachedMirr) {
            const validCache = cached ? cached : cachedMirr;
            const cachedValue = validCache[1]*(prize-validCache[0]);
            const cachedMove = cached ? validCache[2] : flipMove(validCache[2]);
            return maximizingPlayer ? [cachedValue, cachedMove] : [-cachedValue, cachedMove];
        }

        // Get available moves
        const moves = gameController.getValidMoves(boardState)

        // Maximizing player
        let bestMove;
        if (maximizingPlayer) {
            let value = -Infinity;
            for (const move of moves) {
                const childState = gameController.getNextState(boardState, move);
                const subSol = _minimax(childState, prize-1, false);
                if (subSol[0] > value) {
                    value = subSol[0];
                    bestMove = move;
                } 
            }
            cache[JSON.stringify(boardState)] = [prize - Math.abs(value), Math.sign(value), bestMove];
            return [value, bestMove];

        } else {
        // Minimizing player
            let value = Infinity;
            for (const move of moves) {
                const childState = gameController.getNextState(boardState, move);
                const subSol = _minimax(childState, prize-1, true);
                if (subSol[0] < value) {
                    value = subSol[0];
                    bestMove = move;
                } 
            }
            cache[JSON.stringify(boardState)] = [prize - Math.abs(value), -Math.sign(value), bestMove];
            return [value, bestMove];
        }
    };
}

function sleep(time) {
    return new Promise(resolve => setTimeout(resolve, time));
};

class PcPlayer {
    async getRandomNextMove(boardStatus) {
        const validMoves = gameController.getValidMoves(boardStatus);
        const idx = Math.floor(Math.random() * validMoves.length);
        await sleep(1000);
        return validMoves[idx];
    }

    // Use minimax algorithm to find best solution
    async getBestNextMove(boardStatus) {
        await sleep(1000);
        // get board size
        let size = boardStatus.flat().flat().length;

        // get best move/score
        const solution = minimax(boardStatus, size+1) 
        return solution[1];
    }
}
export default new PcPlayer();