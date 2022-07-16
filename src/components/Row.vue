<template>
    <div class="container">
        <div class="row justify-content-center my-2">
            <Match v-for="(match, idx) in this.row"
                class="col-1 px-0 mx-2"
                :key="idx"
                :rowIdx="this.rowIdx"
                :colIdx="idx"
            />
        </div>
    </div>
</template>

<script>
import Match from "./Match.vue";
export default {
    name: "Row",
    components: {
        Match,
    },
    props: {
        rowIdx: Number,
        row: Object,
    },
}
</script>