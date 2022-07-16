<template>
    <div class="my-4">
        <p class="my-2 fst-italic"> {{ this.$store.getters.currentPlayer }} turn</p>
        
        <div class="row justify-content-center"> 
            <!-- Move back -->
            <button 
                type="button"
                class="btn btn-primary col-1"
                :disabled="this.$store.getters.currentTurn === 0"
            ><font-awesome-icon icon="backward-step"/></button>

            <!-- Commit current move -->
            <button
                type="button"
                class="btn btn-primary col-2 mx-2"
                @click="nextStep"
            >Next</button>

            <!-- Move forward -->
            <button 
                type="button"
                class="btn btn-primary col-1"
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
        }
    },
    methods: {
        nextStep() {
            this.loading = true;
            this.$store.dispatch('updateState')
            .then(()=> {
                this.message = "";
                this.loading = false;
            })
            .catch(err => {
                this.message = err.message;
                this.loading = false;
            });
        },
    }
}
</script>