import gameController from "../controller/game-control"

const boardSize = [1, 3, 5, 7];

const initialState = {
    boardSize: boardSize,
    boardState: gameController.initializeGame(boardSize),
    move: [],
    currentMove: 0,
}

export const match = {
    namespaced: true,
    state: initialState,
}