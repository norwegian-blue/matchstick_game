<template>
    <Match v-for="(match, idx) in this.row"
        :key="idx"
    />
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