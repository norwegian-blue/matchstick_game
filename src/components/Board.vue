<template>
    <Row 
        v-for="(row, idx) in rows"
        :key="idx"
        :row="row"
        :rowIdx="idx"
    />
</template>

<script>
import Row from "./Row.vue";
export default {
    name: "Board",
    components: {
        Row,
    },
    computed: {
        rows() {
            return this.$store.getters.currentState;
        }
    },
}
</script>