<template>
    <div class="container-flex mt-5">
    <form class="row justify-content-center align-items-center" @submit.prevent="startNewGame">
        <!-- Start new game -->
        <button type="submit" class="btn btn-primary col-auto mx-4">Start new game</button>

        <!-- Player 1 vs Player 2-->
        <div class="form-check text-start col-auto" style="width:fit-content">
            <input class="form-check-input my-1" type="radio" name="radioPlayers" id="radioPvP" value="PvP" v-model="matchModeRadio">
            <label class="form-check-label" for="radioPvP">
                Player vs Player
            </label>
        </div>

        <!-- PC versus PC -->
        <div class="form-check text-start col-auto">
            <input class="form-check-input my-1" type="radio" name="radioPlayers" id="radioCvC" value="CvC" v-model="matchModeRadio">
            <label class="form-check-label" for="radioCvC">
                Computer vs Computer
            </label>
        </div>

        <!-- Player vs PC -->
        <div class="col-auto row">
            <div class="form-check text-start col-auto">
                <input class="form-check-input my-1" type="radio" name="radioPlayers" id="radioPvC" value="PvC" v-model="matchModeRadio">
                <label class="form-check-label" for="radioPvC">
                    Player vs Computer
                </label>
            </div>
            <div class="form-check text-start col-auto">
                <input class="form-check-input my-1" type="checkbox" value="" id="checkPfirst" v-model="playerFirstCheck" :disabled="matchModeRadio !== 'PvC'">
                <label class="form-check-label" for="checkPfirst">
                    Play first turn
                </label>
            </div>
        </div>
    </form>
    </div>
</template>

<script>
export default {
    name: "NewGame",
    data() {
        return {
            playerFirstCheck: false,
            matchModeRadio: "PvP",
        }
    },
    methods: {
        startNewGame() {
            console.log(`Player first? ${this.playerFirstCheck}`);
            console.log(`Match mode? ${this.matchModeRadio}`)
        }
    }
}
</script>

<style scoped>
.form-check {
    font-size: .85em;
}
</style>