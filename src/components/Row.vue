<template>
    <div class="container">
        <div class="row justify-content-center my-2">
            <Match v-for="(match, idx) in this.row"
                class="col-1"
                :key="idx"
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
        row: Object,
    },
}
</script>