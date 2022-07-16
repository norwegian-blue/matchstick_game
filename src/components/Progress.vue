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
            <button type="button" class="btn btn-primary col-2 mx-2">Next</button>

            <!-- Move forward -->
            <button 
                type="button"
                class="btn btn-primary col-1"
                :disabled="this.$store.getters.currentTurn === this.$store.getters.maxTurns"
            ><font-awesome-icon icon="forward-step"/></button>
        </div>
    </div>
</template>

<script>
export default {
    name: "Progress",
    mounted() {
        //console.log(this.$store.getters.maxTurns)
    }
}
</script>