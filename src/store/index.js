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
        }
    }
});
export default store;