<template>
    <div class="my-4">
        <p class="my-2 fst-italic"> {{ this.$store.getters.currentPlayer }} 
            <span v-if="this.$store.getters.isWinning"> WON!</span>
            <span v-else> turn</span>
        </p>
        <div v-show="pcRunning" class="mb-3">
            <span class="spinner-border spinner-border-sm"/>
            <span class="fst-italic"> PC is thinking...</span>
        </div>
        
        <div class="row justify-content-center"> 
            <!-- Move back -->
            <button 
                type="button"
                class="btn btn-primary col-1"
                @click="moveBwd"
                :disabled="this.$store.getters.currentTurn === 0"
            ><font-awesome-icon icon="backward-step"/></button>

            <!-- Commit current move -->
            <button
                type="button"
                class="btn btn-primary col-2 mx-2"
                @click="nextStep"
                :disabled="this.$store.getters.isWinning || this.loading || this.pcRunning"
            >
                <span class="spinner-border spinner-border-sm" v-show="loading"> </span>
                Next
            </button>

            <!-- Move forward -->
            <button 
                type="button"
                class="btn btn-primary col-1"
                @click="moveFwd"
                :disabled="this.$store.getters.currentTurn === this.$store.getters.maxTurns"
            ><font-awesome-icon icon="forward-step"/></button>
        </div>
        
        <div v-if="message" class="alert alert-danger p-3 mt-4 mb-0 mx-auto" style="width:fit-content" role="alert">
            {{ message }} 
        </div>
    </div>
</template>

<script>
export default {
    name: "Progress",
    data() {
        return {
            message: "",
            loading: false,
            pcRunning: false,
        }
    },
    computed: {
        reset() {
            return this.$store.state.game.players; 
        },
        isPcTurn() {
            return this.$store.getters.isPcTurn;
        },
    },
    watch: {
        reset () {
            this.message = "";
        },
        isPcTurn(pcTurn) {
            if (pcTurn) {
                this.getPcMove();
            }
        }
    },
    methods: {
        nextStep() {
            this.loading = true;
            this.$store.dispatch('updateState')
            .then(()=> {
                this.message = "";
                setTimeout(() => this.loading = false, 150);
            })
            .catch(err => {
                this.message = err.message;
                this.loading = false;
            });
        },
        moveBwd() {
            this.$store.dispatch('moveBwd');
        },
        moveFwd() {
            this.$store.dispatch('moveFwd');
        },
        async getPcMove() {
            this.pcRunning = true;
            await this.$store.dispatch('getPcMove');
            this.pcRunning = false;
            this.nextStep();
        },
    }
}
</script>