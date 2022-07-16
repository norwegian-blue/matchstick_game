<template>
    <img v-if="isBurned"
        src="match_burned.png"
    />
    <img v-else-if="isLit"
        src="match_lit.png"
        @click="toggleMatch"
    />
    <img v-else
        src="match.png" 
        @click="toggleMatch"
    />
</template>

<script>
export default {
    name: "Match",
    props: {
        rowIdx: Number,
        colIdx: Number,
    },
    computed: {
        isBurned() {
            const state = this.$store.getters.currentState;
            return !state[this.rowIdx][this.colIdx];
        },
        isLit() {
            const currentMove = this.$store.getters.currentMove;
            return currentMove && (currentMove[0] === this.rowIdx) && (currentMove[1][this.colIdx] === 1);
        },
    },
    methods: {
        toggleMatch() {
            this.$store.dispatch('updateMove', { rowIdx: this.rowIdx, colIdx: this.colIdx });
        }
    }
}
</script>

<style scoped>
img {
    height: 100px;
    width: 30px;
    cursor: pointer;
}
</style>