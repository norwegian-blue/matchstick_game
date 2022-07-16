import { createStore } from "vuex";
import gameController from "../controller/game-control"

const boardSize = [1, 3, 5, 7];

const initialState = {
    boardSize: boardSize,
    boardState: gameController.initializeGame(boardSize),
    moves: [],
    nextMove: [],
    players: ['Player 1', 'Player 2'],
    currentTurn: 0,
}

const store = createStore({
    state() {
        return {
            game: initialState,
        }
    },
    getters: {
        currentTurn(state) {
            return state.game.currentTurn;
        },
        maxTurns(state) {
            return state.game.boardState.length - 1;
        },
        currentPlayer(state) {
            const turn = state.game.currentTurn;
            const idx = turn % 2; 
            return state.game.players[idx];
        },
        currentState(state) {
            return state.game.boardState[state.game.currentTurn];
        },
        currentMove(state) {
            return state.game.nextMove;
        }
    },
    actions: {
        updateMove({ commit, getters }, idx) {
            let newMove = [];
            const currMove = getters.currentMove;
            // Create trial next move
            if (currMove.length > 0) {
                if (currMove[0] !== idx.rowIdx) {
                    return false;
                } else {
                    newMove[0] = idx.rowIdx;
                    newMove[1] = [...currMove[1]]; 
                    newMove[1][idx.colIdx] = currMove[1][idx.colIdx] ? 0 : 1; 
                }
            } else {
                newMove[0] = idx.rowIdx;
                newMove[1] = getters.currentState[idx.rowIdx].map(() => 0);
                newMove[1][idx.colIdx] = 1;
            }
            commit('registerMove', newMove);
        },
        updateState({ commit, getters }) {
            // Verify if valid move
            if (getters.currentMove.length == 0) {
                return Promise.reject({ message: "Invalid move: you must burn at least one match!" });
            } else if (!gameController.isValidMove(getters.currentState, getters.currentMove)) {
                return Promise.reject({ message: "Invalid move: lit matches must be contiguous!" });
            }
            const newState = gameController.getNextState(getters.currentState, getters.currentMove);
            commit('registerNewState', newState);
            return Promise.resolve();
        }
    },
    mutations: {
        registerMove(state, newMove) {
            if (newMove[1].reduce((s, e) => s+e, 0) === 0) {
                state.game.nextMove = [];
            } else {
                state.game.nextMove = newMove;
            }
        },
        registerNewState(state, newState) {
            state.game.currentTurn += 1;
            state.game.boardState.push(newState);
            state.game.moves.push(state.game.nextMove);
            state.game.nextMove = [];
        }
    }
});
export default store;