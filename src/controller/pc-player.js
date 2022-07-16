import gameController from "../controller/game-control"

class PcPlayer {
    async getRandomNextMove(boardStatus) {
        const validMoves = gameController.getValidMoves(boardStatus);
        const idx = Math.floor(Math.random() * validMoves.length);
        await this.sleep(1000);
        return validMoves[idx];
    }

    sleep(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }
}
export default new PcPlayer();