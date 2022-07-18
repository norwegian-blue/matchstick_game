import gameController from "../controller/game-control"

// Split array at zeros
function splitAtZero(v) {
    const idx = v.findIndex(e => e === 0);
    if (idx < 0) {
        return [v];
    }
    const v1 = v.slice(0, idx);
    const v2 = v.slice(idx+1);
    return [v1].concat(splitAtZero(v2)).filter(e => e.length !== 0);
};

// Translate board state to generic state
function toGenericState(state) {
    return state.map(r => splitAtZero(r)).flat()            // split separate groups in rows
                .map(e => e.reduce((s, e1) => s+e1, 0))     // get each separate group's length
                .sort()                                     // sort by ascending length
};

// Get next generic states
function getNextGenStates(state) {
    return state.map((g, idx) => getNextGroups(g)                        // all next groups from one group
                .map(s => s.concat(state.filter((e, i) => i !== idx)))   // + remaining groups
                .map(e => e.flat()))                                     // flat out and remove zeros
                .flat().map(s => s.filter(e => e >0).sort());
}

// Get next all possible next groups from a group of n matches
function getNextGroups(n) {
    if (n == 1) {
        return [[0]];
    }
    return getPairSum(n-1).concat(getNextGroups(n-1));
};

// Get all unique pair of numbers for which sum is n
function getPairSum(n) {
    let pairs = [];
    for (let k = 0; k < Math.ceil((n+1)/2); k++) {
        pairs.push([k, n-k]);
    }
    return pairs;
}

// Get move that transitions from basic state to target generic state
function getMoveForTransition(startState, destGenState) {
    const moves = gameController.getValidMoves(startState);
    const map2nextGeneric = (m) => toGenericState(gameController.getNextState(startState, m));          // Go to next generic state
    return moves.filter(m => JSON.stringify(map2nextGeneric(m)) === JSON.stringify(destGenState))[0];   // Filter for desired transition
};

// Minimax wrapper
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
        if (cached) {
            const cachedValue = cached[1]*(prize-cached[0]);
            const cachedMove = cached[2];
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